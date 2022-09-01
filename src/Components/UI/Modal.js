import React, { Fragment } from "react";
import "./Modal.css";

const Modal = (props) => {
  return (
    <Fragment>
      <div className="backdrop" onClick={props.onClose}></div>
      <div className="error-modal">
        <h2>No favourites Found!!</h2>
        <p>{props.children}</p>
        <div className="modal-actions">
          <button type="button" onClick={props.onClose}>
            Okay
          </button>
        </div>
      </div>
    </Fragment>
  );
};
export default Modal;
