import { Link } from "react-router-dom";
import banner from "../assets/banner.png";

function SaleBanner() {
  return (
    <section className="bg-white px-14 py-10 ">
      <div className=" flex flex-col-reverse md:flex-row items-center justify-between gap-2 md:gap-4">
        {/* Text Content */}
        <div className="w-full md:w-[55%] text-center md:text-left text-black md:pl-1">
          <h1 className="text-3xl sm:text-2xl md:text-3xl lg:text-6xl font-bold mb-4 leading-tight">
            Unbeatable Deals – Shop the Sale Now!
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl  mb-6">
            Discover massive savings on top products—limited time only! Don’t
            miss out on these exclusive offers.
          </p>
          <Link to="/allProducts">
            <button className="bg-[#d87d4a] text-white py-3 px-8 rounded-md text-base md:text-lg font-semibold transition-all duration-300 hover:bg-[#c76b3a] hover:scale-105">
              Shop Now
            </button>
          </Link>
        </div>

        {/* Image */}
        <div className="w-full sm:w-[80%] md:w-[45%] xl:w-[45%] 2xl:w-[40%] aspect-[4/3] md:pr-12 hover:scale-105 transition-all duration-300">
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
