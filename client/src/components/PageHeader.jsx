import { Divider, Typography } from "@mui/material";
import {string} from "prop-types";
import React from "react";

const PageHeader = ({ title, subtitle }) => {
  return (
    <>
      <Typography variant="h2" component="h1">
        {title}
      </Typography>
      <Typography variant="h5" component="h2">
        {subtitle}
      </Typography>
      <Divider sx={{ my: 2 }} />
    </>
  );
};

PageHeader.propTypes = {
  title: string.isRequired,
  subtitle: string.isRequired,
}

export default PageHeader;
