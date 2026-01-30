import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import googlePlay from "../assets/google-play.png";
import appStore from "../assets/apple-store.png";

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-200 px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        {/* About (Brand Info) */}
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#d87d4a]">
            Smart Cart
          </h2>
          <p className="text-sm md:text-base leading-relaxed text-zinc-300">
            SmartCart is your go-to store for smart gadgets and electronics.
            Explore top brands and amazing deals every day.
          </p>
          <div className="flex gap-3 mt-4">
            <a
              href="https://www.facebook.com"
              className="bg-zinc-800 p-3 rounded-full text-[#d87d4a] hover:text-white hover:bg-[#d87d4a] transition-colors duration-300"
            >
              <FaFacebookF size={16} />
            </a>
            <a
              href="https://x.com"
              className="bg-zinc-800 p-3 rounded-full text-[#d87d4a] hover:text-white hover:bg-[#d87d4a] transition-colors duration-300"
            >
              <FaXTwitter size={16} />
            </a>
            <a
              href="https://www.instagram.com"
              className="bg-zinc-800 p-3 rounded-full text-[#d87d4a] hover:text-white hover:bg-[#d87d4a] transition-colors duration-300"
            >
              <FaInstagram size={16} />
            </a>
            <a
              href="https://www.linkedin.com"
              className="bg-zinc-800 p-3 rounded-full text-[#d87d4a] hover:text-white hover:bg-[#d87d4a] transition-colors duration-300"
            >
              <FaLinkedinIn size={16} />
            </a>
          </div>
        </div>

        {/* Company (Terms, FAQs, About) */}
        <div>
          <h3 className="text-lg md:text-xl font-semibold text-[#d87d4a] mb-4 md:mb-6">
            Company
          </h3>
          <ul className="space-y-3 text-sm md:text-base">
            <li>
              <Link
                to="/aboutUs"
                className="text-zinc-300 hover:text-white transition-colors duration-300"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/faqs"
                className="text-zinc-300 hover:text-white transition-colors duration-300"
              >
                FAQs
              </Link>
            </li>
            <li>
              <Link
                to="/termsAndPolicies"
                className="text-zinc-300 hover:text-white transition-colors duration-300"
              >
                Terms & Policies
              </Link>
            </li>
            <li>
              <Link
                to="/contactSupport"
                className="text-zinc-300 hover:text-white transition-colors duration-300"
              >
                Contact Support
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg md:text-xl font-semibold text-[#d87d4a] mb-4 md:mb-6">
            Contact
          </h3>
          <div className="space-y-3 text-sm md:text-base">
            <p className="flex items-center gap-3 text-zinc-300">
              <FaMapMarkerAlt className="text-[#d87d4a] flex-shrink-0" />
              123 Innovation Drive, Tech City
            </p>
            <p className="flex items-center gap-3 text-zinc-300">
              <FaPhoneAlt className="text-[#d87d4a] flex-shrink-0" />
              +1 (800) 123-4567
            </p>
            <p className="flex items-center gap-3 text-zinc-300">
              <FaEnvelope className="text-[#d87d4a] flex-shrink-0" />
              <a
                href="mailto:support@smartcart.com"
                className="hover:text-white transition-colors duration-300"
              >
                support@smartcart.com
              </a>
            </p>
          </div>
        </div>

        {/* Get our App */}
        <div>
          <h3 className="text-lg md:text-xl font-semibold text-[#d87d4a] mb-4 md:mb-6">
            Get our App
          </h3>
          <p className="text-sm md:text-base text-zinc-300 mb-4 leading-relaxed">
            Shop smarter on the go. Download the SmartCart app today.
          </p>
          <div className="flex flex-col gap-3">
            <a
              href="https://apps.apple.com/eg/app/apple-store/id375380948?pt=120315711&ct=smartcart_footer&mt=8"
              className="transition-transform duration-300 hover:scale-105"
            >
              <img
                src={appStore}
                alt="App Store"
                className="object-contain w-40 md:w-44"
                loading="lazy"
              />
            </a>
            <a
              href="https://play.google.com/"
              className="transition-transform duration-300 hover:scale-105"
            >
              <img
                src={googlePlay}
                alt="Google Play"
                className="object-contain w-40 md:w-44"
                loading="lazy"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm md:text-base text-zinc-400 mt-12 md:mt-16 pt-6 border-t border-zinc-800">
        © {new Date().getFullYear()}{" "}
        <span className="text-[#d87d4a]">SmartCart</span>. All rights reserved.
      </div>
    </footer>
  );
}
