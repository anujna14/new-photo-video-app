import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import "./ZoomComponent.css";
import { AiOutlineZoomIn, AiOutlineZoomOut } from "react-icons/ai";

const ZoomComponent = ({ photoDetails }) => {
  return (
    <TransformWrapper
      initialScale={1}
      minScale={1}
      maxScale={7}
      initialPositionX={0}
      initialPositionY={0}
    >
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <React.Fragment>
          <div className="tools">
            <button className="zoomIn" onClick={() => zoomIn()}>
              <AiOutlineZoomIn />
            </button>
            <button className="zoomOut" onClick={() => zoomOut()}>
              <AiOutlineZoomOut />
            </button>
          </div>
          <TransformComponent>
            <img
              src={photoDetails.src?.original}
              alt={photoDetails.alt}
              className="zoom-photo"
            />
          </TransformComponent>
        </React.Fragment>
      )}
    </TransformWrapper>
  );
};

export default ZoomComponent;
