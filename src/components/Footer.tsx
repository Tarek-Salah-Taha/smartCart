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
    <footer className="bg-zinc-900 text-zinc-200 px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-20">
        {/* About (Brand Info) */}
        <div>
          <h2 className="text-2xl font-bold text-[#d87d4a] mb-4">Smart Cart</h2>
          <p className="text-sm leading-6">
            SmartCart is your go-to store for smart gadgets and electronics.
            Explore top brands and amazing deals every day.
          </p>
          <div className="flex gap-4 mt-4">
            <a
              href="https://www.facebook.com"
              className="bg-zinc-800 p-2 rounded-full text-[#d87d4a] hover:text-white"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://x.com"
              className="bg-zinc-800 p-2 rounded-full text-[#d87d4a] hover:text-white"
            >
              <FaXTwitter />
            </a>
            <a
              href="https://www.instagram.com"
              className="bg-zinc-800 p-2 rounded-full text-[#d87d4a] hover:text-white"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com"
              className="bg-zinc-800 p-2 rounded-full text-[#d87d4a] hover:text-white"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Company (Terms, FAQs, About) */}
        <div>
          <h3 className="text-lg font-semibold text-[#d87d4a] mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/aboutUs">About Us</Link>
            </li>
            <li>
              <Link to="/faqs">FAQs</Link>
            </li>
            <li>
              <Link to="/termsAndPolicies">Terms & Policies</Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-[#d87d4a] mb-4">Contact</h3>
          <p className="flex items-center text-sm gap-2">
            <FaMapMarkerAlt className="text-[#d87d4a]" />
            123 Innovation Drive, Tech City
          </p>
          <p className="flex items-center text-sm gap-2 mt-2">
            <FaPhoneAlt className="text-[#d87d4a]" />
            +1 (800) 123-4567
          </p>
          <p className="flex items-center text-sm gap-2 mt-2">
            <FaEnvelope className="text-[#d87d4a]" />
            <a href="mailto:support@smartcart.com">support@smartcart.com</a>
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#d87d4a] mb-4">
            Get our App
          </h3>
          <p className="text-sm mb-4">
            Shop smarter on the go. Download the SmartCart app today.
          </p>
          <div className="flex flex-col gap-3">
            {/* App Store */}
            <a href="https://apps.apple.com/eg/app/apple-store/id375380948?pt=120315711&ct=smartcart_footer&mt=8">
              <img
                src={appStore}
                alt="App Store"
                className="object-contain w-40"
                loading="lazy"
              />
            </a>

            {/* Google Play */}
            <a href="https://play.google.com/">
              <img
                src={googlePlay}
                alt="Google Play"
                className="object-contain w-40"
                loading="lazy"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-zinc-400 mt-10">
        © {new Date().getFullYear()}{" "}
        <span className="text-[#d87d4a]">SmartCart</span>. All rights reserved.
      </div>
    </footer>
  );
}
