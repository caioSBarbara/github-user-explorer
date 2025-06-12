import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { GitHubRepository } from "../types/github";
import { githubApi } from "../services/githubApi";

interface UseGetRepositoryProps {
  owner: string;
  repo: string;
  enabled?: boolean;
}

export default function useGetRepository({
  owner,
  repo,
  enabled = true,
}: UseGetRepositoryProps) {
  const { data, isFetching, isSuccess, error, refetch } = useQuery<
    GitHubRepository,
    AxiosError
  >({
    queryKey: ["repository", owner, repo],
    queryFn: () => githubApi.getRepository(owner, repo),
    staleTime: 1000 * 60 * 5,
    retry: 2,
    enabled: enabled && !!owner && !!repo,
  });

  return {
    data,
    error,
    isSuccess,
    refetch,
    isLoading: isFetching,
    hasParams: !!owner && !!repo,
    repository: data,
  };
}
