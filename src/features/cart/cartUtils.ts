import { CartState } from "../../types/types";

export function loadCart() {
  const items = localStorage.getItem("cartItems");
  const total = localStorage.getItem("cartTotal");
  return {
    items: items ? JSON.parse(items) : [],
    totalQuantity: total ? JSON.parse(total) : 0,
  };
}

export function saveCart(state: CartState) {
  localStorage.setItem("cartItems", JSON.stringify(state.items));
  localStorage.setItem("cartTotal", JSON.stringify(state.totalQuantity));
}
