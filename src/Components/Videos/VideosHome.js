import React, { useState, useEffect, useContext } from "react";
import { SearchContext } from "../Context/SearchContext";
import axios from "axios";
import "./VideosHome.css";

import { FavouriteContext } from "../Context/FavouriteContext/FavouriteContext";
import LoadingIndicator from "../UI/LoadingIndicator";
import VideoItem from "./VideoItem";

const VideosHome = () => {
  const { searchItem } = useContext(SearchContext);
  const favCtx = useContext(FavouriteContext);
  const [videosItems, setVideosItems] = useState([]);

  // const test_url =
  //   "https://jsonware.com/api/v1/json/b15bb9aa-5c89-4c81-840e-337a41f0b0f6?dynamic=true";
  const url = `https://api.pexels.com/videos/search?query=${searchItem}&per_page=12`;
  const getVideos = async () => {
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
    getVideos();
    // console.log("VIDEOS", videosItems);
  }, [searchItem]);

  const handleAddToFavourite = (video_item) => {
    favCtx.addFav({
      ...video_item.video,
    });
  };

  const handleRemoveFromFavourite = (video_item) => {
    favCtx.removeFav(video_item.video.id);
  };

  return (
    <div className="container">
      <div className="video-items">
        {videosItems.length > 0 ? (
          <>
            {videosItems.map((video_item) => (
              <VideoItem
                key={video_item.video.id}
                video_item={video_item}
                addToFav={handleAddToFavourite}
                removeFromFav={handleRemoveFromFavourite}
              />
            ))}
          </>
        ) : (
          <LoadingIndicator />
        )}
      </div>
    </div>
  );
};

export default VideosHome;
