import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

function Logo() {
  return (
    <Link to="/" className="transition-transform duration-200 hover:scale-105">
      <img className="w-28 md:w-40 lg:w-48 h-auto" src={logo} alt="logo" />
    </Link>
  );
}

export default Logo;
