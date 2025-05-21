import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import toast from "react-hot-toast";
import { loadFavorites, saveFavorites } from "./favoritesUtils";
import { Favorite, FavoritesState } from "../../types/types";

const { items, totalQuantity } = loadFavorites();
const initialState: FavoritesState = { items, totalQuantity };

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites(state, action: PayloadAction<Favorite>) {
      const product = action.payload;
      const exists = state.items.find((item) => item.id === product.id);
      if (!exists) {
        state.items.push(product);
        state.totalQuantity++; // <-- increase totalQuantity
        saveFavorites(state);
      }
    },
    removeFromFavorites(state, action: PayloadAction<number>) {
      const productId = action.payload;
      const removedItem = state.items.find((item) => item.id === productId);
      if (removedItem) {
        state.items = state.items.filter((item) => item.id !== productId);
        state.totalQuantity--; // <-- decrease totalQuantity
        saveFavorites(state);
      }
    },
    clearFavorites(state) {
      state.items = [];
      state.totalQuantity = 0;
      saveFavorites(state);
    },
  },
});

export const { addToFavorites, removeFromFavorites, clearFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
