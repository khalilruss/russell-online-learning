import "./App.css";
import PageSection from "./components/Page-Section/Page-Section";
import content from "./content/section-content";
import Header from "./components/Header/Header";
import ContactForm from "./components/Contact-Form/ContactForm";
import studyImg from "./assets/educacion_compensatoria_pequena.jpg";
import childrenImg from "./assets/school-children.webp";
{
  /* "#e7edfa" */
}
{
  /* #FAF4E7 */
}

const App = (): JSX.Element => {
  const displayContent = (): JSX.Element[] => {
    return content.slice(1).map((section, index) => {
      return (
        <PageSection
          key={index}
          id={section.id}
          title={section.title}
          colouredBg={index % 2 === 0 ? false : true}
          contentClassName={section.id === "ethos" ? "w-3/4" : ""}
        >
          {section.content}
        </PageSection>
      );
    });
  };

  return (
    <div className="App">
      <Header />
      <div
        id={content[0].id}
        style={{
          backgroundImage: `url(${childrenImg})`,
        }}
        className="welcome-section background-image"
      >
        <div>
          <h1 className="welcome-title">{content[0].title}</h1>
          {content[0].content}
        </div>
      </div>
      {displayContent()}
      <div
        id="contact"
        style={{
          backgroundImage: `url(${studyImg})`,
        }}
        className="page-section p-8 background-image"
      >
        <ContactForm />
      </div>
    </div>
  );
};

export default App;
