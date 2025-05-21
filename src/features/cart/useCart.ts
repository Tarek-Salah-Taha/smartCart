import { useQuery } from "@tanstack/react-query";
import { fetchUserCart } from "../../services/cartApi";

export function useCart(userId: string, options = {}) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["cart", userId],
    queryFn: () => fetchUserCart(userId),
    enabled: !!userId,
    ...options,
  });

  return { data, isLoading, isError };
}
