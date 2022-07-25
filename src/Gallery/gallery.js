import React, { useState } from "react";
import ImageContainer from "./ImageContainer";
import imageArray from "./images";
import { Draggable } from "react-drag-reorder";

const Gallery = ({ isGalleryOpen, isImageClicked, imageClicked }) => {
  const [image, setImage] = useState("");
  const [prevIndex, setPrevIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(0);

  const openImage = (idex) => {
    imageClicked(true);
    setPrevIndex(idex - 1);
    setNextIndex(idex + 1);
    setImage(imageArray[idex].url);
  };

  const nextImage = () => {
    if (nextIndex < imageArray.length) {
      setImage(imageArray[nextIndex].url);
      setNextIndex((nextIndex) => nextIndex + 1);
      setPrevIndex((nextIndex) => nextIndex + 1);
    }
  };

  const prevImage = () => {
    if (prevIndex >= 0) {
      setImage(imageArray[prevIndex].url);
      setNextIndex((prevIndex) => prevIndex - 1);
      setPrevIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <>
      {isImageClicked ? (
        <ImageContainer
          image={image}
          imageClicked={imageClicked}
          nextImage={nextImage}
          prevImage={prevImage}
        />
      ) : (
        <div
          className={`${
            isGalleryOpen ? "gallery-container" : "gallery-container hidden"
          }`}
        >
          <div className="row">
            <Draggable>
              {imageArray.map((item, index) => (
                <img
                  key={index}
                  src={item.url}
                  alt={item.alt}
                  onClick={() => openImage(index)}
                />
              ))}
            </Draggable>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
