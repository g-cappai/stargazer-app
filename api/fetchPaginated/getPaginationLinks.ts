export type Links = {
  next?: string
  prev?: string
  last?: string
  first?: string
}

/**
 * Extracts links from the `Link` header.
 * @param linkHeader - The `Link` header from Github API.
 * @returns {Links} - An object containing the links.
 */

export function getPaginationLinks(linkHeader: string | null): Links {
  if (!linkHeader) {
    return {}
  }

  const links = [...(linkHeader?.matchAll(/<(.+?)>;\srel="(.+?)"/gm) || [])]

  return links.reduce(
    (acc, curr) => {
      acc[curr?.[2] as string] = curr?.[1] as string
      return acc
    },
    {} as Record<string, string>
  )
}
