import { MouseEvent } from "react";
import { Link } from "react-scroll";
import MenuItem from "@mui/material/MenuItem";
import { HeaderItem } from "../../../../content/header-content";

export type HeaderDropdownItemProps = {
  index: number;
  id: string | HeaderItem[];
  label: string;
  propagateClick: (event: MouseEvent<HTMLElement>) => void;
};

const HeaderDropdownItem = ({
  index,
  id,
  label,
  propagateClick,
}: HeaderDropdownItemProps): JSX.Element => {
  return (
    <MenuItem
      data-testid={`header-dropdown-item-${index}`}
      key={index}
      onClick={(event) => {
        propagateClick(event);
      }}
    >
      <Link
        className="text-lg font-medium"
        type="submit"
        to={id as string}
        smooth={true}
        offset={-40}
      >
        {label}
      </Link>
    </MenuItem>
  );
};

export default HeaderDropdownItem;
