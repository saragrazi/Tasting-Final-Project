import React from "react";
import {
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import cardType from "../../models/types/cardType";

const CardBody = ({ card }) => {

  return (
    <>
      <CardContent>
        <CardHeader title={card.title} subheader={card.subtitle} sx={{ p: 0, mb: 1 }} />
        <Typography color={""} variant="caption">category: {card.category}</Typography>
        <Divider />
      </CardContent>
    </>
  );
};

CardBody.propTypes = {
  card: cardType.isRequired,
};

export default CardBody;