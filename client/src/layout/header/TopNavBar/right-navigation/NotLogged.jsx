import React from "react";
import Box from "@mui/material/Box";
import NavItem from "../../../../routes/NavItem";
import ROUTES from "../../../../routes/routesModel";

const NotLogged = () => {
  return (
    <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
      <NavItem label="התחברות" to={ROUTES.LOGIN}></NavItem>
    </Box>
  );
};

export default NotLogged;
