import React from "react";
import { arrayOf, bool, object, func, string, node } from "prop-types";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";
import Cards from "./Cards";

const CardsFeedback = ({ pending, error, cards, onDelete, setCards, removeCard, emptyMessage }) => {
  if (pending) return <Spinner />;
  if (error) return <Error errorMessage={error} />;
  if (cards && !cards.length)
    return <h4>{emptyMessage}</h4>;
  if (cards && !!cards.length)
    return <Cards setCards={setCards} removeCard={removeCard} cards={cards} onDelete={onDelete} />;
  return null;
};

CardsFeedback.propTypes = {
  pending: bool.isRequired,
  error: string,
  cards: arrayOf(object),
  onDelete: func.isRequired,
  setCards: func,
  removeCard: func,
  emptyMessage: node,
};

CardsFeedback.defaultProps = {
  emptyMessage: "אופס... אין כאן כרטיסים להציג.",
};

export default CardsFeedback;
