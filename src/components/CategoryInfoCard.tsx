import { BsArrowRightSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import { CategoryInfoCardProps } from "../types/types";

function CategoryInfoCard({
  title,
  description,
  link,
  image,
}: CategoryInfoCardProps) {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg max-w-sm mx-auto border border-gray-100 flex flex-col h-full">
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-48 object-cover"
        />
      </div>

      <div className="p-5 flex flex-col flex-grow space-y-4">
        <div className="space-y-3 flex-grow">
          <h2 className="text-xl font-semibold text-gray-900 capitalize">
            {title}
          </h2>
          <p className="text-gray-600 leading-relaxed text-base line-clamp-3">
            {description}
          </p>
        </div>

        <div className="pt-2">
          <Link
            to={link}
            className="group inline-flex items-center gap-2 text-gray-700 hover:text-[#d87d4a] transition-all duration-300 font-medium"
          >
            <span className="group-hover:underline group-hover:font-semibold text-base">
              Explore Products
            </span>
            <BsArrowRightSquare
              size={24}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CategoryInfoCard;
