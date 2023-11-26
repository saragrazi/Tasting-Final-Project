import React from "react";
import cardType from "../../models/types/cardType";
import CardHead from "./CardHead";
import CardBody from "./CardBody";
import CardActionBar from "./CardActionBar";

import { Box, Card, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/routesModel";
import { array, func } from "prop-types";

const CardComponent = ({ cards, card, onLike, onDelete, onEdit, setCards }) => {
  const navigate = useNavigate();

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 5 }}>
        <Card
          sx={{
            minWidth: 250,
            maxWidth: 350,
            "&:hover": { boxShadow: "0 0 12px 0px gray" },
          }}
          raised
        >
          <CardActionArea
            onClick={() =>
              navigate(
                `${ROUTES.CARD_INFO}/${card._id}/${card.title}/${
                  card.image.url.split("/")[2]
                }`
              )
            }
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
          />
        </Card>
      </Box>
    </>
  );
};

CardComponent.propTypes = {
  card: cardType.isRequired,
  cards: array.isRequired,
  setCards: func,
};

export default CardComponent;
