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
    <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1, flexDirection: "row-reverse" }}>
      <LogoIcon />
      <Logo />

      <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1, flexDirection: "row-reverse" }}>
        <NavItem label="אודות" to={ROUTES.ABOUT} />
        {user && user.isBusiness && (
          <NavItem label="המתכונים שלי" to={ROUTES.MY_CARDS} />
        )}
        {user && <NavItem label="המתכונים המועדפים" to={ROUTES.FAV_CARDS} />}
      </Box>
    </Box>
  );
};

export default LeftNavBar;
