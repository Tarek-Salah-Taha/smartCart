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
    <header className="bg-white py-3 md:py-4 shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between w-full mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        {/* Left: Logo */}
        <div className="flex items-center gap-4">
          <Logo />
        </div>

        {/* Middle: Navigation (desktop only) */}
        <nav className="hidden md:block">
          <Navigation />
        </nav>

        {/* Right: Icons + Hamburger */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Icons (always visible) */}
          <div className="flex items-center gap-3 md:gap-4">
            <FavoriteNav />
            <CartNav />
          </div>
          <Profile />

          {/* Hamburger menu button (mobile only) */}
          <button
            className="md:hidden text-gray-700 hover:text-[#d87d4a] transition-colors duration-200 ml-2"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileNavOpen ? (
              <HiX
                size={28}
                className="transform hover:scale-110 transition-transform"
              />
            ) : (
              <HiMenuAlt3
                size={28}
                className="transform hover:scale-110 transition-transform"
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation (slide-in panel) */}
      <div
        className={`md:hidden bg-white transition-all duration-300 ease-in-out overflow-hidden w-full ${
          mobileNavOpen ? "max-h-screen py-4" : "max-h-0 py-0"
        }`}
      >
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
