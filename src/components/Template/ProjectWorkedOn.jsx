// ProjectWorkedOn.js

import React from "react";
import "./ProjectWorkedOn.css"; // Import your CSS file

const projects = [
  {
    id: 1,
    title: "Project 1",
    description: "Description of Project 1"
  },
  {
    id: 2,
    title: "Project 2",
    description: "Description of Project 2"
  }
  // Add more projects as needed
];

const ProjectWorkedOn = () => {
  return (
    <div className="project-worked-on">
      <h2>Projects Worked On</h2>
      <ul className="project-list">
        {projects.map((project) => (
          <li key={project.id} className="project-item">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectWorkedOn;
