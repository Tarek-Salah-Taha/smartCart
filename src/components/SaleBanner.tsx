import { Link } from "react-router-dom";
import headphonesImage from "../assets/headphones.png";
import gamingImage from "../assets/gaming.png";
import mobileImage from "../assets/mobile.png";
import appliancesImage from "../assets/appliances.png";
import laptopImage from "../assets/laptop.png";
import tvImage from "../assets/tv.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { CustomArrowProps } from "react-slick";


// Custom Arrow Components
function NextArrow({ onClick }: CustomArrowProps) {
  return (
    <button
      onClick={onClick}
      className="absolute -right-2 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-12 md:h-12 flex items-center justify-center bg-white shadow-lg hover:bg-[#d87d4a] text-gray-800 hover:text-white rounded-full border border-gray-100 transition-all duration-300 cursor-pointer flex"
      aria-label="Next"
    >
      <FaChevronRight className="w-3 h-3 md:w-5 md:h-5" />
    </button>
  );
}

function PrevArrow({ onClick }: CustomArrowProps) {
  return (
    <button
      onClick={onClick}
      className="absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-12 md:h-12 flex items-center justify-center bg-white shadow-lg hover:bg-[#d87d4a] text-gray-800 hover:text-white rounded-full border border-gray-100 transition-all duration-300 cursor-pointer flex"
      aria-label="Previous"
    >
      <FaChevronLeft className="w-3 h-3 md:w-5 md:h-5" />
    </button>
  );
}

// Banner Data
const slides = [
  {
    id: 1,
    title: "Smartphones – Power in Your Pocket",
    description:
      "Explore the latest mobiles with stunning displays, powerful cameras, and all-day performance to keep up with your life.",
    image: mobileImage,
    btnText: "Find Your Phone",
    link: "mobile",
  },
  {
    id: 2,
    title: "Headphones – Sound That Moves You",
    description:
      "Experience rich, immersive audio with noise-cancelling and wireless headphones designed for music, calls, and focus.",
    image: headphonesImage,
    btnText: "Feel the Sound",
    link: "mobile",
  },
  {
    id: 3,
    title: "Gaming – Play Without Limits",
    description:
      "Level up your setup with high-performance gaming gear built for speed, precision, and total immersion.",
    image: gamingImage,
    btnText: "Level Up",
    link: "gaming",
  },
  {
    id: 4,
    title: "Home Appliances – Smart Living",
    description:
      "Upgrade your home with reliable electrical appliances that combine efficiency, durability, and modern design.",
    image: appliancesImage,
    btnText: "Upgrade Your Home",
    link: "appliances",
  },
  {
    id: 5,
    title: "Laptops – Work, Create, Achieve",
    description:
      "Discover laptops built for productivity, creativity, and performance—perfect for work, study, and entertainment.",
    image: laptopImage,
    btnText: "Power Your Work",
    link: "laptop",
  },
  {
    id: 6,
    title: "TVs – Entertainment on a Bigger Scale",
    description:
      "Bring cinema-level visuals home with ultra-clear, smart TVs designed for movies, sports, and gaming.",
    image: tvImage,
    btnText: "Watch Bigger",
    link: "tv",
  },
];


function SaleBanner() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    fade: true,
    cssEase: "cubic-bezier(0.87, 0, 0.13, 1)",
  };

  return (
    <section className="bg-white py-6 md:py-12 lg:py-16 overflow-hidden mb-8 md:mb-12">
      <div className="max-w-7xl mx-auto px-6 lg:pl-12 lg:pr-20 relative">
        <Slider {...settings}>
          {slides.map((slide) => (
            <div key={slide.id} className="outline-none px-1">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-16 min-h-[auto] md:min-h-[550px]">

                {/* Text Content */}
                <div className="w-full md:w-1/2 text-center md:text-left flex flex-col justify-center order-1 md:order-1 md:pl-8 lg:pl-16">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold mb-3 md:mb-6 text-gray-900 tracking-tight leading-[1.1]">
                    {slide.title.split("–")[0]}
                    <span className="block text-[#d87d4a] font-medium text-2xl md:text-4xl mt-2 md:mt-4">
                      {slide.title.split("–")[1] || ""}
                    </span>
                  </h2>
                  <p className="text-gray-600 text-base sm:text-lg md:text-2xl leading-relaxed mb-6 md:mb-10 max-w-lg mx-auto md:mx-0">
                    {slide.description}
                  </p>

                  {/* Desktop Button - Hidden on Mobile */}
                  <div className="hidden md:block">
                    <Link to={`categories/${slide.link}`}>
                      <button className="bg-[#d87d4a] hover:bg-[#c76b3a] text-white px-10 py-5 rounded-full font-bold text-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                        {slide.btnText}
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Image Content */}
                <div className="w-full md:w-1/2 flex items-center justify-center relative order-2 md:order-2 h-[200px] md:h-[550px] lg:h-[600px]">
                  {/* Decorative Blob */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#d87d4a]/20 to-transparent rounded-full blur-[60px] md:blur-[100px] transform scale-75 animate-pulse"></div>

                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-contain relative z-10 drop-shadow-2xl transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Mobile Button - Hidden on Desktop */}
                <div className="w-full text-center md:hidden order-3 mt-4 mb-2">
                  <Link to={`categories/${slide.link}`}>
                    <button className="bg-[#d87d4a] hover:bg-[#c76b3a] text-white w-full max-w-xs py-3 rounded-full font-bold text-lg shadow-lg cursor-pointer">
                      {slide.btnText}
                    </button>
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default SaleBanner;
