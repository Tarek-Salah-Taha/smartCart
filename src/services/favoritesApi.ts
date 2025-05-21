import { Favorite } from "../types/types";
import supabase from "./supabase";

async function upsertFavorites(userId: string, favoritesItems: Favorite[]) {
  const { error } = await supabase
    .from("favorites")
    .upsert(
      { user_id: userId, favorites_items: favoritesItems },
      { onConflict: "user_id" }
    );

  if (error) {
    console.error("🔴 Upsert favorites error:", error);
    throw new Error(error.message || "Failed to update favorites");
  }

  return favoritesItems;
}

// Function to get current favorites for a user
export async function getFavorites(userId: string | null): Promise<Favorite[]> {
  const { data, error } = await supabase
    .from("favorites")
    .select("favorites_items")
    .eq("user_id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("🔴 Fetch favorites error:", error);
    throw new Error(error.message || "Failed to fetch favorites");
  }

  const favorites = data?.favorites_items ?? [];

  return favorites;
}

export async function addFavorite(userId: string, item: Favorite) {
  const currentFavorites = await getFavorites(userId);

  const alreadyExists = currentFavorites.some((fav) => fav.id === item.id);
  if (alreadyExists) {
    return currentFavorites;
  }

  const updatedFavorites = [
    ...currentFavorites,
    {
      id: item.id,
      title: item.title,
      image: item.image,
      price: item.price,
    },
  ];

  return await upsertFavorites(userId, updatedFavorites);
}

export async function removeFavorite(userId: string, itemId: number) {
  const currentFavorites = await getFavorites(userId);

  const updatedFavorites = currentFavorites.filter(
    (item) => item.id !== itemId
  );
  if (updatedFavorites.length === currentFavorites.length) {
    console.warn("⚠️ Item not found in favorites:", itemId);
    return currentFavorites;
  }

  return await upsertFavorites(userId, updatedFavorites);
}

export async function removeAllFavorites(userId: string) {
  return await upsertFavorites(userId, []);
}
