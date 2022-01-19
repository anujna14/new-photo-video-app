import React, { useState, useEffect, useContext } from "react";
import { SearchContext } from "../Context/SearchContext";
import axios from "axios";
import "./VideosHome.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FavouriteContext } from "../Context/FavouriteContext/FavouriteContext";
import {
  ADD_TO_FAVOURITE,
  REMOVE_FROM_FAVOURITE,
} from "../Context/FavouriteContext/action.types";

const VideosHome = () => {
  const { searchItem } = useContext(SearchContext);
  const { Favouritedispatch } = useContext(FavouriteContext);
  const [videosItems, setVideosItems] = useState([]);

  // const test_url =
  //   "https://jsonware.com/api/v1/json/b15bb9aa-5c89-4c81-840e-337a41f0b0f6?dynamic=true";
  const url = `https://api.pexels.com/videos/search?query=${searchItem}&per_page=12`;
  const getVideeos = async () => {
    await axios
      .get(url, {
        headers: {
          Authorization:
            "563492ad6f91700001000001f951650f39fa475180b870175d4c55fb",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // console.log("RESPONSE", response);
        const newData = response.data.videos.map((video) => {
          return { liked: false, video: video };
        });
        // console.log("NEW DATA", newData);
        setVideosItems(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getVideeos();
    // console.log("VIDEOS", videosItems);
  }, [searchItem]);

  const handleAddToFavourite = (video_item) => {
    video_item.liked = true;
    Favouritedispatch({
      type: ADD_TO_FAVOURITE,
      payload: video_item.video,
    });
  };

  const handleRemoveFromFavourite = (video_item) => {
    video_item.liked = false;
    Favouritedispatch({
      type: REMOVE_FROM_FAVOURITE,
      payload: video_item.video.id,
    });
  };

  return (
    <div className="container">
      <div className="video-items">
        {videosItems.length > 0 ? (
          <>
            {videosItems.map((video_item) => (
              <div key={video_item.video.id} className="video-item">
                <video
                  muted
                  width="300px"
                  height="300px"
                  onMouseOver={(event) => event.target.play()}
                  onMouseOut={(event) => event.target.pause()}
                >
                  <source
                    src={video_item.video.video_files[2].link}
                    type="video/mp4"
                  />
                </video>
                <span className="fill-heart-icon">
                  {video_item.liked ? (
                    <span onClick={() => handleRemoveFromFavourite(video_item)}>
                      <AiFillHeart />
                    </span>
                  ) : (
                    <span onClick={() => handleAddToFavourite(video_item)}>
                      <AiOutlineHeart />
                    </span>
                  )}
                </span>
                <div>
                  <span
                    onClick={() =>
                      window.open(`${video_item.video.user.url}`, "_blank")
                    }
                    className="photographer-profile"
                  >
                    <CgProfile />
                    <span className="photographer-name">
                      {video_item.video.user.name}
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
};

export default VideosHome;
