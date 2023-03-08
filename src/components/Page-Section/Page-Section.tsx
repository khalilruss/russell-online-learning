import React from "react";
import "./Page-Section.css";

export type PageSectionProps = {
  id: string;
  title: string;
  colouredBg: boolean;
  children: React.ReactNode;
};

// "lineHeight":"1.8"
// "lineHeight":"1.2"

const PageSection = ({
  id,
  title,
  colouredBg,
  children,
}: PageSectionProps): JSX.Element => {
  return (
    <div
      id={id}
      className={`page-section ${colouredBg ? "bg-light-grey" : ""}`}
    >
      <h2 className="section-title">{title}</h2>
      <div className="section-content">{children}</div>
    </div>
  );
};

export default PageSection;
