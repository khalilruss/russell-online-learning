import { MouseEvent } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import HeaderDrawerItem from "./Header-Drawer-Item/Header-Drawer-Item";

export type HeaderDrawerProps = {
  id: string;
  menuItems: DrawerItem[];
  drawerVisible: boolean;
  toggleDrawer: (drawerOpen: true | false) => void;
  propagateClick: (event: MouseEvent<HTMLElement>) => void;
};

export type DrawerItem = {
  id: string | DrawerItem[];
  label: string;
};
const HeaderDrawer = ({
  id,
  menuItems,
  drawerVisible,
  toggleDrawer,
  propagateClick,
}: HeaderDrawerProps): JSX.Element => {
  const displayMenuItem = (item: DrawerItem, index: number): JSX.Element => {
    return (
      <HeaderDrawerItem
        key={index}
        index={index}
        id={item.id}
        label={item.label}
        propagateClick={propagateClick}
        toggleDrawer={toggleDrawer}
      />
    );
  };

  return (
    <Drawer
      data-testid="header-drawer"
      id={id}
      anchor={"right"}
      open={Boolean(drawerVisible)}
      onClose={() => toggleDrawer(false)}
    >
      <List>
        {menuItems.map((item, index) =>
          item.label === "About"
            ? (item.id as DrawerItem[]).map((item, index) =>
                displayMenuItem(item, index)
              )
            : displayMenuItem(item, index)
        )}
      </List>
    </Drawer>
  );
};

export default HeaderDrawer;
