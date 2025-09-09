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
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto mb-12 text-center px-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6 leading-tight">
          Shop Premium Products
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
          Our curated collection features the finest products from top brands.
          Whether you're upgrading your tech or discovering new favorites, we
          offer the best deals with free shipping options.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mb-12">
        <AnimatePresence>
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </AnimatePresence>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center mt-12">
          <div className="text-sm text-gray-500 mb-4">
            Page {currentPage} of {totalPages}
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => {
              const pageNumber = i + 1;
              // Show limited page numbers with ellipsis for many pages
              if (
                totalPages <= 7 ||
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
              ) {
                return (
                  <button
                    key={pageNumber}
                    onClick={() => goToPage(pageNumber)}
                    className={`min-w-[44px] px-3 py-2 rounded-lg border transition-colors duration-200 font-medium ${
                      currentPage === pageNumber
                        ? "bg-[#d87d4a] text-white border-[#d87d4a]"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              } else if (
                pageNumber === currentPage - 2 ||
                pageNumber === currentPage + 2
              ) {
                return (
                  <span key={pageNumber} className="px-2 py-2">
                    ...
                  </span>
                );
              }
              return null;
            })}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
