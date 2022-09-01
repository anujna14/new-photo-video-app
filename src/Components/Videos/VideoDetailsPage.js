import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import DetailsPageHeader from "../Header/DetailsPageHeader";
import "./VideoDetailsPage.css";

const VideoDetailsPage = () => {
  console.log("am inside");
  const { id } = useParams();
  const [videoDetails, setVideoDetails] = useState({});
  useEffect(() => {
    getVideoDetails();
  }, []);

  const url = `https://api.pexels.com/videos/videos/${id}`;
  const getVideoDetails = async () => {
    await axios
      .get(url, {
        headers: {
          Authorization:
            "563492ad6f91700001000001f951650f39fa475180b870175d4c55fb",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setVideoDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <DetailsPageHeader />
      <div className="video-link">
        <div>
          <video src={videoDetails.video_files[2].link} controls />
        </div>
        <div className="video-details">
          <Link to={videoDetails.user?.url}>
            <span>BY:</span>
            {videoDetails.user.name}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VideoDetailsPage;
