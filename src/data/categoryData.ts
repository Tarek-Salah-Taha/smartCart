import { FaLaptop, FaMobileAlt } from "react-icons/fa";
import { IoGameController, IoHeadsetSharp } from "react-icons/io5";
import { FaTv, FaHouseDamage } from "react-icons/fa";
import { Category } from "../types/types";

const categoryData: Category[] = [
  {
    image: "/categories/laptop.png",
    icon: FaLaptop,
    title: "laptop",
    description:
      "Discover powerful laptops for work, study, and play—sleek designs, long battery life, and top-tier performance.",
    link: "laptop",
  },
  {
    image: "/categories/gaming.png",
    icon: IoGameController,
    title: "gaming",
    description:
      "Level up your setup with the latest gaming gear—from high-performance consoles to accessories built for champions.",
    link: "gaming",
  },
  {
    image: "/categories/headphones.png",
    icon: IoHeadsetSharp,
    title: "audio",
    description:
      "Experience immersive sound and comfort with top-quality headphones—perfect for music lovers, gamers, and professionals.",
    link: "audio",
  },

  {
    image: "/categories/smartTvs.png",
    icon: FaTv,
    title: "tv",
    description:
      "Transform your entertainment with Smart TVs—stream, browse, and enjoy cinematic quality right from your living room.",
    link: "tv",
  },
  {
    image: "/categories/electricAppliances.png",
    icon: FaHouseDamage,
    title: "appliances",
    description:
      "Power up your home with efficient, reliable electric appliances designed to make everyday tasks easier and smarter.",
    link: "appliances",
  },
  {
    image: "/categories/smartphones.png",
    icon: FaMobileAlt,
    title: "mobile",
    description:
      "Stay connected with the latest smartphones—featuring stunning displays, fast processors, and pro-grade cameras.",
    link: "mobile",
  },
];

export default categoryData;
