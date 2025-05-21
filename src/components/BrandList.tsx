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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center p-4 sm:p-0">
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
      <div className="flex justify-center mt-8 gap-2">
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
    </>
  );
}

export default BrandList;
