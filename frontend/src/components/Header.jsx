import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

function Header() {
  return (
    <div>
      <Link to="/">
        <h3>Avalehele</h3>
      </Link>
    </div>
  );
}

export default Header;
