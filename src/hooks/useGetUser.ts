import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { GitHubUser } from "../types/github";
import { githubApi } from "../services/githubApi";

interface UseGetUserProps {
  username: string;
  enabled?: boolean;
}

export default function useGetUser({
  username,
  enabled = true,
}: UseGetUserProps) {
  const { data, isFetching, isSuccess, error, refetch } = useQuery<
    GitHubUser,
    AxiosError
  >({
    queryKey: ["user", username],
    queryFn: () => githubApi.getUser(username),
    staleTime: 1000 * 60 * 5,
    retry: 2,
    enabled: enabled && !!username,
  });

  return {
    data,
    error,
    isSuccess,
    refetch,
    isLoading: isFetching,
    hasUser: !!username,
  };
}
