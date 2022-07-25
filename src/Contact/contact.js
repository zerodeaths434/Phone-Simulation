import React from "react";

const Contact = ({ callingContact, name, url }) => {
  return (
    <div className="flex-item" onClick={() => callingContact(name, url)}>
      <img src={url} alt="sample" />
      <p>{name}</p>
    </div>
  );
};

export default Contact;
