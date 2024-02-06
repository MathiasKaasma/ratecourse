import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";

function Header() {
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
        <div className="header-links">
          <Link to="/meist">Meist</Link>
          <Link to="/tingimused">Tingimused</Link>
        </div>
        <button className="contact-button">Võta ühendust</button>
      </div>
    </header>
  );
}

export default Header;
