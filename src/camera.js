import React, { useState } from "react";

const Camera = ({ isCameraOpen, startVideo, stopVideo }) => {
  const [isPictureTaken, pictureTaken] = useState(false);

  /*useEffect(() => {
    if (isPictureTaken) {
      const interval = setInterval(pictureTaken(false), 3000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [isPictureTaken]);*/

  const snap = () => {
    document.getElementById("imageClicked").play();
    pictureTaken(true);
    setInterval(() => {
      pictureTaken(false);
    }, 800);
  };

  return (
    <div
      className={`${
        isCameraOpen ? "camera-container" : "camera-container hidden"
      }`}
    >
      <div className="video-container offPhone">
        <div className="click-container">
          <div className="click" onClick={snap}></div>
        </div>
        <video
          muted
          autoPlay
          className={`${
            isPictureTaken ? "app__videoFeed hidden" : "app__videoFeed"
          }`}
        ></video>
      </div>
    </div>
  );
};

export default Camera;
