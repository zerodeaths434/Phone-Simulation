import React from "react";

const ImageContainer = ({ image, imageClicked, nextImage, prevImage }) => {
  return (
    <div className="image-container">
      <img className="gallery-img" src={image} alt="nothing"></img>
      <div className="nextImage" onClick={nextImage}></div>
      <div className="prevImage" onClick={prevImage}></div>
      <i
        className="fas fa-times closeImage"
        onClick={() => imageClicked(false)}
      ></i>
    </div>
  );
};

export default ImageContainer;
