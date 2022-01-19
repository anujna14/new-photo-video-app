import React from "react";
import { Link } from "react-router-dom";
import photoPlayLogo from "../../Assets/Header/Logo 2.png";

const DetailsPageHeader = () => {
  return (
    <header
      className="logo"
      style={{
        width: "100%",
        height: "90px",
        backgroundColor: "rgb(238, 235, 235)",
      }}
    >
      <Link
        onClick={() => {
          window.location.href = "/";
        }}
        to="/"
      >
        <img src={photoPlayLogo} alt="logo" />
      </Link>
    </header>
  );
};

export default DetailsPageHeader;
