import { useEffect } from "react";
// import supabase from "../../services/supabase";
import { UserData } from "../../types/types";
import { fetchUser } from "../../services/userApi";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery<UserData | null>({
    queryKey: ["user"],
    queryFn: fetchUser,
    initialData: () => {
      const cached = localStorage.getItem("user");
      return cached ? (JSON.parse(cached) as UserData) : null;
    },
  });

  // Handle localStorage updates when user data changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else if (user === null) {
      localStorage.removeItem("user");
    }
  }, [user]);

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    isError,
  };
}
