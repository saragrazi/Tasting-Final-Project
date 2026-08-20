import React from "react";
import { array } from "prop-types";
import { useMediaQuery, useTheme } from "@mui/material";
import RecipeImageStory from "../RecipeImageStory";

const CardHead = ({ images }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <RecipeImageStory
      images={images}
      height={220}
      playOnHover
      interactive={!isMobile}
      imgSx={{ objectFit: "cover", display: "block" }}
    />
  );
};

CardHead.propTypes = {
  images: array.isRequired,
}

export default CardHead;
