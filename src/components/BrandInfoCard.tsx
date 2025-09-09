import { BsArrowRightSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Brand } from "../types/types";

function BrandInfoCard({ title, description, link, image }: Brand) {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg max-w-full sm:max-w-sm mx-auto border border-gray-100 flex flex-col h-full">
      <div className="flex items-center justify-center h-48 bg-gray-50 p-4">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="max-w-full max-h-32 object-contain"
        />
      </div>
      <div className="flex flex-col p-5 space-y-3 flex-grow">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <p className="text-gray-600 leading-relaxed text-base line-clamp-3">
          {description}
        </p>
      </div>

      <div className="p-5 pt-0 flex justify-end items-end">
        <Link
          to={link}
          className="group inline-flex items-center gap-2 text-gray-700 hover:text-[#d87d4a] transition-all duration-300 font-medium"
        >
          <span className="group-hover:underline group-hover:font-semibold text-base">
            Browse Products
          </span>
          <BsArrowRightSquare
            size={24}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );
}

export default BrandInfoCard;
