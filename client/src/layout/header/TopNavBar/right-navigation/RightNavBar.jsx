import React from "react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import SearchBar from "./SearchBar";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MoreButton from "./MoreButton";
import Logged from "./Logged";
import NotLogged from "./NotLogged";
import Menu from "./Menu";
import { useTheme } from "../../../../providers/ThemeProvider";
import { useUser } from "../../../../users/providers/UserProvider";

const RightNavBar = () => {
  const { isDark, toggleDarkMode } = useTheme();

  const { user } = useUser();
  let anchorEl = null;

  const setAnchorEl = (target) => {
    anchorEl = target;
    console.log("you opened menu");
  };

  const closeMenu = () => {
    anchorEl = null;
    console.log("you closed menu");
  };

  return (
    <>
      <Box sx={{ display: { xs: "none", md: "inline-flex" } }}>
        <SearchBar />

        <IconButton sx={{ marginLeft: 1 }} onClick={toggleDarkMode}>
          {isDark ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>

        {!user && <NotLogged />}

        {user && <Logged setAnchorEl={setAnchorEl} />}
      </Box>

      <MoreButton onClick={setAnchorEl} />

      <Menu
        isMenuOpen={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onCloseMenu={closeMenu}
      />
    </>
  );
};

export default RightNavBar;
