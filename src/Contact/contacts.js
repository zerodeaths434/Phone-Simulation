import React, { useState } from "react";
import CallingModal from "./callingModal";
import contactArray from "./contactsArray";
import Contact from "./contact";

const Contacts = ({
  isContactsOpen,
  closeContactsApp,
  isCalled,
  callContact,
}) => {
  const [name, setName] = useState("");
  const [filteredName, filterName] = useState("");
  const [url, setUrl] = useState("");

  const callingContact = (name, url) => {
    document.getElementById("callingSound").play();
    callContact(true);
    setName(name);
    setUrl(url);
  };

  const resetContacts = () => {
    document.getElementById("callingSound").pause();
    document.getElementById("callingSound").currentTime = 0;
    closeContactsApp();
    callContact(false);
  };

  function capitalizeFirstLetter(string) {
    var splitStr = string.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  }

  return (
    <>
      {isCalled ? (
        <CallingModal
          isCalled={isCalled}
          name={name}
          url={url}
          resetContacts={resetContacts}
        />
      ) : (
        <div
          className={`${
            isContactsOpen ? "contact-container" : "contact-container hidden"
          }`}
        >
          <input
            name="search"
            className="search-bar"
            onChange={(e) => filterName(e.target.value.toLowerCase())}
            value={filteredName}
            autoComplete="off"
          ></input>
          <div
            className={`${
              isCalled ? "contacts-holder hidden" : "contacts-holder"
            }`}
          >
            {contactArray
              .filter((item) =>
                item.name.includes(capitalizeFirstLetter(filteredName))
              )
              .map((item, index) => {
                return (
                  <Contact
                    key={index}
                    callingContact={callingContact}
                    name={item.name}
                    url={item.url}
                  />
                );
              })}
          </div>
          <div
            className={`${
              isCalled
                ? "call-btn-container cbc-style"
                : "call-btn-container hidden"
            }`}
          ></div>
        </div>
      )}
    </>
  );
};

export default Contacts;
