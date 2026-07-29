import React from "react";
import Box from "@mui/material/Box";
import NavItem from "../../../../routes/NavItem";
import ROUTES from "../../../../routes/routesModel";

const NotLogged = () => {
  return (
    <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
      <NavItem label="התחברות" to={ROUTES.LOGIN}></NavItem>
      <NavItem label="הרשמה" to={ROUTES.SIGNUP}></NavItem>
    </Box>
  );
};

export default NotLogged;
