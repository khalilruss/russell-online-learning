import { MouseEvent } from "react";
import Menu from "@mui/material/Menu";
import { HeaderItem } from "../../../content/header-content";
import HeaderDropdownItem from "./Header-Dropdown-Item/Header-Dropdown-Item";

export type HeaderDropdownProps = {
  id: string;
  anchorEl: null | HTMLElement;
  menuItems: HeaderItem[];
  handleCloseMenu: () => void;
  propagateClick: (event: MouseEvent<HTMLElement>) => void;
};

const HeaderDropdown = ({
  anchorEl,
  id,
  menuItems,
  handleCloseMenu,
  propagateClick,
}: HeaderDropdownProps): JSX.Element => {
  const displayMenuItem = (item: HeaderItem, index: number): JSX.Element => {
    return (
      <HeaderDropdownItem
        key={index}
        index={index}
        id={item.id}
        label={item.label}
        propagateClick={propagateClick}
      />
    );
  };

  return (
    <Menu
      data-testid="header-dropdown"
      id={id}
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleCloseMenu}
      MenuListProps={{ onMouseLeave: handleCloseMenu }}
    >
      {menuItems.map((item, index) =>
        item.label === "About"
          ? (item.id as HeaderItem[]).map((item, index) =>
              displayMenuItem(item, index)
            )
          : displayMenuItem(item, index)
      )}
    </Menu>
  );
};

export default HeaderDropdown;
