import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { GitHubRepository } from "../types/github";
import { githubApi } from "../services/githubApi";

interface UseGetUserRepositoriesProps {
  username: string;
  page?: number;
  perPage?: number;
  enabled?: boolean;
}

export default function useGetUserRepositories({
  username,
  page = 1,
  perPage = 30,
  enabled = true,
}: UseGetUserRepositoriesProps) {
  const { data, isFetching, isSuccess, error, refetch } = useQuery<
    GitHubRepository[],
    AxiosError
  >({
    queryKey: ["userRepositories", username, page, perPage],
    queryFn: () => githubApi.getUserRepositories(username, page, perPage),
    staleTime: 1000 * 60 * 2,
    retry: 2,
    enabled: enabled && !!username,
  });

  return {
    data,
    error,
    isSuccess,
    refetch,
    isLoading: isFetching,
    hasUsername: !!username,
    repositories: data || [],
  };
}
