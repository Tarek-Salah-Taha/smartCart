import { useQuery } from "@tanstack/react-query";
import { fetchUserCart } from "../../services/cartApi";

export function useCart(userId: string, options = {}) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["cart", userId],
    queryFn: () => fetchUserCart(userId),
    enabled: !!userId,
    staleTime: 1000 * 30, // 30 seconds
    ...options,
  });

  return { data, isLoading, isError };
}
