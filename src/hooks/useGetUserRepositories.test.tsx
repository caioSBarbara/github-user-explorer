import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useGetUserRepositories } from "./index";
import { githubApi } from "../services/githubApi";
import { GitHubRepository } from "../types/github";

jest.mock("../services/githubApi", () => ({
  githubApi: {
    getUserRepositories: jest.fn(),
  },
}));

describe("useGetUserRepositories", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    jest.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("should fetch user repositories successfully", async () => {
    const mockRepos = [
      {
        id: 1,
        name: "Hello-World",
        full_name: "octocat/Hello-World",
        description: "My first repository on GitHub!",
        html_url: "https://github.com/octocat/Hello-World",
        clone_url: "https://github.com/octocat/Hello-World.git",
        language: "JavaScript",
        stargazers_count: 80,
        watchers_count: 80,
        forks_count: 9,
        open_issues_count: 2,
        size: 9,
        default_branch: "main",
        private: false,
        created_at: "2011-01-26T19:01:12Z",
        updated_at: "2011-01-26T19:14:43Z",
        license: null,
        owner: {
          login: "octocat",
          avatar_url: "https://github.com/images/error/octocat_happy.gif",
        },
      },
    ];

    (githubApi.getUserRepositories as jest.Mock).mockResolvedValueOnce(
      mockRepos
    );

    const { result } = renderHook(
      () => useGetUserRepositories({ username: "octocat" }),
      { wrapper }
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.hasUsername).toBe(true);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockRepos);
    expect(result.current.repositories).toEqual(mockRepos);
    expect(result.current.error).toBeNull();
    expect(githubApi.getUserRepositories).toHaveBeenCalledWith(
      "octocat",
      1,
      30
    );
  });

  it("should handle error when fetching repositories", async () => {
    const mockError = new Error("Failed to fetch repositories");
    (githubApi.getUserRepositories as jest.Mock).mockRejectedValueOnce(
      mockError
    );

    const { result } = renderHook(
      () => useGetUserRepositories({ username: "octocat" }),
      { wrapper }
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(false);
    });

    expect(result.current.error).toBeDefined();
    expect(result.current.data).toBeUndefined();
    expect(result.current.repositories).toEqual([]);
  });

  it("should not fetch when username is empty", () => {
    const { result } = renderHook(
      () => useGetUserRepositories({ username: "" }),
      { wrapper }
    );

    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasUsername).toBe(false);
    expect(githubApi.getUserRepositories).not.toHaveBeenCalled();
  });

  it("should not fetch when enabled is false", () => {
    const { result } = renderHook(
      () => useGetUserRepositories({ username: "octocat", enabled: false }),
      { wrapper }
    );

    expect(result.current.isLoading).toBe(false);
    expect(githubApi.getUserRepositories).not.toHaveBeenCalled();
  });

  it("should use custom page and perPage values", async () => {
    const mockRepos: GitHubRepository[] = [];
    (githubApi.getUserRepositories as jest.Mock).mockResolvedValueOnce(
      mockRepos
    );

    const { result } = renderHook(
      () =>
        useGetUserRepositories({
          username: "octocat",
          page: 2,
          perPage: 10,
        }),
      { wrapper }
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(githubApi.getUserRepositories).toHaveBeenCalledWith(
      "octocat",
      2,
      10
    );
  });
});
