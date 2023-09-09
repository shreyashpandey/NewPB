// AboutSection.js

import React from 'react';
import { useContext } from 'react';
import './AboutSection.css'; // Import your CSS file
import { Context } from '../Context';
import { ContextProvider } from '../Context';
const AboutSection = () => {
  const ctx= useContext(Context);
  console.log("Context in about section ", ctx);
  if(ctx)
  {
    localStorage.setItem('about',ctx.about);
  }
  return (
    <div className="about-section">
      <div className="about-content">
        <h2>About Us</h2>
        <p>
          {ctx?ctx.about:localStorage.getItem('about')}
        </p>
      </div>
      <div className="about-image">
        <img
          src="https://via.placeholder.com/200"
          alt="About Us"
          className="about-image"
        />
      </div>
    </div>
  );
};

export default AboutSection;
