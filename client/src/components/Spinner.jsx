import React from "react";
import { oneOfType, string, number } from "prop-types";
import { Box, CircularProgress } from "@mui/material";

const Spinner = ({ color = "primary", size = 50, height = "50vh" }) => {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", minHeight: { height } }}
    >
      <CircularProgress
        color={color}
        size={size}
        sx={{ alignSelf: "center" }}
      ></CircularProgress>
    </Box>
  );
};

Spinner.propTypes = {
  color: string,
  size: number,
  height: oneOfType([string, number]),
};

export default Spinner;
