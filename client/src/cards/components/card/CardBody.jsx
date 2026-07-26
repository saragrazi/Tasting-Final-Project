import React from "react";
import {
  Box,
  CardContent,
  CardHeader,
  Divider,
  Rating,
  Typography,
} from "@mui/material";
import cardType from "../../models/types/cardType";

const CardBody = ({ card }) => {
  return (
    <CardContent sx={{ flex: 1, p: 1, display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
      <CardHeader
        title={card.title}
        subheader={card.subtitle}
        sx={{ p: 0, mb: 1, textAlign: "right" }}
      />
      <Box display="flex" justifyContent="flex-end" alignItems="center" gap={1} mb={1}>
        <Rating value={card.averageRating || 0} precision={0.5} readOnly size="small" />
      </Box>
      <Typography color="text.secondary" variant="caption" sx={{ display: "block", textAlign: "right", mb: 1 }}>
        קטגוריה: {card.category}
      </Typography>
      <Divider sx={{ mt: 1 }} />
    </CardContent>
  );
};

CardBody.propTypes = {
  card: cardType.isRequired,
};

export default CardBody;