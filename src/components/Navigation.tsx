import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Home", to: "/" },
  { name: "All Products", to: "/allProducts" },
  { name: "Categories", to: "/categories" },
  { name: "Brands", to: "/brands" },
];

function Navigation() {
  return (
    <nav className="w-full text-base sm:text-xl md:text-2xl lg:text-3xl">
      <ul className="flex flex-col pl-10 gap-10 items-start w-full sm:flex-row sm:gap-10 sm:items-center">
        {navItems.map(({ name, to }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `relative transition-all transform hover:scale-105
                 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-[#d87d4a] after:transition-all after:duration-300
                 ${
                   isActive
                     ? "text-[#d87d4a] after:w-full"
                     : "text-gray-800 hover:text-[#d87d4a] after:w-0 hover:after:w-full"
                 }`
              }
            >
              {name.toUpperCase()}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
