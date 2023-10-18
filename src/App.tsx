import "./App.css";
import PageSection from "./components/Page-Section/Page-Section";
import content from "./content/section-content";
import Header from "./components/Header/Header";
import ContactForm from "./components/Contact-Form/Contact-Form";
import studyImg from "./assets/educacion_compensatoria_pequena.jpg";
import childrenImg from "./assets/school-children.webp";
import { motion } from "framer-motion";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRef } from "react";

const App = (): JSX.Element => {
  const Desktop = useMediaQuery("(min-width:43.75rem)");
  const headerRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  const displayContent = (): JSX.Element[] => {
    return content.slice(1).map((section, index) => {
      return (
        <PageSection
          key={index}
          id={section.id}
          title={section.title}
          colouredBg={index % 2 === 0 ? false : true}
          contentClassName={
            section.id === "aboutROL" ? (Desktop ? "w-3/4" : "") : ""
          }
        >
          {section.content}
        </PageSection>
      );
    });
  };

  return (
    <div className="App">
      <Header ref={headerRef} />
      <motion.div
        initial="hidden"
        whileInView="visible"
        transition={{ ease: "easeIn", duration: 0.4 }}
        viewport={{ once: false }}
        variants={{
          visible: { opacity: 1 },
          hidden: { opacity: 0 },
        }}
      >
        <div
          id={content[0].id}
          style={{
            backgroundImage: `url(${childrenImg})`,
          }}
          className="welcome-section background-image h-screen justify-center"
        >
          <div ref={titleRef}>
            <h1 className="welcome-title">{content[0].title}</h1>
            {content[0].content}
          </div>
        </div>
      </motion.div>
      {displayContent()}
      <div
        id="contact"
        style={{
          backgroundImage: `url(${studyImg})`,
        }}
        className="page-section p-8 background-image overflow-hidden h-screen flex justify-center"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          transition={{ ease: "easeIn", duration: 0.3 }}
          viewport={{ once: false }}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 100 },
          }}
        >
          <ContactForm />
        </motion.div>
      </div>
    </div>
  );
};

export default App;
