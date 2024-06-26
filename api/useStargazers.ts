import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { Endpoints } from "@octokit/types";
import { Api } from "@/constants/Api";

export interface Stargazer {
  id: number;
  avatarUrl: string;
  name: string;
}

type UseStargazersResponse =
  Endpoints["GET /repos/{owner}/{repo}/stargazers"]["response"]["data"];

type RequestError = {
  message: string;
  documentation_url: string;
  status: string;
};

interface UseStargazersParams {
  owner: string;
  repo: string;
}

/**
 * Fetches stargazers for a given repository.
 *
 * _Note: Unauthenticated requests have stricter [rate limit](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api?apiVersion=2022-11-28#primary-rate-limit-for-unauthenticated-users).
 * However, considering the purpose of this code, it is sufficient._
 *
 * @param {UseStargazersParams} params - The owner and name of the repository.
 * @param {string} params.owner - The owner of the repository.
 * @param {string} params.repo - The name of the repository.
 * @returns {UseQueryResult<UseStargazersReturn, RequestError>} - The result of the query.
 */

export function useStargazers({
  owner,
  repo,
}: UseStargazersParams): UseQueryResult<Stargazer[], RequestError> {
  return useQuery<UseStargazersResponse, RequestError, Stargazer[]>({
    queryKey: ["stargazers", owner, repo],
    enabled: !!owner && !!repo,
    queryFn: async () => {
      const response = await fetch(
        `${Api.domain.github}/repos/${owner}/${repo}/stargazers`,
        {
          headers: {
            "User-Agent": "stargazers-viewer",
            Accept: "application/vnd.github+json",
            "X-GitHub-Api-Version:": "2022-11-28",
          },
        }
      );

      if (!response.ok) {
        throw await response.json();
      }

      return response.json();
    },
    select: (data) =>
      /**
       * Most of the data returned by the API is not useful for this application.
       *
       * Moreover, the API may return two types of entities, one of which may not have a user.
       * Since there will be no useful data to display, such entities will be filtered out.
       */

      data
        .map((item) => {
          if ("user" in item && item.user !== null) {
            return {
              id: item.user.id,
              avatarUrl: item.user.avatar_url,
              name: item.user.login,
            };
          }

          if (!("starred_at" in item)) {
            return {
              id: item.id,
              avatarUrl: item.avatar_url,
              name: item.login,
            };
          }

          return null;
        })
        .filter(Boolean) as Stargazer[],
  });
}
