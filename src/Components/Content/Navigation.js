import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  // console.log(window.location);
  if (
    window.location.pathname !== "/" &&
    window.location.pathname !== "/videos" &&
    window.location.pathname !== "/favourites"
  )
    return null;
  return (
    <nav className="nav-menu">
      <ul className="nav-content">
        <li>
          <Link to="/">Photos</Link>
        </li>
        <li>
          <Link to="/videos"> Videos </Link>
        </li>
        <li className="push">
          <Link to="/favourites">Favourites</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
