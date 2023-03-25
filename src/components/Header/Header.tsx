import { useEffect, useState, MouseEvent } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-scroll";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import HeaderButton from "./Header-Button/Header-Button";
import HeaderMenu from "./Header-Menu/Header-Menu";
import { headerButtons, aboutMenuItems } from "../../content/header-content";
import HeaderDrawer from "./Header-Drawer/HeaderDrawer";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
  }
}

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1440,
    },
  },
});

const Header = (): JSX.Element => {
  const [anchorElAboutMenu, setAnchorElAboutMenu] =
    useState<null | HTMLElement>(null);

  const [drawerVisible, setDrawerVisible] = useState<Boolean>(false);

  const [mobileVisible, setMobileVisible] = useState<Boolean>(false);

  const [changeLogo, setChangeLogo] = useState<Boolean>(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => {
        const isMobileVisible = window.innerWidth < 1440;
        const smallerLogo = window.innerWidth < 600;
        if (isMobileVisible !== mobileVisible)
          setMobileVisible(isMobileVisible);
        if (smallerLogo !== changeLogo) setChangeLogo(smallerLogo);
      },
      false
    );
  }, [mobileVisible, changeLogo]);

  const handleClickMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElAboutMenu(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElAboutMenu(null);
  };

  const toggleDrawer = (drawerOpen: true | false) => {
    setDrawerVisible(drawerOpen);
  };

  const propagateClick = (event: MouseEvent<HTMLElement>) => {
    (
      (event.target as HTMLButtonElement).children[0] as HTMLLinkElement
    ).click();
  };

  const displayHeaderButtons = (): JSX.Element[] => {
    return headerButtons.map((item, index) => {
      return (
        <HeaderButton
          index={index}
          id={item.id}
          label={item.label}
          handleClickAboutMenu={(event) => {
            handleClickMenu(event);
          }}
          propagateClick={propagateClick}
        />
      );
    });
  };

  return (
    <header>
      <AppBar className="bg-regal-blue flex">
        <Toolbar disableGutters className="flex justify-between">
          <ThemeProvider theme={theme}>
            <Link
              className={`text-lg font-medium self-center ${
                mobileVisible ? " relative left-[24px] grow" : " m-2 "
              }`}
              activeClass="active"
              type="submit"
              to={"welcome"}
              smooth={true}
              offset={-35}
            >
              <Typography
                className="whitespace-nowrap font-medium"
                variant="h4"
                component="h1"
              >
                {changeLogo ? "ROL" : "Russell Online Learning"}
              </Typography>
            </Link>
            <HeaderMenu
              id="about-menu"
              anchorEl={anchorElAboutMenu}
              menuItems={aboutMenuItems}
              handleCloseMenu={() => handleCloseMenu()}
              propagateClick={propagateClick}
            />
            <Box
              sx={{
                flexGrow: 0,
                display: { xs: "none", xl: "flex" },
              }}
            >
              {displayHeaderButtons()}
            </Box>
            <Box
              sx={{
                flexGrow: 0,
                display: { xs: "flex", xl: "none" },
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => {
                  toggleDrawer(!drawerVisible);
                }}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <HeaderDrawer
                id="header-menu"
                menuItems={headerButtons}
                drawerVisible={Boolean(drawerVisible)}
                toggleDrawer={toggleDrawer}
                propagateClick={propagateClick}
              />
            </Box>
          </ThemeProvider>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
