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
      <img
        className="small"
        src={`${imageBaseUrl}/${imageUrl}`}
        onClick={handleShowDialog}
        alt="no image"
      />
      {state.isOpen && (
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
      )}
    </>
  );
};

export default ImageComponent;
