import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import brandData from "../data/brandData";

const featuredBrands = brandData.filter((brand) => brand.isFeatured);

function FeaturedBrands() {
  return (
    <section className="bg-gradient-to-r from-cyan-800 to-orange-500 p-16 rounded-2xl shadow-2xl">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-white mb-10 text-center tracking-tight">
          Your Favorite Brands, All in One Place
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {featuredBrands.map((brand) => (
            <motion.div
              key={brand.title}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 250, damping: 18 }}
              className="bg-white rounded-xl p-4 shadow-md hover:shadow-2xl transition-all flex items-center justify-center min-h-[120px]"
            >
              <Link to={brand.link} className="w-full flex justify-center">
                <img
                  src={brand.image}
                  alt={brand.title}
                  loading="lazy"
                  className="w-36 h-20 object-contain transition duration-300"
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedBrands;
