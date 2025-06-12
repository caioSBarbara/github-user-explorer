import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useGetUser } from "./index";
import { githubApi } from "../services/githubApi";

jest.mock("../services/githubApi", () => ({
  githubApi: {
    getUser: jest.fn(),
  },
}));

describe("useGetUser", () => {
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

  it("should fetch user data successfully", async () => {
    const mockUser = {
      id: 1,
      login: "octocat",
      name: "The Octocat",
      avatar_url: "https://github.com/images/error/octocat_happy.gif",
      html_url: "https://github.com/octocat",
      bio: null,
      public_repos: 2,
      followers: 20,
      following: 0,
      created_at: "2011-01-25T18:44:36Z",
      updated_at: "2011-01-26T19:14:43Z",
    };

    (githubApi.getUser as jest.Mock).mockResolvedValueOnce(mockUser);

    const { result } = renderHook(() => useGetUser({ username: "octocat" }), {
      wrapper,
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.hasUser).toBe(true);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockUser);
    expect(result.current.error).toBeNull();
    expect(githubApi.getUser).toHaveBeenCalledWith("octocat");
  });

  it("should handle error when fetching user", async () => {
    const mockError = new Error("User not found");
    (githubApi.getUser as jest.Mock).mockRejectedValueOnce(mockError);

    const { result } = renderHook(
      () => useGetUser({ username: "nonexistent" }),
      {
        wrapper,
      }
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(false);
    });

    expect(result.current.error).toBeDefined();
    expect(result.current.data).toBeUndefined();
  });

  it("should not fetch when username is empty", () => {
    const { result } = renderHook(() => useGetUser({ username: "" }), {
      wrapper,
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasUser).toBe(false);
    expect(githubApi.getUser).not.toHaveBeenCalled();
  });

  it("should not fetch when enabled is false", () => {
    const { result } = renderHook(
      () => useGetUser({ username: "octocat", enabled: false }),
      { wrapper }
    );

    expect(result.current.isLoading).toBe(false);
    expect(githubApi.getUser).not.toHaveBeenCalled();
  });
});
