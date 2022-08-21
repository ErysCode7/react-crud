import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.scss";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const MobileNav = () => {
  return (
    <ul className="app__navbar-mobile_menu-navlinks">
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/newpost">Post</NavLink>
      </li>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
    </ul>
  );
};

const Navbar = () => {
  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      className="app__navbar-mobile"
    >
      <MobileNav />
    </Box>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" className="app__navbar">
          <Toolbar className="app__navbar-toolbar">
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <ul className="app__navbar-navlinks">
              <li>
                <NavLink className="app__navbar-navlinks_link" to="/">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink className="app__navbar-navlinks_link" to="/newpost">
                  Post
                </NavLink>
              </li>
              <li>
                <NavLink className="app__navbar-navlinks_link" to="/about">
                  About
                </NavLink>
              </li>
            </ul>
            <div className="app__navbar-mobile_menu">
              <MenuIcon style={{ fontSize: "35px" }} />
              <div style={{ opacity: "0", position: "absolute" }}>
                {["left"].map((anchor) => (
                  <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>
                      {anchor}
                    </Button>
                    <Drawer
                      anchor={anchor}
                      open={state[anchor]}
                      onClose={toggleDrawer(anchor, false)}
                    >
                      {list(anchor)}
                    </Drawer>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar;
