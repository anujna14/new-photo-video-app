import React, { useContext } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { FavouriteContext } from "../Context/FavouriteContext/FavouriteContext";

const VideoItem = ({ video_item, addToFav, removeFromFav }) => {
  const favCtx = useContext(FavouriteContext);
  const isItemFav = favCtx.isFav(video_item.video.id);
  return (
    <div className="video-item">
      <Link
        to={`/videos/${video_item.video.id}`}
      >
        <video
          muted
          width="300px"
          height="300px"
          onMouseOver={(event) => event.target.play()}
          onMouseOut={(event) => event.target.pause()}
        >
          <source src={video_item.video.video_files[2].link} type="video/mp4" />
        </video>
      </Link>
      <span className="fill-heart-icon">
        {isItemFav ? (
          <span onClick={() => removeFromFav(video_item)}>
            <AiFillHeart />
          </span>
        ) : (
          <span onClick={() => addToFav(video_item)}>
            <AiOutlineHeart />
          </span>
        )}
      </span>
      <div>
        <span
          onClick={() => window.open(`${video_item.video.user.url}`, "_blank")}
          className="photographer-profile"
        >
          <CgProfile />
          <span className="photographer-name">
            {video_item.video.user.name}
          </span>
        </span>
      </div>
    </div>
  );
};

export default VideoItem;
