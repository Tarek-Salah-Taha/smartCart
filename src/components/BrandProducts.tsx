import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { fetchProductsByBrand } from "../services/productsApi";
import Spinner from "./Spinner";
import Errors from "./Errors";

import { FaArrowAltCircleLeft } from "react-icons/fa";
import ProductCard from "./ProductCard";
import { Product } from "../types/types";

function BrandProducts() {
  const { brand } = useParams<{ brand: string }>();

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<Product[]>({
    queryKey: [brand],
    queryFn: () =>
      brand
        ? fetchProductsByBrand(brand)
        : Promise.reject(new Error("Category is undefined")),
  });

  if (!brand) {
    return <Errors message="Category not found." />;
  }

  if (isLoading) return <Spinner />;
  if (isError) return <Errors message="Failed to load products." />;

  return (
    <div className="container mx-auto p-6">
      <div className="mb-4 flex items-center gap-2">
        <Link
          to="/brands"
          className="flex items-center gap-1 text-[#d87d4a] hover:text-black text-sm font-medium hover:underline"
        >
          <FaArrowAltCircleLeft className="text-lg" />
          <span className="text-lg">Back to All Brands</span>
        </Link>
      </div>

      <h1 className="text-3xl font-bold capitalize">{brand} products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {products?.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}

export default BrandProducts;
