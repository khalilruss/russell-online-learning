import { MouseEvent } from "react";
import { Link } from "react-scroll";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

type HeaderMenuProps = {
  id: string;
  anchorEl: null | HTMLElement;
  menuItems: HeaderMenuItem[];
  handleCloseMenu: () => void;
  propagateClick: (event: MouseEvent<HTMLElement>) => void;
};

export type HeaderMenuItem = {
  id: string | HeaderMenuItem[];
  label: string;
};

const HeaderMenu = ({
  anchorEl,
  id,
  menuItems,
  handleCloseMenu,
  propagateClick,
}: HeaderMenuProps): JSX.Element => {
  const displayMenuItem = (
    item: HeaderMenuItem,
    index: number
  ): JSX.Element => {
    return (
      <MenuItem
        key={index}
        onClick={(event) => {
          propagateClick(event);
        }}
      >
        <Link
          className="text-lg font-medium"
          type="submit"
          to={item.id as string}
          smooth={true}
          offset={-40}
        >
          {item.label}
        </Link>
      </MenuItem>
    );
  };

  return (
    <Menu
      id={id}
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleCloseMenu}
      MenuListProps={{ onMouseLeave: handleCloseMenu }}
    >
      {menuItems.map((item, index) =>
        item.label === "About"
          ? (item.id as HeaderMenuItem[]).map((item, index) =>
              displayMenuItem(item, index)
            )
          : displayMenuItem(item, index)
      )}
    </Menu>
  );
};

export default HeaderMenu;