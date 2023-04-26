import React from "react";
import "./Page-Section.css";

type PageSectionProps = {
  id: string;
  title: string;
  colouredBg: boolean;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
};

const PageSection = ({
  id,
  title,
  colouredBg,
  children,
  className,
  contentClassName,
}: PageSectionProps): JSX.Element => {
  return (
    <div
      id={id}
      className={`page-section ${
        colouredBg ? "bg-light-grey" : ""
      } ${className}`}
    >
      <h2 className="section-title">{title}</h2>
      <div className={`section-content ${contentClassName}`}>{children}</div>
    </div>
  );
};

export default PageSection;
