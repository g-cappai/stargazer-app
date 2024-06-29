/**
 * Contains all the query keys.
 * Helps to avoid hardcoding the query key, prevents errors, and makes changes easier.
 *
 * https://tkdodo.eu/blog/effective-react-query-keys#use-query-key-factories
 */

export const queryKeys = {
  all: (owner: string, repo: string) => ['stargazers', owner, repo] as const
}
