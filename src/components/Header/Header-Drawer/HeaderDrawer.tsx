import { MouseEvent } from "react";
import { Link, Button } from "react-scroll";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { ListItemButton } from "@mui/material";

type HeaderDrawerProps = {
  id: string;
  menuItems: HeaderDrawerItem[];
  drawerVisible: boolean;
  toggleDrawer: (drawerOpen: true | false) => void;
  propagateClick: (event: MouseEvent<HTMLElement>) => void;
};

export type HeaderDrawerItem = {
  id: string | HeaderDrawerItem[];
  label: string;
};

const HeaderDrawer = ({
  id,
  menuItems,
  drawerVisible,
  toggleDrawer,
  propagateClick,
}: HeaderDrawerProps): JSX.Element => {
  const displayMenuItem = (
    item: HeaderDrawerItem,
    index: number
  ): JSX.Element => {
    return (
      <ListItemButton
        onClick={(event) => {
          propagateClick(event);
          toggleDrawer(false);
        }}
      >
        <ListItem key={index}>
          <Link
            className="text-lg font-medium"
            type="submit"
            to={item.id as string}
            smooth={true}
            offset={-40}
            onClick={() => {
              toggleDrawer(false);
            }}
          >
            {item.label}
          </Link>
        </ListItem>
      </ListItemButton>
    );
  };

  return (
    <Drawer
      id={id}
      anchor={"right"}
      open={Boolean(drawerVisible)}
      onClose={() => toggleDrawer(false)}
    >
      <List>
        {menuItems.map((item, index) =>
          item.label === "About"
            ? (item.id as HeaderDrawerItem[]).map((item, index) =>
                displayMenuItem(item, index)
              )
            : displayMenuItem(item, index)
        )}
      </List>
    </Drawer>
  );
};

export default HeaderDrawer;
