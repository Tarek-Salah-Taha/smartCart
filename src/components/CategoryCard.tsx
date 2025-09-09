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
        className="flex flex-col items-center justify-between p-5 sm:p-6 w-40 h-40 sm:w-52 sm:h-48 bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-gray-200 transition-all duration-300 group cursor-pointer"
      >
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#d87d4a] flex items-center justify-center rounded-xl shadow-sm group-hover:scale-105 transition-transform duration-300">
          <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
        </div>

        <p className="mt-3 text-sm sm:mt-4 sm:text-base font-medium text-center text-gray-900 group-hover:text-[#d87d4a] transition-colors duration-300 capitalize line-clamp-2">
          {category.title}
        </p>
      </motion.div>
    </Link>
  );
}

export default CategoryCard;
