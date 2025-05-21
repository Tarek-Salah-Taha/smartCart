import { useQuery } from "@tanstack/react-query";
import { getFavorites } from "../../services/favoritesApi";

export function useFavorites(userId: string, options = {}) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["favorites", userId],
    queryFn: () => getFavorites(userId),
    enabled: !!userId,
    ...options,
  });

  return { data, isLoading, isError };
}
