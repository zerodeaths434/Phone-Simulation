import React from "react";

const CallingModal = ({ isCalled, name, resetContacts, url }) => {
  return (
    <div className="contact-container">
      <div className="calling-image">
        <img src={url} alt="sample" />
      </div>
      <div className={`${isCalled ? "calling" : "calling hidden"}`}>
        <div id="callingDiv">CALLING...</div>
        <div id="numberDiv">{name}</div>
      </div>
      <div className="call-btn-container cbc-style">
        <div
          className={`${isCalled ? "call cutCall" : "call"}`}
          onClick={resetContacts}
        >
          <i className="fa fa-phone" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  );
};

export default CallingModal;
