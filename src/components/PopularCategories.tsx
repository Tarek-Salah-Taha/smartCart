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
  responsive: [
    {
      breakpoint: 1280, // xl screens
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 1024, // lg screens
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 640, // sm and below
      settings: {
        slidesToShow: 1,
        centerMode: true, // Center the single card
        centerPadding: "100px", // Add some padding on sides
      },
    },
  ],
};

function PopularCategories() {
  return (
    <section className="py-12 px-4 min-h-[25rem]">
      <h2 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold mb-12 text-left text-black pl-10">
        Popular Categories
      </h2>

      <Slider {...settings}>
        {categoryData.map((category) => (
          <div key={category.title} className="px-2">
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
    </section>
  );
}

export default PopularCategories;
