import React, { useState } from "react";

export const Context = React.createContext();
export const ContextProvider = ({ children }) => {
    const [template, setTemplate] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [about, setAbout] = useState("");
    const [address, setAddress] = useState("");
    const [workExperience, setWorkExperience] = useState([]);
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [certifications, setCertifications] = useState([])
    // console.log("Children: " + children)
    console.log("About ",about);
    return (
        <Context.Provider value={{ template, setTemplate, name, setName, email, setEmail, phone, setPhone, about, setAbout, address, setAddress, workExperience, setWorkExperience, projects, setProjects, skills, setSkills, certifications, setCertifications }}>
            {children}
        </Context.Provider>
    );
};