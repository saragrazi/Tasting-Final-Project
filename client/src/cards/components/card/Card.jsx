import React from "react";
import cardType from "../../models/types/cardType";
import CardHead from "./CardHead";
import CardBody from "./CardBody";
import CardActionBar from "./CardActionBar";

import { Card, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getCardPath } from "../../helpers/cardUrl";
import { array, func } from "prop-types";

const CardComponent = ({ cards, card, onLike, onDelete, onEdit, setCards, removeCard }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        minWidth: 250,
        maxWidth: 350,
        width: "100%",
        minHeight: 500,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        direction: "rtl",
        textAlign: "right",
        "&:hover": { boxShadow: "0 0 12px 0px gray" },
      }}
      raised
    >
      <CardActionArea
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
        onClick={() => navigate(getCardPath(card))}
      >
        <CardHead image={card.image} />
        <CardBody card={card} />
      </CardActionArea>
      <CardActionBar
        userId={card.user_id}
        cardId={card._id}
        card={card}
        cards={cards}
        setCards={setCards}
        removeCard={removeCard}
      />
    </Card>
  );
};

CardComponent.propTypes = {
  card: cardType.isRequired,
  cards: array.isRequired,
  setCards: func,
};

export default CardComponent;
