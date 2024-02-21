import React from "react";
import { useState } from "react";
import { imageBaseUrl } from "../base_url/config";

const ImageComponent = ({ imageUrl }) => {
  const [state, setState] = useState({ isOpen: false });

  const handleShowDialog = () => {
    setState({ isOpen: !state.isOpen });
  };

  return (
    <>
      <a href={`${imageBaseUrl}/${imageUrl}`} target="_blank">
        <img
          className="small"
          src={`${imageBaseUrl}/${imageUrl}`}
          onClick={handleShowDialog}
          alt="no image"
        />
      </a>

      {/* {state.isOpen && (
        <dialog
          className="dialog img-dialog"
          style={{ position: "absolute" }}
          open
          onClick={handleShowDialog}
        >
          <img
            className="image"
            src={`${imageBaseUrl}/${imageUrl}`}
            onClick={handleShowDialog}
            alt="no image"
          />
        </dialog>
      )} */}
    </>
  );
};

export default ImageComponent;
