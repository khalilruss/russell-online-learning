import { MouseEvent } from "react";
import { Link } from "react-scroll";
import ListItem from "@mui/material/ListItem";
import { ListItemButton } from "@mui/material";
import { DrawerItem } from "../Header-Drawer";

export type HeaderDrawerItemProps = {
  index: number;
  id: string | DrawerItem[];
  label: string;
  toggleDrawer: (drawerOpen: true | false) => void;
  propagateClick: (event: MouseEvent<HTMLElement>) => void;
};

const HeaderDrawerItem = ({
  index,
  id,
  label,
  toggleDrawer,
  propagateClick,
}: HeaderDrawerItemProps): JSX.Element => {
  return (
    <ListItemButton
      data-testid={`header-drawer-item-${index}`}
      key={index}
      onClick={(event) => {
        propagateClick(event);
        toggleDrawer(false);
      }}
    >
      <ListItem key={index}>
        <Link
          className="text-lg font-medium"
          type="submit"
          to={id as string}
          smooth={true}
          offset={-40}
          onClick={() => {
            toggleDrawer(false);
          }}
        >
          {label}
        </Link>
      </ListItem>
    </ListItemButton>
  );
};

export default HeaderDrawerItem;
