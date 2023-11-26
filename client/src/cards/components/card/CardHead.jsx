import { CardMedia } from "@mui/material";
import React from "react";
import imageType from "../../models/types/imageType";

const CardHead = ({ image }) => {
  return (
    <>
      <CardMedia
        component="img"
        height="200"
        alt={image?.alt}
        image={image?.url}
      ></CardMedia>
    </>
  );
};

CardHead.propTypes = {
  image: imageType.isRequired,
}

export default CardHead;
