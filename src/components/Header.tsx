import { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import CartNav from "./CartNav";
import FavoriteNav from "./FavoriteNav";
import Logo from "./Logo";
import Navigation from "./Navigation";
import Profile from "./Profile";

function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <header className="bg-white py-2 shadow-md sticky top-0 z-50 ">
      <div className="flex items-center justify-between w-full mx-auto px-4 md:px-8">
        {/* Left: Logo */}
        <div className="flex items-center gap-4">
          <Logo />
        </div>

        {/* Middle: Navigation (desktop only) */}
        <nav className="hidden md:block">
          <Navigation />
        </nav>

        {/* Right: Icons + Hamburger */}
        <div className="flex items-center gap-5">
          {/* Hamburger menu button (mobile only) */}
          <button
            className="md:hidden text-2xl text-gray-700"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
          >
            {mobileNavOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>

          {/* Icons (always visible) */}
          <FavoriteNav />
          <CartNav />
          <Profile />
        </div>
      </div>

      {/* Mobile Navigation (slide-in panel) */}
      <div
        className={`md:hidden bg-white shadow-inner transition-all duration-300 ease-in-out overflow-hidden w-full ${
          mobileNavOpen ? "max-h-screen py-2" : "max-h-0 py-0"
        }`}
      >
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
