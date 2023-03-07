import React from "react";
import "./App.css";
import ImageNText from "./components/Image-N-Text/Image-N-Text";
import PageSection from "./components/Page-Section/Page-Section";
import content from "./assets/section-content";

{
  /* "#e7edfa" */
}
{
  /* #FAF4E7 */
}

const App = (): JSX.Element => {
  const displayContent = (): JSX.Element[] => {
    return content.map((section, index) => {
      return (
        <PageSection
          key={index}
          title={section.title}
          colouredBg={index % 2 === 0 ? false : true}
        >
          {section.content}
        </PageSection>
      );
    });
  };

  return (
    <div className="App">
      <header className="header">
        <h1 className="text-white">Russell Online Learning</h1>
      </header>
      <ImageNText />
      {displayContent()}
    </div>
  );
};

export default App;
