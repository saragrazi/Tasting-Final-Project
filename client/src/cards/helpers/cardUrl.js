import ROUTES from "../../routes/routesModel";

export const getCardPath = (card) =>
  `${ROUTES.CARD_INFO}/${card?._id}/${encodeURIComponent(card?.title || "")}`;
