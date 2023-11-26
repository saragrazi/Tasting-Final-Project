import React from "react";
import Box from "@mui/material/Box";
import NavItem from "../../../../routes/NavItem";
import ROUTES from "../../../../routes/routesModel";

const NotLogged = () => {
  return (
    <Box>
      <NavItem label="signup" to={ROUTES.SIGNUP}></NavItem>
      <NavItem label="login" to={ROUTES.LOGIN}></NavItem>
    </Box>
  );
};

export default NotLogged;
