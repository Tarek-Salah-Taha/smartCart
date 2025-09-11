import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { AnimatePresence } from "framer-motion";

import { fetchProductsByCategory } from "../services/productsApi";
import Spinner from "./Spinner";
import Errors from "./Errors";
import ProductCard from "./ProductCard";
import { Product } from "../types/types";
import { ITEMS_PER_PAGE } from "../utils/constants";

function CategoryProducts() {
  const { category } = useParams<{ category: string }>();
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery<Product[]>({
    queryKey: [category],
    queryFn: () =>
      category
        ? fetchProductsByCategory(category)
        : Promise.reject(new Error("Category is undefined")),
  });

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  if (!category) {
    return <Errors message="Category not found." />;
  }

  if (isLoading) return <Spinner />;
  if (isError) return <Errors message="Failed to load products." />;

  // Pagination logic
  const indexOfLastProduct = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - ITEMS_PER_PAGE;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top when changing pages
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 md:mb-8">
        <Link
          to="/categories"
          className="inline-flex items-center gap-2 text-[#d87d4a] hover:text-[#c76b3a] transition-colors duration-300 font-medium group"
        >
          <FaArrowAltCircleLeft className="text-lg group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="text-base md:text-lg">Back to All Categories</span>
        </Link>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 capitalize mb-6 md:mb-8">
        {category} Products
      </h1>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">
            No products found in {category} category.
          </p>
        </div>
      ) : (
        <>
          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            <AnimatePresence>
              {currentProducts.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
            </AnimatePresence>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex flex-col items-center mt-8 sm:mt-12">
              <div className="flex flex-wrap justify-center gap-1 sm:gap-2 px-4">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-2 sm:px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium text-sm sm:text-base"
                >
                  <span className="hidden sm:inline">Previous</span>
                  <span className="sm:hidden">Prev</span>
                </button>

                {/* Mobile view: Show fewer pages */}
                <div className="flex gap-1 sm:hidden">
                  {totalPages <= 5 ? (
                    // Show all pages if 5 or fewer
                    Array.from({ length: totalPages }, (_, i) => {
                      const pageNumber = i + 1;
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => goToPage(pageNumber)}
                          className={`min-w-[36px] px-2 py-2 rounded-lg border transition-colors duration-200 font-medium text-sm ${
                            currentPage === pageNumber
                              ? "bg-[#d87d4a] text-white border-[#d87d4a]"
                              : "border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })
                  ) : (
                    // Show condensed version for many pages
                    <>
                      {/* First page */}
                      {currentPage > 2 && (
                        <>
                          <button
                            onClick={() => goToPage(1)}
                            className="min-w-[36px] px-2 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium text-sm"
                          >
                            1
                          </button>
                          {currentPage > 3 && (
                            <span className="px-1 py-2 text-gray-400 text-xs">
                              ...
                            </span>
                          )}
                        </>
                      )}

                      {/* Current page and adjacent pages */}
                      {[currentPage - 1, currentPage, currentPage + 1]
                        .filter((page) => page >= 1 && page <= totalPages)
                        .map((pageNumber) => (
                          <button
                            key={pageNumber}
                            onClick={() => goToPage(pageNumber)}
                            className={`min-w-[36px] px-2 py-2 rounded-lg border transition-colors duration-200 font-medium text-sm ${
                              currentPage === pageNumber
                                ? "bg-[#d87d4a] text-white border-[#d87d4a]"
                                : "border-gray-300 text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            {pageNumber}
                          </button>
                        ))}

                      {/* Last page */}
                      {currentPage < totalPages - 1 && (
                        <>
                          {currentPage < totalPages - 2 && (
                            <span className="px-1 py-2 text-gray-400 text-xs">
                              ...
                            </span>
                          )}
                          <button
                            onClick={() => goToPage(totalPages)}
                            className="min-w-[36px] px-2 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium text-sm"
                          >
                            {totalPages}
                          </button>
                        </>
                      )}
                    </>
                  )}
                </div>

                {/* Desktop view: Original logic with responsive adjustments */}
                <div className="hidden sm:flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => {
                    const pageNumber = i + 1;
                    // Show limited page numbers with ellipsis for many pages
                    if (
                      totalPages <= 7 ||
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 &&
                        pageNumber <= currentPage + 1)
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
                        <span
                          key={pageNumber}
                          className="px-2 py-2 text-gray-400"
                        >
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-2 sm:px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium text-sm sm:text-base"
                >
                  <span className="hidden sm:inline">Next</span>
                  <span className="sm:hidden">Next</span>
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CategoryProducts;
