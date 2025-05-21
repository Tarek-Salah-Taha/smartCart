import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

function Logo() {
  return (
    <Link to="/">
      <img className="w-32 md:w-48 h-auto" src={logo} alt="logo" />
    </Link>
  );
}

export default Logo;
