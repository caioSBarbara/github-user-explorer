import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useGetRepository } from "./index";
import { githubApi } from "../services/githubApi";

jest.mock("../services/githubApi", () => ({
  githubApi: {
    getRepository: jest.fn(),
  },
}));

describe("useGetRepository", () => {
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

  it("should fetch repository data successfully", async () => {
    const mockRepo = {
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
    };

    (githubApi.getRepository as jest.Mock).mockResolvedValueOnce(mockRepo);

    const { result } = renderHook(
      () => useGetRepository({ owner: "octocat", repo: "Hello-World" }),
      { wrapper }
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.hasParams).toBe(true);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockRepo);
    expect(result.current.repository).toEqual(mockRepo);
    expect(result.current.error).toBeNull();
    expect(githubApi.getRepository).toHaveBeenCalledWith(
      "octocat",
      "Hello-World"
    );
  });

  it("should handle error when fetching repository", async () => {
    const mockError = new Error("Repository not found");
    (githubApi.getRepository as jest.Mock).mockRejectedValueOnce(mockError);

    const { result } = renderHook(
      () => useGetRepository({ owner: "octocat", repo: "nonexistent" }),
      { wrapper }
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(false);
    });

    expect(result.current.error).toBeDefined();
    expect(result.current.data).toBeUndefined();
    expect(result.current.repository).toBeUndefined();
  });

  it("should not fetch when owner or repo is empty", () => {
    const { result } = renderHook(
      () => useGetRepository({ owner: "", repo: "" }),
      { wrapper }
    );

    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasParams).toBe(false);
    expect(githubApi.getRepository).not.toHaveBeenCalled();
  });

  it("should not fetch when enabled is false", () => {
    const { result } = renderHook(
      () =>
        useGetRepository({
          owner: "octocat",
          repo: "Hello-World",
          enabled: false,
        }),
      { wrapper }
    );

    expect(result.current.isLoading).toBe(false);
    expect(githubApi.getRepository).not.toHaveBeenCalled();
  });
});
