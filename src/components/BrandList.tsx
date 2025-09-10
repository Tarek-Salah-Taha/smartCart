import { useState } from "react";
import brandData from "../data/brandData";
import BrandInfoCard from "./BrandInfoCard";
import { AnimatePresence } from "framer-motion";
import { ITEMS_PER_PAGE } from "../utils/constants";

function BrandList() {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastBrand = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstBrand = indexOfLastBrand - ITEMS_PER_PAGE;
  const currentBrand = brandData.slice(indexOfFirstBrand, indexOfLastBrand);

  const totalPages = Math.ceil(brandData.length / ITEMS_PER_PAGE);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-items-center">
        <AnimatePresence>
          {currentBrand.map((category) => (
            <BrandInfoCard
              key={category.title}
              image={category.image}
              title={category.title}
              description={category.description}
              link={category.link}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-10 md:mt-12 gap-1 sm:gap-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 sm:px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium text-sm sm:text-base"
        >
          <span className="hidden sm:inline">Previous</span>
          <span className="sm:hidden">Prev</span>
        </button>

        <div className="flex gap-1 sm:gap-2 overflow-x-auto max-w-[200px] sm:max-w-none">
          {/* Mobile: Show limited page numbers */}
          <div className="flex gap-1 sm:gap-2 sm:hidden">
            {totalPages <= 5 ? (
              // Show all pages if 5 or fewer
              Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => goToPage(i + 1)}
                  className={`px-2 py-2 border rounded-md transition-colors duration-200 font-medium min-w-[36px] text-sm ${
                    currentPage === i + 1
                      ? "bg-[#d87d4a] border-[#d87d4a] text-white"
                      : "border-gray-300 text-gray-700 hover:bg-[#f9f0eb]"
                  }`}
                >
                  {i + 1}
                </button>
              ))
            ) : (
              // Show condensed pagination for more than 5 pages
              <>
                {currentPage > 2 && (
                  <>
                    <button
                      onClick={() => goToPage(1)}
                      className="px-2 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-[#f9f0eb] transition-colors duration-200 font-medium min-w-[36px] text-sm"
                    >
                      1
                    </button>
                    {currentPage > 3 && (
                      <span className="px-1 py-2 text-gray-400 text-sm">
                        ...
                      </span>
                    )}
                  </>
                )}

                {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                  let pageNum;
                  if (currentPage <= 2) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 1) {
                    pageNum = totalPages - 2 + i;
                  } else {
                    pageNum = currentPage - 1 + i;
                  }

                  if (pageNum > 0 && pageNum <= totalPages) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => goToPage(pageNum)}
                        className={`px-2 py-2 border rounded-md transition-colors duration-200 font-medium min-w-[36px] text-sm ${
                          currentPage === pageNum
                            ? "bg-[#d87d4a] border-[#d87d4a] text-white"
                            : "border-gray-300 text-gray-700 hover:bg-[#f9f0eb]"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  }
                  return null;
                })}

                {currentPage < totalPages - 1 && (
                  <>
                    {currentPage < totalPages - 2 && (
                      <span className="px-1 py-2 text-gray-400 text-sm">
                        ...
                      </span>
                    )}
                    <button
                      onClick={() => goToPage(totalPages)}
                      className="px-2 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-[#f9f0eb] transition-colors duration-200 font-medium min-w-[36px] text-sm"
                    >
                      {totalPages}
                    </button>
                  </>
                )}
              </>
            )}
          </div>

          {/* Desktop: Show all pages */}
          <div className="hidden sm:flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => goToPage(i + 1)}
                className={`px-3 py-2 border rounded-md transition-colors duration-200 font-medium min-w-[44px] ${
                  currentPage === i + 1
                    ? "bg-[#d87d4a] border-[#d87d4a] text-white"
                    : "border-gray-300 text-gray-700 hover:bg-[#f9f0eb]"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 sm:px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium text-sm sm:text-base"
        >
          <span className="hidden sm:inline">Next</span>
          <span className="sm:hidden">Next</span>
        </button>
      </div>
    </>
  );
}

export default BrandList;
