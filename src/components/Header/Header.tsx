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
      xl: 1425,
    },
  },
});

const Header = (): JSX.Element => {
  const [anchorElAboutMenu, setAnchorElAboutMenu] =
    useState<null | HTMLElement>(null);

  const [anchorElMobileMenu, setAnchorElMobileMenu] =
    useState<null | HTMLElement>(null);

  const [mobileVisible, setMobileVisible] = useState<Boolean>(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => {
        const isMobileVisible = window.innerWidth < 1425;
        if (isMobileVisible !== mobileVisible)
          setMobileVisible(isMobileVisible);
      },
      false
    );
  }, [mobileVisible]);

  const handleClickMenu = (
    menuType: "about" | "mobile",
    event: MouseEvent<HTMLElement>
  ) => {
    if (menuType === "about") {
      setAnchorElAboutMenu(event.currentTarget);
    } else if (menuType === "mobile") {
      setAnchorElMobileMenu(event.currentTarget);
    }
  };

  const handleCloseMenu = (menuType: "about" | "mobile") => {
    if (menuType === "about") {
      setAnchorElAboutMenu(null);
    } else if (menuType === "mobile") {
      setAnchorElMobileMenu(null);
    }
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
            handleClickMenu("about", event);
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
                onClick={(event) => {
                  handleClickMenu("mobile", event);
                }}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <HeaderMenu
                id="mobile-menu"
                anchorEl={anchorElMobileMenu}
                menuItems={headerButtons}
                handleCloseMenu={() => handleCloseMenu("mobile")}
                propagateClick={propagateClick}
              />
            </Box>
            <Link
              className={`text-lg font-medium self-center m-2 ${
                mobileVisible ? "grow" : " "
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
                Russell Online Learning
              </Typography>
            </Link>
            <HeaderMenu
              id="about-menu"
              anchorEl={anchorElAboutMenu}
              menuItems={aboutMenuItems}
              handleCloseMenu={() => handleCloseMenu("about")}
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
          </ThemeProvider>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
