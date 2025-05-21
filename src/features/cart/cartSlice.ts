import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import toast from "react-hot-toast";
import { loadCart, saveCart } from "./cartUtils";
import { CartItem, CartState } from "../../types/types";

const { items, totalQuantity } = loadCart();
const initialState: CartState = { items, totalQuantity };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.itemId === newItem.itemId
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...newItem, quantity: newItem.quantity || 1 });
      }

      state.totalQuantity += 1;
      saveCart(state);
    },

    decreaseQuantity(state, action: PayloadAction<number>) {
      const itemId = action.payload;
      const item = state.items.find((i) => i.itemId === itemId);

      if (item) {
        if (item.quantity === 1) {
          state.items = state.items.filter((i) => i.itemId !== itemId);
        } else {
          item.quantity -= 1;
        }

        state.totalQuantity -= 1;
        saveCart(state);
      }
    },

    increaseQuantity(state, action: PayloadAction<number>) {
      const itemId = action.payload;
      const item = state.items.find((i) => i.itemId === itemId);

      if (item) {
        item.quantity += 1;
        state.totalQuantity += 1;
        saveCart(state);
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      const itemId = action.payload;
      const item = state.items.find((i) => i.itemId === itemId);

      if (item) {
        state.totalQuantity -= item.quantity;
        state.items = state.items.filter((i) => i.itemId !== itemId);
        saveCart(state);
      }
    },

    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      saveCart(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
