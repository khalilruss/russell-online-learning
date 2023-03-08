import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link } from "react-scroll";

const Header = (): JSX.Element => {
  const headersData = [
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

  const [anchorElAbout, setAnchorElAbout] = React.useState<null | HTMLElement>(
    null
  );
  const handleClickAbout = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElAbout(event.currentTarget);
  };
  const handleCloseAbout = () => {
    setAnchorElAbout(null);
  };

  const displayAboutMenu = () => {
    return (
      <Menu
        id="about-menu"
        anchorEl={anchorElAbout}
        open={Boolean(anchorElAbout)}
        onClose={handleCloseAbout}
        MenuListProps={{ onMouseLeave: handleCloseAbout }}
      >
        <MenuItem>
          <Link
            className="text-lg font-medium w-full"
            activeClass="active"
            to="aboutROL"
            smooth={true}
            offset={-40}
            onClick={handleCloseAbout}
          >
            About Russell Online Learning
          </Link>
        </MenuItem>

        <MenuItem>
          <Link
            className="text-lg font-medium w-full"
            activeClass="active"
            type="submit"
            to="aboutMe"
            smooth={true}
            offset={-40}
            onClick={handleCloseAbout}
          >
            About Me
          </Link>
        </MenuItem>
      </Menu>
    );
  };

  const propagateClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    (
      (event.target as HTMLButtonElement).children[0] as HTMLLinkElement
    ).click();
  };

  const displayMenu = (): JSX.Element[] => {
    return headersData.map((item, index) => {
      return (
        <div>
          <Button
            key={index}
            endIcon={item.id === "about" ? <KeyboardArrowDownIcon /> : null}
            onClick={
              item.id === "about"
                ? (event) => handleClickAbout(event)
                : (event) => propagateClick(event)
            }
            onMouseEnter={
              item.id === "about"
                ? (event) => handleClickAbout(event)
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

  return (
    <header>
      <AppBar className="bg-regal-blue" sx={{ display: "flex" }}>
        <Toolbar disableGutters>
          <Link
            className="text-lg font-medium"
            activeClass="active"
            type="submit"
            to={"welcome"}
            smooth={true}
            offset={-40}
          >
            <Typography
              className={"whitespace-nowrap font-medium"}
              variant="h4"
              component="h1"
            >
              Russell Online Learning
            </Typography>
          </Link>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            {displayMenu()}
          </Box>
          {/* <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            <MenuItem>Help</MenuItem>
            {displayMenu()}
          </Menu> */}
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
