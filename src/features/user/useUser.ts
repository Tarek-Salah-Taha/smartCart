import { UserData } from "../../types/types";
import { getCurrentUser } from "../../services/userApi";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery<UserData | null>({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    isError,
  };
}
