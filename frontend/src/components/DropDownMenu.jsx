import { Link } from "react-router-dom";

function Menu({ menuOpen, setMenuOpen }) {
  return (
    <div className={"dropdown " + (menuOpen && "dropdown-active")}>
      <ul>
        <li onClick={() => setMenuOpen(false)}>
          <Link to="/">Avalehele</Link>
        </li>
        <li onClick={() => setMenuOpen(false)}>
          <Link to="/meist">Meist</Link>
        </li>
        <li onClick={() => setMenuOpen(false)}>
          <Link to="/tingimused">Tingimused</Link>
        </li>
        <li onClick={() => setMenuOpen(false)}>
          <Link to="/kontakt">Võta ühendust</Link>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
