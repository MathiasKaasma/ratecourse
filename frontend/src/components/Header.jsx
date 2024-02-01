import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

function Header() {
  return (
    <div>
      <Link to="/">
        <h3>Avalehele</h3>
      </Link>
      <Link to="/meist">
        <h3>Meist</h3>
      </Link>
      <Link to="/tingimused">
        <h3>Tingimused</h3>
      </Link>
    </div>
  );
}

export default Header;
