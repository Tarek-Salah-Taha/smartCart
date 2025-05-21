import { Item } from "../types/types";
import supabase from "./supabase";

async function upsertCart(userId: string, cartItems: Item[]) {
  const { error } = await supabase
    .from("cart")
    .upsert(
      { user_id: userId, cart_items: cartItems },
      { onConflict: "user_id" }
    )
    .select();

  if (error) {
    console.error("🔴 Upsert cart error:", error);
    throw new Error(error.message || "Failed to update cart");
  }

  return cartItems;
}

// Fetch all cart items for a specific user
export async function fetchUserCart(
  userId: string | null
): Promise<Item[] | null> {
  const { data, error } = await supabase
    .from("cart")
    .select("cart_items")
    .eq("user_id", userId)
    .maybeSingle();

  console.log(data);

  if (error) {
    throw new Error(error.message || "Failed to fetch cart");
  }

  return data?.cart_items ?? []; // return null if no row found
}

// In the addToCart function (or anywhere appropriate)
export async function addToCart(userId: string, item: Item) {
  const currentCart = (await fetchUserCart(userId)) ?? [];

  const existingItem = currentCart.find((ci) => ci.itemId === item.itemId);
  if (existingItem) {
    existingItem.quantity += item.quantity;
  } else {
    currentCart.push(item);
  }

  return await upsertCart(userId, currentCart);
}

export async function removeFromCart(userId: string, itemId: number) {
  const currentCart = await fetchUserCart(userId);
  if (!currentCart) throw new Error("Cart not found");

  const updatedCart = currentCart.filter((item) => item.itemId !== itemId);
  if (updatedCart.length === currentCart.length) {
    throw new Error("Item not found in cart");
  }

  return await upsertCart(userId, updatedCart);
}

export async function updateItemQuantity(
  userId: string,
  itemId: number,
  newQuantity: number
) {
  const currentCart = await fetchUserCart(userId);
  if (!currentCart) throw new Error("Cart not found");

  const item = currentCart.find((i) => i.itemId === itemId);
  if (!item) throw new Error("Item not found in cart");

  item.quantity = newQuantity;

  return await upsertCart(userId, currentCart);
}

export async function clearUserCart(userId: string) {
  return await upsertCart(userId, []);
}
