import React from "react";
import "./Page-Section.css";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <div
        id={id}
        className={`page-section ${
          colouredBg ? "bg-light-grey" : ""
        } ${className}`}
      >
        <h2 className="section-title">{title}</h2>
        <div className={`section-content ${contentClassName}`}>{children}</div>
      </div>
    </motion.div>
  );
};

export default PageSection;
