import React from "react";
import Box from "@mui/material/Box";
import Logo from "../Logo/Logo";
import NavItem from "../../../../routes/NavItem";
import ROUTES from "../../../../routes/routesModel";
import { useUser } from "../../../../users/providers/UserProvider";

const LeftNavBar = () => {
  const { user } = useUser();
  return (
    <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
      <Logo />

      <Box sx={{ display: { xs: "none", md: "inline-flex" }, alignItems: "center", gap: 1 }}>
        <NavItem label="אודות" to={ROUTES.ABOUT} />
        <NavItem label="המתכונים שלי" to={ROUTES.MY_CARDS} />
        <NavItem label="המועדפים שלי" to={ROUTES.FAV_CARDS} />
        {user && user.isAdmin && (
          <NavItem label="ניהול" to={ROUTES.USERS_MANAGEMENT} />
        )}
      </Box>
    </Box>
  );
};

export default LeftNavBar;
