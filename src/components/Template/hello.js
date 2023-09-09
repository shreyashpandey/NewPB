// ContactDetails.js

import React from 'react';
import './ContactDetails.css'; // Import your CSS file

const ContactDetails = () => {
  return (
    <div className="contact-details">
      <h2>Contact Details</h2>
      <ul className="contact-list">
        <li>
          <span className="contact-label">Address:</span> 123 Main Street,
          Cityville, State, Zip Code
        </li>
        <li>
          <span className="contact-label">Email:</span> example@email.com
        </li>
        <li>
          <span className="contact-label">Phone:</span> (123) 456-7890
        </li>
        <li>
          <span className="contact-label">Website:</span>{' '}
          <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">
            www.example.com
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ContactDetails;
