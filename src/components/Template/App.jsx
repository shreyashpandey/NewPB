import "./styles.css";
import ProjectWorkedOn from "./ProjectWorkedOn";
import ProjectsTechnologies from "./ProjectsTechnologies";
import Projects from "./Projects";
import CertificationGained from "./CertificationGained";
import AboutSection from "./AboutSection";
import ContactDetails from "./ContactDetails";
// import HtmlContent from "./HtmlContent";
import { Context, ContextProvider } from "../Context";
import { useContext } from "react";
export default function App() {
  // const ctx=useContext(Context);
  // console.log("Context In Ctx",ctx);
  return (
    <>
      <head>
        <link rel="stylesheet" href="styles.css" />
      </head>

      <div className={"style"}>
          <AboutSection />
          <Projects />
          <CertificationGained />
          <ContactDetails />
      </div>
    </>
  );
}
