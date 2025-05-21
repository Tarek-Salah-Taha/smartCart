import { FaLaptop, FaMobileAlt } from "react-icons/fa";
import { IoGameController, IoHeadsetSharp } from "react-icons/io5";
import { FaTv, FaHouseDamage } from "react-icons/fa";

import electricAppliances from "../public/assets/categories/electricAppliances.png";
import gaming from "../public/assets/categories/gaming.png";
import headphones from "../public/assets/categories/headphones.png";
import laptop from "../public/assets/categories/laptop.png";
import smartphones from "../public/assets/categories/smartphones.png";
import smartTvs from "../public/assets/categories/smartTvs.png";
import { Category } from "../types/types";

const categoryData: Category[] = [
  {
    image: laptop,
    icon: FaLaptop,
    title: "laptop",
    description:
      "Discover powerful laptops for work, study, and play—sleek designs, long battery life, and top-tier performance.",
    link: "laptop",
  },
  {
    image: gaming,
    icon: IoGameController,
    title: "gaming",
    description:
      "Level up your setup with the latest gaming gear—from high-performance consoles to accessories built for champions.",
    link: "gaming",
  },
  {
    image: headphones,
    icon: IoHeadsetSharp,
    title: "audio",
    description:
      "Experience immersive sound and comfort with top-quality headphones—perfect for music lovers, gamers, and professionals.",
    link: "audio",
  },

  {
    image: smartTvs,
    icon: FaTv,
    title: "tv",
    description:
      "Transform your entertainment with Smart TVs—stream, browse, and enjoy cinematic quality right from your living room.",
    link: "tv",
  },
  {
    image: electricAppliances,
    icon: FaHouseDamage,
    title: "appliances",
    description:
      "Power up your home with efficient, reliable electric appliances designed to make everyday tasks easier and smarter.",
    link: "appliances",
  },
  {
    image: smartphones,
    icon: FaMobileAlt,
    title: "mobile",
    description:
      "Stay connected with the latest smartphones—featuring stunning displays, fast processors, and pro-grade cameras.",
    link: "mobile",
  },
];

export default categoryData;
