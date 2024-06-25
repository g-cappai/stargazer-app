import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { useStargazers } from "./useStargazers";
import { renderHook } from "@testing-library/react-hooks";
import nock from "nock";
import { Api } from "@/constants/Api";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      gcTime: Infinity,
    },
  },
});

const wrapper = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useStargazers hook", () => {
  it("should return filtered data", async () => {
    const fakeData = [
      { id: 1, avatar_url: "https://example.com", login: "octokit" },
      { starred_at: "2022-01-01T00:00:00Z" },
      {
        starred_at: "2022-01-01T00:00:00Z",
        user: {
          id: 2,
          avatar_url: "https://example.com",
          login: "octokit",
          events_url: "https://example.com",
        },
      },
      {
        starred_at: "2022-01-01T00:00:00Z",
        user: null,
      },
    ];

    nock(Api.domain.github)
      .get("/repos/owner/repo/stargazers")
      .reply(200, fakeData);

    const { result, waitFor } = renderHook(
      () => useStargazers({ owner: "owner", repo: "repo" }),
      { wrapper }
    );

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toHaveLength(2);
    expect(result.current.data).toEqual([
      {
        id: 1,
        avatarUrl: "https://example.com",
        name: "octokit",
      },
      {
        id: 2,
        avatarUrl: "https://example.com",
        name: "octokit",
      },
    ]);
  });
});
