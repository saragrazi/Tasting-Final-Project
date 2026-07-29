import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import SearchBar from "./SearchBar";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MoreButton from "./MoreButton";
import Logged from "./Logged";
import NotLogged from "./NotLogged";
import Menu from "./Menu";
import { useTheme } from "../../../../providers/ThemeProvider";
import { useUser } from "../../../../users/providers/UserProvider";
import { getUsersCount } from "../../../../users/services/usersApiService";

const RightNavBar = () => {
  const { isDark, toggleDarkMode } = useTheme();

  const { user } = useUser();
  const [usersCount, setUsersCount] = useState(null);
  const currentUserId = user?._id;
  let anchorEl = null;

  const setAnchorEl = (target) => {
    anchorEl = target;
    console.log("you opened menu");
  };

  const closeMenu = () => {
    anchorEl = null;
    console.log("you closed menu");
  };

  useEffect(() => {
    let isMounted = true;

    const loadUsersCount = async () => {
      try {
        const { count } = await getUsersCount();
        if (isMounted) setUsersCount(count ?? 0);
      } catch (error) {
        if (isMounted) setUsersCount(0);
      }
    };

    loadUsersCount();
    window.addEventListener("focus", loadUsersCount);

    return () => {
      isMounted = false;
      window.removeEventListener("focus", loadUsersCount);
    };
  }, [currentUserId]);

  return (
    <>
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Chip
          label={usersCount === null ? "טוען..." : `${usersCount} משתמשים`}
          size="small"
          color="success"
          variant="outlined"
          sx={{ mr: 1, height: 30, px: 1, fontWeight: 600 }}
        />

        {!user && <NotLogged />}

        {user && <Logged setAnchorEl={setAnchorEl} />}

        <IconButton onClick={toggleDarkMode}>
          {isDark ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>

        <SearchBar />
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
