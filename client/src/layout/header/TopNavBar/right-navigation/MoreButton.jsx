import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { func } from "prop-types";
import { useMenu } from "../menu/MenuProvider";

const MoreButton = () => {
  const openMenu = useMenu();
  return (
    <Box sx={{ display: { xs: "inline-flex", md: "none" } }}>
      <IconButton
        onClick={(e) => openMenu(e.currentTarget)}
        size="large"
        color="inherit"
        aria-label="תפריט"
        sx={{ display: { xs: "inline-flex", md: "none" } }}
      >
        <MoreVertIcon />
      </IconButton>
    </Box>
  );
};

MoreButton.propTypes = {
  onClick: func,
};

export default MoreButton;
