import { BsArrowRightSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Brand } from "../types/types";

function BrandInfoCard({ title, description, link, image }: Brand) {
  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-xl max-w-full sm:max-w-sm mx-auto border border-gray-100 flex flex-col h-full">
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-40 object-scale-down"
        />
      </div>
      <div className="flex flex-col p-4 space-y-2 flex-grow">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-base text-gray-600 leading-relaxed">{description}</p>
      </div>

      <div className="p-4 flex justify-end items-end">
        <Link
          to={link}
          className="group inline-flex items-center gap-1 text-sm text-gray-800 hover:text-[#d87d4a] transition-all font-medium"
        >
          <span className="group-hover:underline group-hover:font-semibold text-base">
            Browse Products
          </span>
          <BsArrowRightSquare
            size={30}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );
}

export default BrandInfoCard;
