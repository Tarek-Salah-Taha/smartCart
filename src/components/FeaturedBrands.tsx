import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import brandData from "../data/brandData";

const featuredBrands = brandData.filter((brand) => brand.isFeatured);

function FeaturedBrands() {
  return (
    <section className="bg-gradient-to-r from-cyan-800 to-orange-500 py-10 px-4 sm:py-14 md:py-16 lg:py-20 sm:px-6 lg:px-8 rounded-xl md:rounded-2xl shadow-lg">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 md:mb-8 lg:mb-10 text-center tracking-tight leading-snug px-2">
          Your Favorite Brands, All in One Place
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
          {featuredBrands.slice(0, 6).map(
            (
              brand // Show only 6 brands max
            ) => (
              <motion.div
                key={brand.title}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 250, damping: 18 }}
                className="bg-white rounded-lg md:rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-lg transition-all flex items-center justify-center min-h-[90px] sm:min-h-[110px] md:min-h-[120px]"
              >
                <Link
                  to={brand.link}
                  className="w-full flex justify-center p-1"
                >
                  <img
                    src={brand.image}
                    alt={brand.title}
                    loading="lazy"
                    className="max-w-full max-h-[50px] sm:max-h-[60px] md:max-h-[70px] object-contain transition duration-300 hover:opacity-90"
                  />
                </Link>
              </motion.div>
            )
          )}
        </div>

        {/* View All Brands button for mobile */}
        <div className="mt-8 sm:mt-10 flex justify-center ">
          <Link
            to="/brands"
            className="bg-white text-[#d87d4a] py-3 px-6 sm:py-4 sm:px-8 rounded-md text-base md:text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
          >
            View All Brands
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedBrands;
