import "./styles.css";
import ProjectWorkedOn from "./ProjectWorkedOn";
import ProjectsTechnologies from "./ProjectsTechnologies";
import Projects from "./Projects";
import CertificationGained from "./CertificationGained";
import AboutSection from "./AboutSection";
import ContactDetails from "./ContactDetails";
import { ContextProvider } from "../Context";
// import HtmlContent from "./HtmlContent";

export default function App() {
  return (
    <>
      <head>
        <link rel="stylesheet" href="styles.css" />
      </head>

      <div className={"style"}>
        {/* <ContextProvider> */}
          <AboutSection />
          <Projects />
          <CertificationGained />
          <ContactDetails />
        {/* </ContextProvider> */}
      </div>
    </>
  );
}
