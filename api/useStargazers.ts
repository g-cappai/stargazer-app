import {
  UseInfiniteQueryResult,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { Endpoints } from "@octokit/types";
import { Api } from "@/constants/Api";

export interface Stargazer {
  id: number;
  avatarUrl: string;
  name: string;
}

type UseStargazersResponse = {
  stargazers: Endpoints["GET /repos/{owner}/{repo}/stargazers"]["response"]["data"];
  nextPage?: string;
};

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
 * Query key factory.
 * Helps to avoid hardcoding the query key, preventing errors and making it easier to refactor.
 *
 * https://tkdodo.eu/blog/effective-react-query-keys#use-query-key-factories
 *
 */

const queryKeys = {
  all: (owner: string, repo: string) => ["stargazers", owner, repo] as const,
};

type Links = {
  next?: string;
  prev?: string;
  last?: string;
  first?: string;
};

/**
 * Extracts links from the `Link` header.
 * @param linkHeader - The `Link` header from Github API.
 * @returns {Links} - An object containing the links.
 */
const getLinks = (linkHeader: string | null): Links => {
  if (!linkHeader) {
    return {};
  }

  const links = [...(linkHeader?.matchAll(/<(.+?)>;\srel="(.+?)"/gm) || [])];

  return links.reduce((acc, curr) => {
    acc[curr?.[2] as string] = curr?.[1] as string;
    return acc;
  }, {} as Record<string, string>);
};

/**
 * Most of the data returned by the API is not useful for this application.
 *
 * Moreover, the API may return two types of entities, one of which may not have a user.
 * Since there will be no useful data to display, such entities will be filtered out.
 *
 * @param {UseStargazersResponse[]} data - The data returned by the queryFn.
 * @returns {Stargazer[][]} - The filtered data.
 */
const select = (data: { pages: UseStargazersResponse[] }): Stargazer[][] =>
  data.pages.map(
    (page) =>
      page.stargazers
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
  return useInfiniteQuery<
    UseStargazersResponse,
    RequestError,
    Stargazer[][],
    ReturnType<typeof queryKeys.all>,
    string
  >({
    initialPageParam: `${Api.domain.github}/repos/${owner}/${repo}/stargazers`,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    queryKey: queryKeys.all(owner, repo),
    enabled: !!owner && !!repo,
    queryFn: async ({ pageParam }) => {
      const response = await fetch(pageParam, {
        headers: {
          "User-Agent": "stargazers-viewer",
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });

      if (!response.ok) {
        throw await response.json();
      }

      const body = await response.json();
      const links = getLinks(response.headers.get("Link"));

      return {
        stargazers: body,
        nextPage: links.next,
      };
    },
    select,
  });
}
