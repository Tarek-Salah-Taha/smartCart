import Slider from "react-slick";
import categoryData from "../data/categoryData";
import CategoryCard from "./CategoryCard";

// Slider settings with responsive breakpoints
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1280, // xl screens
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 1024, // lg screens
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 768, // md screens
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 640, // sm and below
      settings: {
        slidesToShow: 1,
        centerMode: true,
        centerPadding: "60px",
      },
    },
  ],
};

function PopularCategories() {
  return (
    <section className="py-10 md:py-14 lg:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-10 lg:mb-12 text-gray-900 text-center">
          Popular Categories
        </h2>

        <div className="relative">
          <Slider {...settings} className="category-slider">
            {categoryData.map((category) => (
              <div key={category.title} className="px-2 md:px-3">
                <div className="h-full">
                  <CategoryCard
                    category={category}
                    icon={category.icon}
                    link={category.link}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default PopularCategories;
