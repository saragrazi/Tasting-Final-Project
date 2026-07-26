import React from "react";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";

const LogoIcon = () => {
  return (
    <IconButton
      sx={{ display: { xs: "inline-flex", md: "none" } }}
      size="large"
      edge="start"
      color="inherit"
      aria-label="תפריט">
      <Avatar alt="אייקון כרטיס ביקור" src="/assets/images/business-card.png" />
    </IconButton>
  );
};

export default LogoIcon;