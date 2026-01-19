import { Link } from "react-router-dom";
import categoryData from "../data/categoryData";
import { FaArrowRight } from "react-icons/fa";

function PopularCategories() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900 font-manrope tracking-tight">
            Explore Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-roboto">
            Discover our wide range of premium products tailored to your lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Mapping through category data */}
          {categoryData.map((category) => (
            <Link
              key={category.title}
              to={`categories/${category.link}`}
              className="group relative h-64 md:h-80 w-full overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-2 border border-white/20"
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0 w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 transition-opacity duration-300 group-hover:via-black/40" />
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                />
              </div>

              {/* Content Container */}
              <div className="absolute bottom-0 left-0 w-full p-6 z-20 flex flex-col justify-end h-full">
                <div className="transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                  {/* Icon & Title Row */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2.5 bg-white/20 backdrop-blur-md rounded-xl text-white shadow-sm ring-1 ring-white/30 group-hover:bg-white group-hover:text-black transition-colors duration-300">
                      <category.icon className="text-xl" />
                    </div>
                    <h3 className="text-2xl font-bold text-white capitalize font-manrope tracking-wide">
                      {category.title}
                    </h3>
                  </div>

                  {/* Description - Hides/Shows on hover for desktop, always visible/subtle on mobile */}
                  <div className="overflow-hidden max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                    <p className="text-gray-200 text-sm leading-relaxed mb-4 font-roboto line-clamp-3">
                      {category.description}
                    </p>

                    <div className="flex items-center text-white font-semibold text-sm tracking-wide gap-2 group-hover:gap-3 transition-all">
                      <span>Shop Now</span>
                      <FaArrowRight />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularCategories;
