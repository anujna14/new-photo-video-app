import React, { useContext } from "react";
import { FavouriteContext } from "../Context/FavouriteContext/FavouriteContext";
import { Link } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

const Favourites = () => {
  const { favouriteitems } = useContext(FavouriteContext);

  console.log("favouriteitems", favouriteitems);
  return (
    <div>
      {favouriteitems.favourites.length > 0 ? (
        <div className="container">
          <div className="photo-items">
            {favouriteitems.favourites.map((fav_item) =>
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
                  <span className="fill-heart-icon">
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
                <div key={fav_item.id} className="photo-item">
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
                  {/* <span className="fill-heart-icon">
                    {
                      <span>
                        <AiFillHeart />
                      </span>
                    }
                  </span> */}
                  <span
                    onClick={() => window.open(`${fav_item.url}`, "_blank")}
                    className="photographer-profile"
                  >
                    {/* <CgProfile /> */}
                    <span className="photographer-name">
                      {fav_item.photographer}
                    </span>
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      ) : (
        <div className="container text-center">
          <h1>No Fav to display</h1>
        </div>
      )}
    </div>
  );
};

export default Favourites;
