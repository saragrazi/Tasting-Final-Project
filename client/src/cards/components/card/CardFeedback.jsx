import React from "react";
import { bool, object, string } from "prop-types";
import Spinner from "../../../components/Spinner";
import Error from "../../../components/Error";
import CardComponent from "./Card";

const CardFeedback = ({ pending, error, card }) => {
  if (pending) return <Spinner />;
  if (error) return <Error errorMessage={error} />;
  if (card)
    return (
      <CardComponent
        card={card}
        setCards={(cards) => {
          console.log(cards);
        }}
      />
    );
  return null;
};

CardFeedback.propTypes = {
  pending: bool.isRequired,
  error: string,
  card: object,
};

export default CardFeedback;
