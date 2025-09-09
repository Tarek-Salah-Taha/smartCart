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
      <div className="flex justify-center mt-10 md:mt-12 gap-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
        >
          Previous
        </button>

        <div className="flex gap-2">
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

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
        >
          Next
        </button>
      </div>
    </>
  );
}

export default BrandList;
