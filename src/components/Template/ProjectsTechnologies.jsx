// ProjectsTechnologies.js

import React from "react";
import "./ProjectsTechnologies.css"; // Import your CSS file

const projects = [
  {
    id: 1,
    title: "Project 1",
    description: "Description of Project 1",
    technologies: ["React", "Node.js", "Express", "MongoDB"]
  },
  {
    id: 2,
    title: "Project 2",
    description: "Description of Project 2",
    technologies: ["Angular", "Java", "Spring Boot", "MySQL"]
  }
  // Add more projects with associated technologies
];

const ProjectsTechnologies = () => {
  return (
    <div className="projects-technologies">
      <h2>Projects Technologies</h2>
      <ul className="project-list">
        {projects.map((project) => (
          <li key={project.id} className="project-item">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="technologies">
              <strong>Technologies:</strong>
              <ul className="technology-list">
                {project.technologies.map((tech, index) => (
                  <li key={index}>{tech}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsTechnologies;
