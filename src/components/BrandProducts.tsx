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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 md:mb-8">
        <Link
          to="/brands"
          className="inline-flex items-center gap-2 text-[#d87d4a] hover:text-[#c76b3a] transition-colors duration-300 font-medium group"
        >
          <FaArrowAltCircleLeft className="text-lg group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="text-base md:text-lg">Back to All Brands</span>
        </Link>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 capitalize mb-6 md:mb-8">
        {brand} Products
      </h1>

      {products?.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">
            No products found for {brand}.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products?.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default BrandProducts;
