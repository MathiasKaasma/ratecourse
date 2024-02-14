import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";
import DropDownMenu from "./DropDownMenu.jsx";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <Link to="/">
        <div className="header-left">
          <div className="header-logo">
            <img src={logo} alt="Logo" />
          </div>
          <div className="header-title">Hinda Kursust</div>
        </div>
      </Link>
      <div className="header-right">
        <div className="desktop-navigation">
          <div className="header-links">
            <Link to="/meist">Meist</Link>
            <Link to="/tingimused">Tingimused</Link>
          </div>
          <button className="blue-button">
            <Link to="/kontakt">Võta ühendust</Link>
          </button>
        </div>
        <div
          className={"mobile-navigation " + (menuOpen && "hamburger-active")}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="line1"></span>
          <span className="line2"></span>
          <span className="line3"></span>
        </div>
      </div>
      <DropDownMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </header>
  );
}

export default Header;
