
import supabase from "./supabase";
import { Order } from "../types/types";

export async function createOrder(order: Omit<Order, "id" | "created_at">) {
  const { data: sessionData } = await supabase.auth.getSession();
  const userId = sessionData?.session?.user?.id;

  if (!userId) throw new Error("User must be logged in to place an order");

  const { data, error } = await supabase
    .from("orders")
    .insert([{ ...order, user_id: userId }])
    .select()
    .single();

  if (error) {
    console.error("Error creating order:", error);
    throw new Error("Could not create order");
  }

  return data;
}

export async function getOrders() {
  const { data: sessionData } = await supabase.auth.getSession();
  const userId = sessionData?.session?.user?.id;

  if (!userId) return [];

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Could not fetch orders");
  }

  return data as Order[];
}

export async function updateOrderStatus(orderId: string, status: string) {
  const { data: sessionData } = await supabase.auth.getSession();
  const userId = sessionData?.session?.user?.id;

  if (!userId) throw new Error("User must be logged in to update order");

  const { data, error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", orderId)
    .select()
    .single();

  if (error) {
    console.error("Error updating order status:", error);
    throw new Error(error.message || "Could not update order status");
  }

  if (!data) {
    throw new Error("Order not found or you don't have permission to update it");
  }

  return data;
}

export async function getOrderById(orderId: string) {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .single();

  if (error) {
    console.error("Error fetching order:", error);
    throw new Error("Could not fetch order");
  }

  return data as Order;
}

export async function updateOrderAddress(orderId: string, shippingAddress: any) {
  const { data: sessionData } = await supabase.auth.getSession();
  const userId = sessionData?.session?.user?.id;

  if (!userId) throw new Error("User must be logged in to update order");

  const { data, error } = await supabase
    .from("orders")
    .update({ shipping_address: shippingAddress })
    .eq("id", orderId)
    .select()
    .single();

  if (error) {
    console.error("Error updating order address:", error);
    throw new Error(error.message || "Could not update order address");
  }

  if (!data) {
    throw new Error("Order not found or you don't have permission to update it");
  }

  return data;
}

export async function updateOrderItems(orderId: string, items: any[], newTotal: number) {
  const { data: sessionData } = await supabase.auth.getSession();
  const userId = sessionData?.session?.user?.id;

  if (!userId) throw new Error("User must be logged in to update order");

  const { data, error } = await supabase
    .from("orders")
    .update({ items, total: newTotal })
    .eq("id", orderId)
    .select()
    .single();

  if (error) {
    console.error("Error updating order items:", error);
    throw new Error(error.message || "Could not update order items");
  }

  if (!data) {
    throw new Error("Order not found or you don't have permission to update it");
  }

  return data;
}
