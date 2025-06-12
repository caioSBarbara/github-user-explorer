import axios, { AxiosInstance } from "axios";
import { GitHubUser, GitHubRepository } from "../types/github";

const api: AxiosInstance = axios.create({
  baseURL: "https://api.github.com",
  timeout: 10000,
  headers: {
    Accept: "application/vnd.github.v3+json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage =
      error.response?.data?.message || error.message || "Erro desconhecido";

    if (error.response?.status === 404) {
      throw new Error("Usuário não encontrado");
    }

    if (error.response?.status === 403) {
      throw new Error(
        "Limite de requisições excedido. Tente novamente mais tarde."
      );
    }

    if (error.response?.status >= 500) {
      throw new Error("Erro interno do servidor. Tente novamente mais tarde.");
    }

    throw new Error(errorMessage);
  }
);

export const githubApi = {
  async getUser(username: string): Promise<GitHubUser> {
    try {
      const response = await api.get<GitHubUser>(`/users/${username}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getUserRepositories(
    username: string,
    page: number = 1,
    perPage: number = 30
  ): Promise<GitHubRepository[]> {
    try {
      const response = await api.get<GitHubRepository[]>(
        `/users/${username}/repos`,
        {
          params: {
            page,
            per_page: perPage,
            sort: "updated",
            direction: "desc",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getRepository(owner: string, repo: string): Promise<GitHubRepository> {
    try {
      const response = await api.get<GitHubRepository>(
        `/repos/${owner}/${repo}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default githubApi;
