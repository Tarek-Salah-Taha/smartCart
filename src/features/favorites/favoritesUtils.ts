import { FavoritesState } from "../../types/types";

export function loadFavorites() {
  const items = localStorage.getItem("favoriteItems");
  const total = localStorage.getItem("favoriteTotal");
  return {
    items: items ? JSON.parse(items) : [],
    totalQuantity: total ? JSON.parse(total) : 0,
  };
}

export function saveFavorites(state: FavoritesState) {
  localStorage.setItem("favoriteItems", JSON.stringify(state.items));
  localStorage.setItem("favoriteTotal", JSON.stringify(state.totalQuantity));
}
