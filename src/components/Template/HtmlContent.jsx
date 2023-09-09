// reactToHtml.js

import React from "react";
// import ReactDOMServer from "react-dom/server";
import App from "./App";
import { renderToString } from "react-dom/server";
import { downloadHtml } from "./download";
// import AboutSection from "./AboutSection";
import "./AboutSection.css";
import { AboutCss } from "./Combine";
import JSZip from "jszip";
// renderToString(<YourAwesomeComponent props1="value1" props2={{ value: '2' }} />)

const HtmlContent = () => {
  const handleDownload = () => {
    // Create a Blob from the CSS file
    // const cssContent = AboutCss; // Replace with your CSS content
    console.log("AboutCss: ", AboutCss);
    const blob = new Blob([AboutCss], { type: "text/css" });

    // Create an object URL for the Blob
    let zip=new JSZip();
    // zip
    console.log("Zip ",zip);
    const url = window.URL.createObjectURL(blob);
    console.log("CSS Url ",url);
    // Create an anchor element and trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = "styles.css"; // Set the desired filename
    document.body.appendChild(a);
    a.click();

    // Clean up the object URL
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };
  const handleClick = () => {
    console.log("Handled click")
    // const htmlContent = ReactDOMServer.renderToStaticMarkup(App);
    console.log(renderToString(<App />));
    // console.log(htmlContent);
    downloadHtml(renderToString(<App />), "component.html");
  };
  return (
    <div>
      <button
        onClick={() => {
          handleClick();
          handleDownload();
        }}
      >
        Download as HTML
      </button>
    </div>
  );
};

export default HtmlContent;
