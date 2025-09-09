import { Link } from "react-router-dom";
import banner from "../assets/banner.png";

function SaleBanner() {
  return (
    <section className="bg-white px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-6 md:gap-8 lg:gap-12">
        {/* Text Content */}
        <div className="w-full md:w-1/2 text-center md:text-left text-black">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
            Unbeatable Deals – Shop the Sale Now!
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-gray-700">
            Discover massive savings on top products—limited time only! Don't
            miss out on these exclusive offers.
          </p>
          <Link to="/allProducts">
            <button className="bg-[#d87d4a] text-white py-3 px-6 sm:py-4 sm:px-8 rounded-md text-base md:text-lg font-semibold transition-all duration-300 hover:bg-[#c76b3a] hover:scale-105 shadow-md hover:shadow-lg">
              Shop Now
            </button>
          </Link>
        </div>

        {/* Image */}
        <div className="w-full sm:w-4/5 md:w-1/2 lg:w-[45%] aspect-[4/3] hover:scale-105 transition-all duration-300">
          <img
            src={banner}
            alt="Sale Banner"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

export default SaleBanner;
