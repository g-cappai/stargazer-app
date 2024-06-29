import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react-hooks'
import nock from 'nock'
import { PropsWithChildren } from 'react'
import { apiConfig } from './apiConfig'
import { useStargazers } from './useStargazers'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      gcTime: Infinity
    }
  }
})

const wrapper = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

describe('useStargazers hook', () => {
  it('should return filtered data', async () => {
    const fakeData = [
      { id: 1, avatar_url: 'https://example.com', login: 'octokit' },
      { starred_at: '2022-01-01T00:00:00Z' },
      {
        starred_at: '2022-01-01T00:00:00Z',
        user: {
          id: 2,
          avatar_url: 'https://example.com',
          login: 'octokit',
          events_url: 'https://example.com'
        }
      },
      {
        starred_at: '2022-01-01T00:00:00Z',
        user: null
      }
    ]

    nock(apiConfig.baseUrl)
      .get('/repos/owner/repo/stargazers')
      .reply(200, fakeData)

    const { result, waitFor } = renderHook(
      () => useStargazers({ owner: 'owner', repo: 'repo' }),
      { wrapper }
    )

    await waitFor(() => result.current.isSuccess)

    expect(result.current.data?.[0]).toHaveLength(2)
    expect(result.current.data).toEqual([
      [
        {
          id: 1,
          avatarUrl: 'https://example.com',
          name: 'octokit'
        },
        {
          id: 2,
          avatarUrl: 'https://example.com',
          name: 'octokit'
        }
      ]
    ])
  })
})
