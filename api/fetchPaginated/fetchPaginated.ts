import { apiConfig } from '../apiConfig'
import { Links, getPaginationLinks } from './getPaginationLinks'

export type FetchPaginatedReturn<T> = {
  data: T
} & Links

/**
 * Fetches data from the API and extracts pagination links from the header.
 * @param url - The URL to fetch the data from.
 * @returns {PaginatedFetchReturn<T>} - The data and the URL for the next page.
 */

export async function fetchPaginated<T>(
  url: string
): Promise<FetchPaginatedReturn<T>> {
  const response = await fetch(url, {
    headers: apiConfig.headers
  })

  if (!response.ok) {
    throw await response.json()
  }

  const body = await response.json()
  const paginationLinks = getPaginationLinks(response.headers.get('Link'))

  return {
    data: body,
    ...paginationLinks
  }
}
