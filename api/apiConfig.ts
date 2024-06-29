/**
 * This file contains the configuration for the GitHub API.
 */

export const apiConfig = {
  baseUrl: 'https://api.github.com',
  headers: {
    'User-Agent': 'stargazers-viewer',
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28'
  }
}
