import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  addToFavorites as addFavoriteRedux,
  removeFromFavorites as removeFavoriteRedux,
  clearFavorites as clearFavoritesRedux,
} from "../favorites/favoritesSlice";
import {
  addFavorite,
  removeFavorite,
  removeAllFavorites,
} from "../../services/favoritesApi";
import { useUser } from "../user/useUser";
import { Favorite, RootState } from "../../types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useFavoritesManager() {
  const dispatch = useAppDispatch();
  const guestFavorites = useAppSelector(
    (state: RootState) => state.favorites.items
  );
  const { user, isAuthenticated } = useUser();

  const queryClient = useQueryClient();

  const addFavoriteMutation = useMutation({
    mutationFn: (item: Favorite) => addFavorite(user!.id, item),
    onMutate: async (newItem) => {
      await queryClient.cancelQueries({ queryKey: ["favorites", user!.id] });

      const previousFavorites = queryClient.getQueryData<Favorite[]>([
        "favorites",
        user!.id,
      ]);

      queryClient.setQueryData<Favorite[]>(
        ["favorites", user!.id],
        (old = []) => {
          const exists = old.find((fav) => fav.id === newItem.id);
          return exists ? old : [...old, newItem];
        }
      );

      return { previousFavorites };
    },
    onError: (_err, _newItem, context) => {
      if (context?.previousFavorites) {
        queryClient.setQueryData(
          ["favorites", user!.id],
          context.previousFavorites
        );
      }
      toast.error("Failed to add to favorites.");
    },
    onSuccess: () => toast.success("Added to favorites!"),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites", user!.id] });
    },
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: (itemId: number) => removeFavorite(user!.id, itemId),
    onMutate: async (itemId) => {
      await queryClient.cancelQueries({ queryKey: ["favorites", user!.id] });

      const previousFavorites = queryClient.getQueryData<Favorite[]>([
        "favorites",
        user!.id,
      ]);

      queryClient.setQueryData<Favorite[]>(
        ["favorites", user!.id],
        (old = []) => old.filter((item) => item.id !== itemId)
      );

      return { previousFavorites };
    },
    onError: (_err, _itemId, context) => {
      if (context?.previousFavorites) {
        queryClient.setQueryData(
          ["favorites", user!.id],
          context.previousFavorites
        );
      }
      toast.error("Failed to remove from favorites.");
    },
    onSuccess: () => toast.success("Removed from favorites!"),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites", user!.id] });
    },
  });

  const clearFavoriteMutation = useMutation({
    mutationFn: () => removeAllFavorites(user!.id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["favorites", user!.id] });

      const previousFavorites = queryClient.getQueryData<Favorite[]>([
        "favorites",
        user!.id,
      ]);
      queryClient.setQueryData(["favorites", user!.id], []);

      return { previousFavorites };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousFavorites) {
        queryClient.setQueryData(
          ["favorites", user!.id],
          context.previousFavorites
        );
      }
      toast.error("Failed to clear favorites.");
    },
    onSuccess: () => toast.success("Cleared favorites!"),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites", user!.id] });
    },
  });

  function add(item: Favorite) {
    if (isAuthenticated && user) {
      addFavoriteMutation.mutate(item);
    } else {
      dispatch(addFavoriteRedux(item));
      toast.success("Added to favorites!");
    }
  }

  function remove(itemId: number) {
    if (isAuthenticated && user) {
      removeFavoriteMutation.mutate(itemId);
    } else {
      dispatch(removeFavoriteRedux(itemId));
      toast.success("Removed from favorites!");
    }
  }

  function clear() {
    if (isAuthenticated && user) {
      clearFavoriteMutation.mutate();
    } else {
      dispatch(clearFavoritesRedux());
      toast.success("Cleared favorites!");
    }
  }

  return {
    guestFavorites,
    add,
    remove,
    clear,
  };
}
