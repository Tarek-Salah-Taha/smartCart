import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CategoryCardProps } from "../types/types";

function CategoryCard({ category, icon: Icon, link }: CategoryCardProps) {
  return (
    <Link to={`categories/${link}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="flex flex-col items-center justify-between p-4 sm:p-6 w-40 h-40 sm:w-60 sm:h-48 bg-white rounded-2xl shadow-md hover:shadow-lg border border-gray-200 hover:border-gray-300 transition-all duration-300 group cursor-pointer"
      >
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#d87d4a] flex items-center justify-center rounded-2xl shadow-sm group-hover:scale-105 transition-transform duration-300">
          <Icon className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
        </div>

        <p className="mt-3 text-base sm:mt-4 sm:text-lg md:text-2xl lg:text-2xl font-semibold text-center text-neutral-800 group-hover:text-[#d87d4a] transition-colors duration-300 capitalize">
          {category.title}
        </p>
      </motion.div>
    </Link>
  );
}

export default CategoryCard;
