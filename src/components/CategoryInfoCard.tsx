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
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-xl max-w-sm mx-auto border border-gray-100 flex flex-col">
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Make the content area a flex column */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="space-y-3 flex-grow">
          <h2 className="text-2xl font-bold text-gray-800 capitalize">
            {title}
          </h2>
          <p className="text-base text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Stick this to the bottom */}
        <div className="pt-4">
          <Link
            to={link}
            className="group inline-flex items-center gap-1 text-sm text-gray-800 hover:text-[#d87d4a] transition-all font-medium"
          >
            <span className="group-hover:underline group-hover:font-semibold text-base">
              Explore Related Products
            </span>
            <BsArrowRightSquare
              size={30}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CategoryInfoCard;
