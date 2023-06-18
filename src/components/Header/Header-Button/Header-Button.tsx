import { MouseEvent } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-scroll";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { HeaderItem } from "../../../content/header-content";
import { motion } from "framer-motion";

type HeaderButtonProps = {
  index: number;
  id: string | HeaderItem[];
  label: string;
  handleClickAboutMenu: (event: MouseEvent<HTMLElement>) => void;
  propagateClick: (event: MouseEvent<HTMLElement>) => void;
};

const HeaderButton = ({
  index,
  id,
  label,
  handleClickAboutMenu,
  propagateClick,
}: HeaderButtonProps): JSX.Element => {
  return (
    <div>
      <Button
        key={index}
        endIcon={label === "About" ? <KeyboardArrowDownIcon /> : null}
        component={motion.div}
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.9 }}
        onClick={
          label === "About"
            ? (event) => handleClickAboutMenu(event)
            : (event) => propagateClick(event)
        }
        className="m-2 flex text-white whitespace-nowrap text-lg font-medium"
      >
        {label === "About" ? (
          label
        ) : (
          <Link
            className="text-lg font-medium"
            activeClass="active"
            type="submit"
            to={label !== "About" ? (id as string) : ""}
            smooth={true}
            offset={-40}
          >
            {label}
          </Link>
        )}
      </Button>
    </div>
  );
};

export default HeaderButton;
