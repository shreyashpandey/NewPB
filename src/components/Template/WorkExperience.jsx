import React from "react";
import { useContext } from "react";
import { Context } from "../Context";
export const workExperience = () => {
    const ctx = useContext(Context);
    if (ctx)
        localStorage.setItem("workExperiences", JSON.stringify(ctx.workExperiences));
    return (
        <div className="work-experiences-container">
            <h1>Work Experience</h1>
            <ul className="work-experience-list">
                {ctx ? ctx.workExperiences : JSON.parse(localStorage.getItem("workExperiences")).map((workExperience, index) => (
                    <li key={index} className="work-experience-item">
                        <h2 className="work-experience-title">{workExperience.ProjectName}</h2>
                        <p className="work-experience-description">{workExperience.Description}</p>
                        <a
                            href={workExperience.ProjectURL}
                            className="work-experience-link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View on GitHub
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}