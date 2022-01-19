import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { SearchContext } from "../Context/SearchContext";
import { AiFillPlayCircle, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import "./Home.css";
import { FcLike, FcDislike } from "react-icons/fc";
import { CgProfile } from "react-icons/cg";
import { FavouriteContext } from "../Context/FavouriteContext/FavouriteContext";
import {
  ADD_TO_FAVOURITE,
  REMOVE_FROM_FAVOURITE,
} from "../Context/FavouriteContext/action.types";

const Home = () => {
  const { searchItem } = useContext(SearchContext);
  const { Favouritedispatch } = useContext(FavouriteContext);
  const [photos, setPhotos] = useState([]);
  const url = `https://api.pexels.com/v1/search?query=${searchItem}&per_page=12`;
  const test_url =
    "https://jsonware.com/api/v1/json/613c6613-1ddf-407e-903b-e557e6252c45?dynamic=true";

  // const getPhotos = async () => {
  //   await axios.get(url, {
  //     headers: {
  //       Authorization:
  //         "563492ad6f91700001000001f951650f39fa475180b870175d4c55fb",
  //       "Content-Type": "application/json",
  //     },
  //   });
  // };

  const getPhotos = async () => {
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
        const newData = response.data.photos.map((photo) => {
          return { liked: false, photo: photo };
        });
        // console.log("NEW DATA", newData);
        setPhotos(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPhotos();
    // console.log("photos", photos);
  }, [searchItem]);

  const handleAddToFavourite = (photo_item) => {
    photo_item.liked = true;
    Favouritedispatch({
      type: ADD_TO_FAVOURITE,
      payload: photo_item.photo,
    });
  };

  const handleRemoveFromFavourite = (photo_item) => {
    photo_item.liked = false;
    Favouritedispatch({
      type: REMOVE_FROM_FAVOURITE,
      payload: photo_item.photo.id,
    });
  };
  return (
    <div className="container">
      <div className="photo-items">
        {photos.length > 0 ? (
          <>
            {photos.map((photo_item) => (
              <div key={photo_item.photo.id} className="photo-item">
                <Link
                  onClick={() => {
                    window.location.href = `/photos/${photo_item.photo.id}`;
                  }}
                  to={`/photos/${photo_item.photo.id}`}
                >
                  <img
                    src={photo_item.photo.src.original}
                    alt={photo_item.photo.alt}
                    style={{
                      width: "300px",
                      height: "300px",
                      position: "relative",
                    }}
                  />
                </Link>
                <span className="fill-heart-icon">
                  {photo_item.liked ? (
                    <span onClick={() => handleRemoveFromFavourite(photo_item)}>
                      <AiFillHeart />
                    </span>
                  ) : (
                    <span onClick={() => handleAddToFavourite(photo_item)}>
                      <AiOutlineHeart />
                    </span>
                  )}
                </span>
                <span
                  onClick={() =>
                    window.open(`${photo_item.photo.url}`, "_blank")
                  }
                  className="photographer-profile"
                >
                  <CgProfile />
                  <span className="photographer-name">
                    {photo_item.photo.photographer}
                  </span>
                </span>
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

export default Home;
