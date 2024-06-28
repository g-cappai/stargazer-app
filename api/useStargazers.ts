import {
  UseInfiniteQueryResult,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { Endpoints } from "@octokit/types";
import { apiConfig } from "./apiConfig";
import { queryKeys } from "./queryKeys";
import { fetchPaginated, FetchPaginatedReturn } from "./fetchPaginated";

export interface Stargazer {
  id: number;
  avatarUrl: string;
  name: string;
}

type ApiResponse =
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
 * @returns {UseInfiniteQueryResult<UseStargazersReturn, RequestError>} - The result of the query.
 */

export function useStargazers({
  owner,
  repo,
}: UseStargazersParams): UseInfiniteQueryResult<Stargazer[][], RequestError> {
  return useInfiniteQuery({
    queryKey: queryKeys.all(owner, repo),
    queryFn: ({ pageParam: url }) => fetchPaginated<ApiResponse>(url),
    enabled: !!owner && !!repo,
    initialPageParam: `${apiConfig.baseUrl}/repos/${owner}/${repo}/stargazers`,
    getNextPageParam: (lastPage) => lastPage.next,
    select,
  });
}

/**
 * Most of the data returned by the API is not useful for this application.
 *
 * Moreover, the API may return two types of entities, one of which may not have a user.
 * Since there will be no useful data to display, such entities will be filtered out.
 *
 * @param {UseStargazersResponse[]} data - The data returned by the queryFn.
 * @returns {Stargazer[][]} - The filtered data.
 */

function select(data: {
  pages: FetchPaginatedReturn<ApiResponse>[];
}): Stargazer[][] {
  return data.pages.map(
    (page) =>
      page.data
        .map((stargazer) => {
          if ("user" in stargazer && stargazer.user !== null) {
            return {
              id: stargazer.user.id,
              avatarUrl: stargazer.user.avatar_url,
              name: stargazer.user.login,
            };
          }

          if (!("starred_at" in stargazer)) {
            return {
              id: stargazer.id,
              avatarUrl: stargazer.avatar_url,
              name: stargazer.login,
            };
          }

          return null;
        })
        .filter(Boolean) as Stargazer[]
  );
}
