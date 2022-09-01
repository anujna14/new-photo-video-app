import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import Modal from "../UI/Modal";
import { FavouriteContext } from "../Context/FavouriteContext/FavouriteContext";

const Favourites = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const history = useHistory();

  const favCtx = useContext(FavouriteContext);

  console.log(favCtx.favourites)
  useEffect(() => {
    if (favCtx.favourites.length === 0) {
      setIsModalOpen(true);
    }
  }, [favCtx.favourites]);

  const handleOnClose = () => {
    setIsModalOpen(false);
    history.replace("/");
  };

  const handleFavIcon = (itemId) => {
    const isFavourite = favCtx.isFav(itemId);
    if (isFavourite) {
      favCtx.removeFav(itemId);
    }
  }; 
  return (
    <div>
      {!isModalOpen ? (
        <div className="container">
          <div className="photo-items">
            {favCtx.favourites.map((fav_item) =>
              !fav_item.image ? (
                <div key={fav_item.id} className="photo-item">
                  <Link
                    onClick={() => {
                      window.location.href = `/photos/${fav_item.id}`;
                    }}
                    to={`/photos/${fav_item.id}`}
                  >
                    <img
                      src={fav_item.src.original}
                      alt={fav_item.alt}
                      style={{
                        width: "300px",
                        height: "300px",
                        position: "relative",
                      }}
                    />
                  </Link>
                  <span
                    className="fill-heart-icon"
                    onClick={() => handleFavIcon(fav_item.id)}
                  >
                    {
                      <span>
                        <AiFillHeart />
                      </span>
                    }
                  </span>
                  <span
                    onClick={() => window.open(`${fav_item.url}`, "_blank")}
                    className="photographer-profile"
                  >
                    <CgProfile />
                    <span className="photographer-name">
                      {fav_item.photographer}
                    </span>
                  </span>
                </div>
              ) : (
                <div key={fav_item.id} className="video-item">
                  <Link
                    onClick={() => {
                      window.location.href = `/videos/${fav_item.id}`;
                    }}
                    to={`/videos/${fav_item.id}`}
                  >
                    <video
                      muted
                      width="300px"
                      height="300px"
                      onMouseOver={(event) => event.target.play()}
                      onMouseOut={(event) => event.target.pause()}
                    >
                      <source
                        src={fav_item.video_files[2].link}
                        type="video/mp4"
                      />
                    </video>
                  </Link>
                  <span className="fill-heart-icon" onClick={() => handleFavIcon(fav_item.id)}>
                    {
                      <span>
                        <AiFillHeart />
                      </span>
                    }
                  </span>{" "}
                  <span
                    onClick={() => window.open(`${fav_item.url}`, "_blank")}
                    className="photographer-profile"
                  >
                    <CgProfile />
                    <span className="photographer-name">
                      {fav_item.user.name}
                    </span>
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      ) : (
        <div className="container text-center">
          <Modal onClose={handleOnClose}>
            No Favourites to display! Would you like to add some?
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Favourites;
