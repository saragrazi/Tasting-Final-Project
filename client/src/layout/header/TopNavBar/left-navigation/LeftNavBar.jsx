import React from "react";
import Box from "@mui/material/Box";
import Logo from "../Logo/Logo";
import LogoIcon from "../Logo/LogoIcon";
import NavItem from "../../../../routes/NavItem";
import ROUTES from "../../../../routes/routesModel";
import { useUser } from "../../../../users/providers/UserProvider";

const LeftNavBar = () => {
  const { user } = useUser();
  return (
    <Box>
      <LogoIcon />
      <Logo />

      <Box sx={{ display: { xs: "none", md: "inline-flex" } }}>
        <NavItem label="About" to={ROUTES.ABOUT} />
        {user && user.isBusiness && (
          <NavItem label="My Recipes" to={ROUTES.MY_CARDS} />
        )}
      </Box>
      <Box sx={{ display: { xs: "none", md: "inline-flex" } }}>
        {user && <NavItem label="Fav Recipes" to={ROUTES.FAV_CARDS} />}
      </Box>
    </Box>
  );
};

export default LeftNavBar;
