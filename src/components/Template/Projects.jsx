import React from "react";
import "./Projects.css";
import { useContext } from "react";
import { Context } from "../Context";
// const projectsData = [
//   {
//     title: "Project 1",
//     description: "This is the description of project 1.",
//     link: "https://github.com/yourusername/project1"
//   },
//   {
//     title: "Project 2",
//     description: "This is the description of project 2.",
//     link: "https://github.com/yourusername/project2"
//   }
//   // Add more project objects as needed
// ];

function Projects() {
  const ctx = useContext(Context);
  if (ctx)
    localStorage.setItem("projects", JSON.stringify(ctx.projects))

  return (
    <div className="projects-container">
      <h1>My Projects</h1>
      <ul className="project-list">
        {ctx ? ctx.projects : JSON.parse(localStorage.getItem(projects)).map((project, index) => (
          <li key={index} className="project-item">
            <h2 className="project-title">{project.ProjectName}</h2>
            <p className="project-description">{project.Description}</p>
            <a
              href={project.ProjectURL}
              className="project-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Projects;
