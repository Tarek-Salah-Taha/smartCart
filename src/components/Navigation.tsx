import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Home", to: "/" },
  { name: "All Products", to: "/allProducts" },
  { name: "Categories", to: "/categories" },
  { name: "Brands", to: "/brands" },
];

function Navigation() {
  return (
    <nav className="w-full">
      <ul className="flex flex-col sm:flex-row sm:items-center sm:justify-center sm:gap-8 md:gap-10 lg:gap-12">
        {navItems.map(({ name, to }) => (
          <li key={to} className="w-full sm:w-auto">
            <NavLink
              to={to}
              className={({ isActive }) =>
                `block py-3 sm:py-2 px-6 sm:px-0 text-base sm:text-lg md:text-xl lg:text-2xl font-medium transition-all duration-300
                 relative group hover:bg-gray-50 sm:hover:bg-transparent rounded-lg sm:rounded-none
                 after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:bg-[#d87d4a] after:transition-all after:duration-300
                 ${
                   isActive
                     ? "text-[#d87d4a] bg-gray-50 sm:bg-transparent after:w-full font-semibold"
                     : "text-gray-800 group-hover:text-[#d87d4a] after:w-0 group-hover:after:w-full"
                 }`
              }
            >
              <span className="relative z-10">{name.toUpperCase()}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
