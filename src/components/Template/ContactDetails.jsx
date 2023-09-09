// ContactDetails.js

import React from "react";
import "./ContactDetails.css"; // Import your CSS file
import {Context} from "../Context"; 
const ContactDetails = () => {
  const {name,address,email,phone}=React.useContext(Context);
  return (
    <div className="contact-details">
      <h2>Contact Details</h2>
      <ul className="contact-list">
        <li>
          <span className="contact-label">Address:</span> {address}
        </li>
        <li>
          <span className="contact-label">Email:</span> {email}
        </li>
        <li>
          <span className="contact-label">Phone:</span> {phone}
        </li>
      </ul>
    </div>
  );
};

export default ContactDetails;
