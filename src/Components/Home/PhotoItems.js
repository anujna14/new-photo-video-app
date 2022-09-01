import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import "./PhotoItems";
import { FavouriteContext } from "../Context/FavouriteContext/FavouriteContext";

const PhotoItems = ({
  photo_item,
  handleRemoveFromFavourite,
  handleAddToFavourite,
}) => {
  const favCtx = useContext(FavouriteContext);
  const isItemFav = favCtx.isFav(photo_item.photo.id);
  return (
    <div className="photo-item">
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
        {isItemFav ? (
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
        onClick={() => window.open(`${photo_item.photo.url}`, "_blank")}
        className="photographer-profile"
      >
        <CgProfile />
        <span className="photographer-name">
          {photo_item.photo.photographer}
        </span>
      </span>
    </div>
  );
};

export default PhotoItems;
