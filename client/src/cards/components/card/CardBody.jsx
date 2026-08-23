import React from "react";
import {
  Box,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Rating,
  Typography,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import cardType from "../../models/types/cardType";
import formatPrepTime from "../../helpers/formatPrepTime";
import { getCategoryLabel } from "../../models/categoryOptions";

const clampSx = {
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  textAlign: "right",
};

const CardBody = ({ card }) => {
  const ratingCount = card.ratings?.length || 0;

  return (
    <CardContent sx={{ flex: 1, p: 1, display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
      <CardHeader
        title={
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="h6" sx={clampSx}>{card.title}</Typography>
            {card.isPrivate && (
              <Chip label="פרטי" size="small" sx={{ height: 18, fontSize: "0.65rem" }} />
            )}
          </Box>
        }
        subheader={<Typography variant="body2" color="text.secondary" sx={clampSx}>{card.subtitle}</Typography>}
        sx={{ p: 0, mb: 1, textAlign: "right" }}
      />
      <Box display="flex" justifyContent="flex-start" alignItems="center" gap={1} mb={1}>
        <Rating value={card.averageRating || 0} precision={0.5} readOnly size="small" />
      </Box>
      <Typography color="text.secondary" variant="caption" sx={{ display: "block", textAlign: "right", mb: 1 }}>
        {ratingCount > 0 ? `דורג על ידי ${ratingCount} ${ratingCount === 1 ? "משתמש" : "משתמשים"}` : "עדיין לא דורג"}
      </Typography>
      <Typography color="text.secondary" variant="caption" sx={{ display: "block", textAlign: "right", mb: 1 }}>
        קטגוריה: {getCategoryLabel(card.category)}
      </Typography>
      {Boolean(card.prepTime) && (
        <Box display="flex" justifyContent="flex-start" alignItems="center" gap={0.5} mb={1}>
          <Typography color="text.secondary" variant="caption">
            זמן הכנה: {formatPrepTime(card.prepTime)}
          </Typography>
          <AccessTimeIcon sx={{ fontSize: 14 }} color="disabled" />
        </Box>
      )}
      {Boolean(card.authorName) && (
        <Box display="flex" justifyContent="flex-start" alignItems="center" gap={0.5} mb={1}>
          <Typography color="text.secondary" variant="caption">
            נכתב על ידי: {card.authorName}
          </Typography>
          <PersonIcon sx={{ fontSize: 14 }} color="disabled" />
        </Box>
      )}
      <Divider sx={{ mt: 1 }} />
    </CardContent>
  );
};

CardBody.propTypes = {
  card: cardType.isRequired,
};

export default CardBody;