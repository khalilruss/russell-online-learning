import { useEffect, useState, MouseEvent } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link } from "react-scroll";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";

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
  const headerButtons = [
    {
      label: "About",
      id: "about",
    },
    {
      label: "My Accomplishments",
      id: "accomplishments",
    },
    {
      label: "My Ethos",
      id: "ethos",
    },
    {
      label: "Testimonials",
      id: "testimonials",
    },
    {
      label: "Sessions and Prices",
      id: "sessionsAndPrices",
    },
    {
      label: "Contact Me",
      id: "/contact",
    },
  ];

  const [anchorElAboutMenu, setAnchorElAboutMenu] =
    useState<null | HTMLElement>(null);

  const handleClickAboutMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElAboutMenu(event.currentTarget);
  };

  const handleCloseAboutMenu = () => {
    setAnchorElAboutMenu(null);
  };

  const displayAboutMenu = () => {
    return (
      <Menu
        id="about-menu"
        anchorEl={anchorElAboutMenu}
        open={Boolean(anchorElAboutMenu)}
        onClose={handleCloseAboutMenu}
        MenuListProps={{ onMouseLeave: handleCloseAboutMenu }}
      >
        <MenuItem>
          <Link
            className="text-lg font-medium"
            activeClass="active"
            to="aboutROL"
            smooth={true}
            offset={-40}
            onClick={handleCloseAboutMenu}
          >
            About Russell Online Learning
          </Link>
        </MenuItem>

        <MenuItem>
          <Link
            className="text-lg font-medium"
            activeClass="active"
            type="submit"
            to="aboutMe"
            smooth={true}
            offset={-40}
            onClick={handleCloseAboutMenu}
          >
            About Me
          </Link>
        </MenuItem>
      </Menu>
    );
  };

  const propagateClick = (event: MouseEvent<HTMLElement>) => {
    (
      (event.target as HTMLButtonElement).children[0] as HTMLLinkElement
    ).click();
  };

  const displayMenu = (): JSX.Element[] => {
    return headerButtons.map((item, index) => {
      return (
        <div>
          <Button
            key={index}
            endIcon={item.id === "about" ? <KeyboardArrowDownIcon /> : null}
            onClick={
              item.id === "about"
                ? (event) => handleClickAboutMenu(event)
                : (event) => propagateClick(event)
            }
            onMouseEnter={
              item.id === "about"
                ? (event) => handleClickAboutMenu(event)
                : () => {}
            }
            className={"m-2 flex text-white whitespace-nowrap"}
          >
            <Link
              className="text-lg font-medium"
              activeClass="active"
              type="submit"
              to={item.id}
              smooth={true}
              offset={-40}
            >
              {item.label}
            </Link>
          </Button>
          <div>{item.id === "about" ? displayAboutMenu() : null}</div>
        </div>
      );
    });
  };

  const displayFullMenu = (): JSX.Element => {
    return (
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            flexGrow: 0,
            display: { xs: "none", xl: "flex" },
          }}
        >
          {displayMenu()}
        </Box>
      </ThemeProvider>
    );
  };

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

  const handleClickMobileMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElMobileMenu(event.currentTarget);
  };

  const handleCloseMobileMenu = () => {
    setAnchorElMobileMenu(null);
  };

  const displayMobileMenu = (): JSX.Element => {
    return (
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
            onClick={handleClickMobileMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="mobile-menu"
            anchorEl={anchorElMobileMenu}
            open={Boolean(anchorElMobileMenu)}
            onClose={handleCloseMobileMenu}
            MenuListProps={{ onMouseLeave: handleCloseMobileMenu }}
          >
            {headerButtons.map((item, index) => (
              <MenuItem key={index} onClick={handleCloseMobileMenu}>
                <Link
                  className="text-lg font-medium"
                  type="submit"
                  to={item.id}
                  smooth={true}
                  offset={-40}
                >
                  {item.label}
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </ThemeProvider>
    );
  };

  return (
    <header>
      <AppBar className="bg-regal-blue flex">
        <Toolbar disableGutters className="flex justify-between">
          {displayMobileMenu()}
          <Link
            className={`text-lg font-medium self-center ${
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
          {displayFullMenu()}
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
