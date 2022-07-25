import React, { useState } from "react";

const Keypad = ({
  isAppDrawerOpen,
  closeAppDrawer,
  isCallButtonClicked,
  callButtonClicked,
}) => {
  const [number, addNumber] = useState("");

  const addNo = (e) => {
    addNumber((prevnum) => prevnum + e.target.innerText);
    document.getElementById("displayer").value = number;
  };

  const removeNum = () => {
    var newNum = number.substring(0, number.length - 1);
    document.getElementById("displayer").value = newNum;
    addNumber(newNum);
  };

  const callingNumber = () => {
    document.getElementById("callingSound").play();
    isCallButtonClicked ? anotherFunction() : callButtonClicked(true);
  };

  const anotherFunction = () => {
    document.getElementById("callingSound").pause();
    document.getElementById("callingSound").currentTime = 0;
    closeAppDrawer();
    callButtonClicked(false);
    addNumber("");
  };

  return (
    <div className={`${isAppDrawerOpen ? "app-drawer" : "app-drawer hidden"}`}>
      <div className={`${isCallButtonClicked ? "calling" : "calling hidden"}`}>
        <div id="callingDiv">CALLING...</div>
        <div id="numberDiv">{number}</div>
      </div>
      <div
        className={`${
          isCallButtonClicked ? "keypad-container hidden" : "keypad-container"
        }`}
      >
        <input id="displayer" value={number} readOnly={true} />
        <div
          className={`${number.length === 0 ? "erase hidden" : "erase"}`}
          onClick={removeNum}
        >
          <i className="fas fa-times"></i>
        </div>
        <div className="wrapper">
          <div className="number-row">
            <button onClick={addNo} href="#">
              1
            </button>
            <button onClick={addNo} href="#">
              2
            </button>
            <button onClick={addNo} href="#">
              3
            </button>
          </div>
          <div className="number-row">
            <button onClick={addNo} href="#">
              4
            </button>
            <button onClick={addNo} href="#">
              5
            </button>
            <button onClick={addNo} href="#">
              6
            </button>
          </div>
          <div className="number-row">
            <button onClick={addNo} href="#">
              7
            </button>
            <button onClick={addNo} href="#">
              8
            </button>
            <button onClick={addNo} href="#">
              9
            </button>
          </div>
          <div className="number-row">
            <button onClick={addNo} href="#">
              *
            </button>
            <button onClick={addNo} href="#">
              0
            </button>
            <button onClick={addNo} href="#">
              #
            </button>
          </div>
        </div>
      </div>
      <div className="call-btn-container">
        <div
          className={`${isCallButtonClicked ? "call cutCall" : "call"}`}
          onClick={callingNumber}
        >
          <i className="fa fa-phone" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  );
};

export default Keypad;
