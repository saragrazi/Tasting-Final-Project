import { CardMedia } from "@mui/material";
import React from "react";
import imageType from "../../models/types/imageType";

const CardHead = ({ image }) => {
  return (
    <CardMedia
      component="img"
      alt={image?.alt}
      image={image?.url}
      sx={{ height: 220, width: "100%", objectFit: "cover", display: "block" }}
    />
  );
};

CardHead.propTypes = {
  image: imageType.isRequired,
}

export default CardHead;
