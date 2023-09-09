// CertificationGained.js

import React from "react";
import "./CertificationGained.css"; // Import your CSS file
import { Context } from "../Context"; //
// const certifications = [
//   {
//     id: 1,
//     title: "Certification 1",
//     organization: "Organization A",
//     date: "January 2022",
//     description: "Description of Certification 1"
//   },
//   {
//     id: 2,
//     title: "Certification 2",
//     organization: "Organization B",
//     date: "March 2022",
//     description: "Description of Certification 2"
//   }
//   // Add more certifications as needed
// ];

const CertificationGained = () => {
  const { certifications } = React.useContext(Context);
  return (
    <div className="certifications-gained">
      <h2>Certifications Gained</h2>
      <ul className="certification-list">
        {certifications.map((certification) => (
          <li key={certification.CertificationName} className="certification-item">
            <div className="certification-header">
              <h3>{certification.CertificationName}</h3>
              <p className="organization">{certification.CertificationId}</p>
            </div>
            {/* <p className="date">{certification.date}</p> */}
            <p className="description">{certification.Description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CertificationGained;
