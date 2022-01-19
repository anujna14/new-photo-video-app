import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel } from "react-bootstrap";
import "./Header.css";
import Search from "./Search";
import photoPlayLogo from "../../Assets/Header/Logo.png";

const Header = () => {
  const [curatedImage, setCuratedImage] = useState([]);
  // const test_url =
  //   "https://jsonware.com/api/v1/json/6bdf886e-cab4-427d-bd35-a83f809b2ec9?dynamic=true";
  const url = `https://api.pexels.com/v1/curated?per_page=10`;
  const getCuratedImage = async () => {
    await axios
      .get(url, {
        headers: {
          Authorization:
            "563492ad6f91700001000001f951650f39fa475180b870175d4c55fb",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setCuratedImage(response.data.photos);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getCuratedImage();
  }, []);

  if (
    window.location.pathname !== "/" &&
    window.location.pathname !== "/videos" &&
    window.location.pathname !== "/favourites"
  )
    return null;
  return (
    <>
      <Carousel interval={30000}>
        {curatedImage.map((item) => (
          <Carousel.Item key={item.id}>
            <img
              style={{
                weidth: "100%",
                height: "300px",
                maxWidth: "100%",
                objectFit: "fill",
              }}
              className="image-stylr d-block w-100 container-fluid"
              src={item.src.landscape}
              alt={item.alt}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <div className="logo">
        <img src={photoPlayLogo} alt="logo" />
      </div>
      <div className="title">
        <h1>Discover the world's best photos & videos</h1>
        <p>Best memories online</p>
      </div>
      <Search />
    </>
  );
};

export default Header;
