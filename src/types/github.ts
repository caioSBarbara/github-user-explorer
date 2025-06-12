export interface GitHubUser {
  id: number;
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  email: string | null;
  location: string | null;
  blog: string | null;
  followers: number;
  following: number;
  public_repos: number;
  created_at: string;
  updated_at: string;
  html_url: string;
}

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  clone_url: string;
  language: string | null;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  size: number;
  default_branch: string;
  private: boolean;
  created_at: string;
  updated_at: string;
  license: {
    key: string;
    name: string;
    spdx_id: string;
    url: string | null;
  } | null;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export interface GitHubSearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubUser[];
}

export interface GitHubLanguages {
  [language: string]: number;
}

export type SortBy = "stars" | "name" | "updated" | "created";
export type SortOrder = "asc" | "desc";
