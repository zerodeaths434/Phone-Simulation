import React, { useState, useEffect, useRef } from "react";
import contact from "./icons/contact.png";
import gallery from "./icons/gallery.png";
import phoneCall from "./icons/dialer.png";
import camera from "./icons/camera.png";
import Keypad from "./keypad";
import Contacts from "./Contact/contacts";
import Camera from "./camera";
import Gallery from "./Gallery/gallery";
import Battery from "./icons/battery.png";
import Wifi from "./icons/wifi.png";
import Lte from "./icons/lte.png";

const Phone = () => {
  const [isPhoneOn, switchOnPhone] = useState(false);
  const [isAppDrawerOpen, openAppDrawer] = useState(false);
  const [isCameraOpen, OpenCamera] = useState(false);
  const [isGalleryOpen, openGallery] = useState(false);
  const [isContactsOpen, openContacts] = useState(false);
  const [isVolumeBarOpen, openVolumeBar] = useState(false);
  const [isCallButtonClicked, callButtonClicked] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0.0);
  const [isCalled, callContact] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isImageClicked, imageClicked] = useState(false);
  const [today, setDate] = useState(new Date());

  const ref = useRef(null);
  const volumeref = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 60 * 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (isVolumeBarOpen) {
      const interval = setInterval(closeVolumeBar, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [volumeLevel, isVolumeBarOpen]);

  const increaseVolume = () => {
    if (isPhoneOn) {
      openVolumeBar(true);
      if (ref.current.clientHeight < volumeref.current.clientHeight) {
        setVolumeLevel(
          (prevHeight) => prevHeight + volumeref.current.clientHeight / 10
        );
      }
    }
  };

  const decreaseVolume = () => {
    if (isPhoneOn) {
      openVolumeBar(true);
      if (ref.current.clientHeight >= 20) {
        setVolumeLevel(
          (prevHeight) => prevHeight - volumeref.current.clientHeight / 10
        );
      }
    }
  };

  const closeVolumeBar = () => {
    openVolumeBar(false);
  };

  const startVideo = () => {
    setPlaying(true);
    navigator.getUserMedia(
      {
        video: true,
      },
      (stream) => {
        let video = document.getElementsByClassName("app__videoFeed")[0];
        if (video) {
          video.srcObject = stream;
        }
      },
      (err) => console.error(err)
    );
  };

  const stopVideo = () => {
    console.log("video stopped");
    setPlaying(false);
    let video = document.getElementsByClassName("app__videoFeed")[0];
    video.srcObject.getTracks()[0].stop();
  };

  const toggleOnOff = () => {
    switchOnPhone(!isPhoneOn);
  };

  const locale = "en";
  /*const day = today.toLocaleDateString(locale, { weekday: "long" });
  const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, {
    month: "long",
  })}\n\n`;
  const hour = today.getHours();*/
  const time = today.toLocaleTimeString(locale, {
    hour: "numeric",
    hour12: true,
    minute: "numeric",
  });

  const homeButtonAction = () => {
    closeGalleryApp();
    closeAppDrawer();
    closeCameraApp();
    closeContactsApp();
    imageClicked(false);
  };

  const backButtonAction = () => {
    isImageClicked ? imageClicked(false) : closeGalleryApp();
    isCallButtonClicked ? callButtonClicked(false) : closeAppDrawer();
    closeCameraApp();
    isCalled ? callContact(false) : closeContactsApp();
  };

  const AppDrawer = () => {
    openAppDrawer(true);
  };

  const closeAppDrawer = () => {
    openAppDrawer(false);
  };

  const openContactsApp = () => {
    openContacts(true);
  };

  const closeContactsApp = () => {
    openContacts(false);
  };

  const openGalleryApp = () => {
    openGallery(true);
  };

  const closeGalleryApp = () => {
    openGallery(false);
  };

  const openCameraApp = () => {
    OpenCamera(true);
    startVideo();
  };

  const closeCameraApp = () => {
    OpenCamera(false);
  };

  return (
    <div className="overlay">
      <div className="side-btns-container">
        <div className="volume-btn-container">
          <button className="volume-up" onClick={increaseVolume}>
            +
          </button>
          <button className="volume-down" onClick={decreaseVolume}>
            -
          </button>
        </div>
        <button className="power-on" onClick={toggleOnOff}>
          {isPhoneOn ? "off" : "on"}
        </button>
      </div>
      <div className="phone-body">
        {isPhoneOn ? (
          <div className={`${isPhoneOn ? "phone-border" : "phone-border"}`}>
            <div
              className={`${
                isVolumeBarOpen && isPhoneOn
                  ? "volume-bar"
                  : "volume-bar hidden"
              }`}
              ref={volumeref}
            >
              <div
                className="volume-level"
                ref={ref}
                style={{ height: volumeLevel }}
              ></div>
            </div>
            <div className={`${isPhoneOn ? "top-bar" : "top-bar hidden"}`}>
              <div className="top-bar-container">{time}</div>
              <img id="battery" src={Battery} alt="battery" />
              <img id="wifi" src={Wifi} alt="wifi" />
              <img id="lte" src={Lte} alt="lte" />
            </div>
            <div
              className={`${
                isPhoneOn ? "navigation-buttons" : "navigation-buttons hidden"
              }`}
            >
              <span className="recent"></span>
              <span className="home" onClick={homeButtonAction}></span>
              <div className="back-btn-container" onClick={backButtonAction}>
                <span className="back"></span>
              </div>
            </div>
            <div className="bottom-apps">
              <img src={phoneCall} onClick={AppDrawer} alt="contact" />
              <img src={contact} onClick={openContactsApp} alt="contact" />
              <img src={gallery} onClick={openGalleryApp} alt="contact" />
              <img src={camera} onClick={openCameraApp} alt="contact" />
            </div>
            <Keypad
              isAppDrawerOpen={isAppDrawerOpen}
              closeAppDrawer={closeAppDrawer}
              isCallButtonClicked={isCallButtonClicked}
              callButtonClicked={callButtonClicked}
            />
            <Camera
              isCameraOpen={isCameraOpen}
              startVideo={startVideo}
              stopVideo={stopVideo}
            />
            <Gallery
              isGalleryOpen={isGalleryOpen}
              isImageClicked={isImageClicked}
              imageClicked={imageClicked}
            />
            <Contacts
              isContactsOpen={isContactsOpen}
              closeContactsApp={closeContactsApp}
              isCalled={isCalled}
              callContact={callContact}
            />
          </div>
        ) : (
          <div className="phone-border offPhone"></div>
        )}
      </div>
    </div>
  );
};

export default Phone;
