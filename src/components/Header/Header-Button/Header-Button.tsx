import { MouseEvent } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-scroll";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { HeaderMenuItem } from "../Header-Menu/Header-Menu";

type HeaderButtonProps = {
  index: number;
  id: string | HeaderMenuItem[];
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
