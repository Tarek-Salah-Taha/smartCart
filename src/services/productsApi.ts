import { Product } from "../types/types";

export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch("https://fakestoreapi.in/api/products?limit=150");

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await res.json();

    return data.products;
  } catch (err) {
    {
      throw err;
    }
  }
}

export async function fetchProductsByCategory(
  category: string
): Promise<Product[]> {
  try {
    const res = await fetch(
      `https://fakestoreapi.in/api/products/category?type=${category}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await res.json();

    return data.products;
  } catch (err) {
    {
      throw err;
    }
  }
}

export const fetchProductsByBrand = async (
  brand: string
): Promise<Product[]> => {
  try {
    const res = await fetch("https://fakestoreapi.in/api/products?limit=150");

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await res.json();

    return data.products.filter(
      (product: Product) => product.brand.toLowerCase() === brand.toLowerCase()
    );
  } catch (err) {
    {
      throw err;
    }
  }
};
