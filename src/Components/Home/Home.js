import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { SearchContext } from "../Context/SearchContext";
import "./Home.css";
import { FavouriteContext } from "../Context/FavouriteContext/FavouriteContext";
import LoadingIndicator from "../UI/LoadingIndicator";
import PhotoItems from "./PhotoItems";

const Home = () => {
  const { searchItem } = useContext(SearchContext);
  const favCtx = useContext(FavouriteContext);

  const [photos, setPhotos] = useState([]);
  const url = `https://api.pexels.com/v1/search?query=${searchItem}&per_page=12`;
  // const test_url =
  // "https://jsonware.com/api/v1/json/613c6613-1ddf-407e-903b-e557e6252c45?dynamic=true";

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
        const newData = response.data.photos.map((photo) => {
          return { photo: photo };
        });
        setPhotos(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {

    getPhotos();
  }, [searchItem]);

  const handleAddToFavourite = (photo_item) => {
    favCtx.addFav({
      ...photo_item.photo,
    });
  };

  const handleRemoveFromFavourite = (photo_item) => {
    favCtx.removeFav(photo_item.photo.id);
  };
  return (
    <div className="container">
      <div className="photo-items">
        {photos.length > 0 ? (
          <>
            {photos.map((photo_item) => (
              <PhotoItems
                key={photo_item.photo.id}
                photo_item={photo_item}
                handleAddToFavourite={handleAddToFavourite}
                handleRemoveFromFavourite={handleRemoveFromFavourite}
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

export default Home;
