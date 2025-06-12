import axios from "axios";
import { githubApi } from "./githubApi";
import { GitHubUser, GitHubRepository } from "../types/github";

jest.mock("axios", () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    interceptors: {
      response: {
        use: jest.fn(),
      },
    },
  })),
}));

const mockAxiosInstance = (axios.create as jest.Mock).mock.results[0].value;

describe("githubApi", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getUser", () => {
    it("should fetch user successfully", async () => {
      const mockUser: GitHubUser = {
        id: 1,
        login: "testuser",
        name: "Test User",
        avatar_url: "https://example.com/avatar.jpg",
        bio: "Test bio",
        email: "test@example.com",
        location: "Test Location",
        blog: "https://testblog.com",
        public_repos: 10,
        followers: 100,
        following: 50,
        created_at: "2020-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
        html_url: "https://github.com/testuser",
      };

      mockAxiosInstance.get.mockResolvedValueOnce({ data: mockUser });

      const result = await githubApi.getUser("testuser");

      expect(mockAxiosInstance.get).toHaveBeenCalledWith("/users/testuser");
      expect(result).toEqual(mockUser);
    });

    it("should throw error when user not found", async () => {
      const mockError = new Error("User not found");
      mockAxiosInstance.get.mockRejectedValueOnce(mockError);

      await expect(githubApi.getUser("nonexistentuser")).rejects.toThrow(
        "User not found"
      );
    });
  });

  describe("getUserRepositories", () => {
    it("should fetch user repositories successfully", async () => {
      const mockRepos: GitHubRepository[] = [
        {
          id: 1,
          name: "test-repo",
          full_name: "testuser/test-repo",
          description: "Test repository",
          html_url: "https://github.com/testuser/test-repo",
          clone_url: "https://github.com/testuser/test-repo.git",
          language: "TypeScript",
          stargazers_count: 10,
          watchers_count: 5,
          forks_count: 2,
          open_issues_count: 1,
          size: 1024,
          default_branch: "main",
          private: false,
          created_at: "2024-01-01T00:00:00Z",
          updated_at: "2024-01-02T00:00:00Z",
          license: {
            key: "mit",
            name: "MIT License",
            spdx_id: "MIT",
            url: "https://opensource.org/licenses/MIT",
          },
          owner: {
            login: "testuser",
            avatar_url: "https://example.com/avatar.jpg",
          },
        },
      ];

      mockAxiosInstance.get.mockResolvedValueOnce({ data: mockRepos });

      const result = await githubApi.getUserRepositories("testuser");

      expect(mockAxiosInstance.get).toHaveBeenCalledWith(
        "/users/testuser/repos",
        {
          params: {
            page: 1,
            per_page: 30,
            sort: "updated",
            direction: "desc",
          },
        }
      );
      expect(result).toEqual(mockRepos);
    });

    it("should fetch repositories with custom pagination", async () => {
      mockAxiosInstance.get.mockResolvedValueOnce({ data: [] });

      await githubApi.getUserRepositories("testuser", 2, 50);

      expect(mockAxiosInstance.get).toHaveBeenCalledWith(
        "/users/testuser/repos",
        {
          params: {
            page: 2,
            per_page: 50,
            sort: "updated",
            direction: "desc",
          },
        }
      );
    });
  });

  describe("getRepository", () => {
    it("should fetch repository successfully", async () => {
      const mockRepo: GitHubRepository = {
        id: 1,
        name: "test-repo",
        full_name: "testuser/test-repo",
        description: "Test repository",
        html_url: "https://github.com/testuser/test-repo",
        clone_url: "https://github.com/testuser/test-repo.git",
        language: "TypeScript",
        stargazers_count: 10,
        watchers_count: 5,
        forks_count: 2,
        open_issues_count: 1,
        size: 1024,
        default_branch: "main",
        private: false,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-02T00:00:00Z",
        license: null,
        owner: {
          login: "testuser",
          avatar_url: "https://example.com/avatar.jpg",
        },
      };

      mockAxiosInstance.get.mockResolvedValueOnce({ data: mockRepo });

      const result = await githubApi.getRepository("testuser", "test-repo");

      expect(mockAxiosInstance.get).toHaveBeenCalledWith(
        "/repos/testuser/test-repo"
      );
      expect(result).toEqual(mockRepo);
    });

    it("should throw error when repository not found", async () => {
      const mockError = new Error("Repository not found");
      mockAxiosInstance.get.mockRejectedValueOnce(mockError);

      await expect(
        githubApi.getRepository("testuser", "nonexistent-repo")
      ).rejects.toThrow("Repository not found");
    });
  });
});
