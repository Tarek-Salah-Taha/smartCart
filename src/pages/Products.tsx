import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchProducts } from "../services/productsApi";
import ProductCard from "../components/ProductCard";
import Spinner from "../components/Spinner";
import Errors from "../components/Errors";
import { AnimatePresence } from "framer-motion";
import { ITEMS_PER_PAGE } from "../utils/constants";
import { Product } from "../types/types";

function Products() {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <Errors message="Failed to load products." />;

  const indexOfLastProduct = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - ITEMS_PER_PAGE;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-4 mt-4 mb-10 px-25">
      <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 pl-2 md:pl-10 text-gray-800 leading-tight ">
        Shop Premium Products with Great Deals
      </h1>
      <p className="text-gray-600 mb-4 pl-2 sm:pl-4 md:pl-10 text-xl sm:text-2xl md:text-2xl lg:text-2xl">
        Our curated collection features the finest products from top brands.
        Whether you’re upgrading your tech or discovering new favorites, we
        offer the best deals with free shipping options. Shop today and take
        advantage of exclusive discounts and limited-time offers!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 justify-items-center p-1 sm:p-4 max-w-full">
        <AnimatePresence>
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </AnimatePresence>
      </div>
      {/* Pagination Controls */}
      <div className="flex flex-wrap justify-center mt-8 gap-2 sm:gap-3 max-w-full px-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded hover:bg-gray-200 disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => goToPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1
                ? "bg-[#d87d4a] text-white"
                : "hover:bg-[#C76b3a] text-black"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded hover:bg-gray-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Products;
