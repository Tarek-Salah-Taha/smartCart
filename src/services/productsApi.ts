import { Product } from "../types/types";
import supabase from "./supabase";

export async function fetchProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id");

    if (error) {
      throw new Error(`Failed to fetch products: ${error.message}`);
    }

    return data || [];
  } catch (err) {
    console.error("Error fetching products:", err);
    throw err;
  }
}

export async function fetchProductsByCategory(
  category: string
): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", category.toLowerCase())
      .order("id");

    if (error) {
      throw new Error(`Failed to fetch products by category: ${error.message}`);
    }

    return data || [];
  } catch (err) {
    console.error("Error fetching products by category:", err);
    throw err;
  }
}

export const fetchProductsByBrand = async (
  brand: string
): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .ilike("brand", brand) // Case-insensitive search
      .order("id");

    if (error) {
      throw new Error(`Failed to fetch products by brand: ${error.message}`);
    }

    return data || [];
  } catch (err) {
    console.error("Error fetching products by brand:", err);
    throw err;
  }
};
