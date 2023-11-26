import React from "react";
import { arrayOf, bool, object, func, string } from "prop-types";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";
import Cards from "./Cards";

const CardsFeedback = ({ pending, error, cards, onDelete, setCards }) => {
  if (pending) return <Spinner />;
  if (error) return <Error errorMessage={error} />;
  if (cards && !cards.length)
    return <h4>Oops.. there are not cards at all!</h4>;
  if (cards && !!cards.length)
    return <Cards setCards={setCards} cards={cards} onDelete={onDelete} />;
  return null;
};

CardsFeedback.propTypes = {
  pending: bool.isRequired,
  error: string,
  cards: arrayOf(object),
  onDelete: func.isRequired,
};

export default CardsFeedback;
