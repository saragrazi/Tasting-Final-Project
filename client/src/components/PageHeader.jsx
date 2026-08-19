import { Divider, Typography } from "@mui/material";
import {string} from "prop-types";
import React from "react";

const PageHeader = ({ title, subtitle }) => {
  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mt: 3, fontWeight: "bold" }}>
        {title}
      </Typography>
      <Typography variant="subtitle1" component="h2" color="text.secondary">
        {subtitle}
      </Typography>
      <Divider sx={{ my: 2 }} />
    </>
  );
};

PageHeader.propTypes = {
  title: string.isRequired,
}

export default PageHeader;
