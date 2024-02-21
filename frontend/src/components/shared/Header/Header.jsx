import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/Logo.png";
import DropDownMenu from "./DropDownMenu.jsx";
import styles from "./Header.module.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <Link to="/">
        <div className={styles["header-left"]}>
          <div className={styles["header-logo"]}>
            <img src={logo} alt="Logo" />
          </div>
          <div className={styles["header-title"]}>Hinda Kursust</div>
        </div>
      </Link>
      <div className={styles["header-right"]}>
        <div className={styles["desktop-navigation"]}>
          <div className={styles["header-links"]}>
            <Link to="/">Avalehele</Link>
            <Link to="/meist">Tutvustus</Link>
            <Link to="/tingimused">Tingimused</Link>
          </div>
          <button className="blue-button">
            <Link to="/kontakt">Võta ühendust</Link>
          </button>
        </div>
        <div
          className={
            "mobile-navigation " + (menuOpen && styles["hamburger-active"])
          }
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={styles["line1"]}></span>
          <span className={styles["line2"]}></span>
          <span className={styles["line3"]}></span>
        </div>
      </div>
      <DropDownMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </header>
  );
}

export default Header;
