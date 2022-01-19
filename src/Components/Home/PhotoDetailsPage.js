import React, { useState, useEffect } from "react";
import axios from "axios";
import DetailsPageHeader from "../Header/DetailsPageHeader";
import "./PhotoDetailsPage.css";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { AiOutlineZoomIn, AiOutlineZoomOut } from "react-icons/ai";
import ZoomComponent from "../UI/ZoomComponent";

const PhotoDetailsPage = (props) => {
  const [photoDetails, setPhotoDetails] = useState({});
  console.log("MATCH:", props.match.params.id);

  const test_url =
    "https://jsonware.com/api/v1/json/a32151e4-d771-461b-bf4a-93ac3f81db34?dynamic=true";

  const url = `https://api.pexels.com/v1/photos/${props.match.params.id}`;
  const getPhotoDetails = async () => {
    await axios
      .get(url, {
        headers: {
          Authorization:
            "563492ad6f91700001000001f951650f39fa475180b870175d4c55fb",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        setPhotoDetails(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPhotoDetails();
    console.log("PHOTO DETAILS", photoDetails);
  }, []);
  return (
    <>
      <DetailsPageHeader />
      <div className="container photo-details">
        <div className="zoom-btn">
          <ZoomComponent photoDetails={photoDetails} />
        </div>
        <div className="photo-details-text">
          <h1>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias,
            excepturi.
          </h1>
        </div>
      </div>
    </>
  );
};

export default PhotoDetailsPage;
