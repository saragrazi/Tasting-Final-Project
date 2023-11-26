import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnack } from "../../providers/SnackbarProvider";
import ROUTES from "../../routes/routesModel";
import normalizeCard from "../helpers/normalization/normalizeCard";
import {
  getCards,
  getCard,
  getMyCards,
  createCard,
  editCard,
  deleteCard,
  likeCard,
} from "../services/cardService";
import useAxios from "../../hooks/useAxios";

const useCards = () => {
  const [cards, setCards] = useState(null);
  const [card, setCard] = useState(null);
  const [like, setLike] = useState(false)
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);
  const [cardId, setCardId] = useState(null);
  const { setSnack } = useSnack();
  const navigate = useNavigate();

  useAxios()

  const requestStatus = (pending, error, cards, card) => {
    setPending(pending);
    setError(error);
    setCards(cards);
    setCard(card);
  };

  const handleGetCards = async () => {
    try {
      setPending(true);
      const cards = await getCards();
      requestStatus(false, null, cards, null);
    } catch (error) {
      requestStatus(false, error, null, null);
    }
  };

  const handleGetCard = async cardId => {
    try {
      setPending(true);
      const card = await getCard(cardId);
      requestStatus(false, null, null, card);
    } catch (error) {
      requestStatus(false, error, null, null);
    }
  };

  const handleGetMyCards = useCallback(async () => {
    try {
      setPending(true);
      const cards = await getMyCards();
      requestStatus(false, null, cards, null);
    } catch (error) {
      requestStatus(false, error, null, null);
    }
  }, [])

  const handleGetFavCards = async (userId) => {
    try {
      setPending(true)
      const cards = await getCards()
      const favCards = cards.filter(card => {
        return card.likes.filter((like) => (like === userId))[0]
      })
      requestStatus(false, null, favCards, null)
    } catch (error) {
      requestStatus(false, error, null, null);
    }
  }

  const handleCreateCard = useCallback(async (cardFromClient,image) => {
    const formData = new FormData();
    const normalCard = normalizeCard(cardFromClient);
    formData.append("image", image)
    formData.append("form", JSON.stringify(normalCard))
    try {
      setPending(true);
      const card = await createCard(formData)
      requestStatus(false, null, null, card);
      setSnack('success', 'your card has been created!');
      navigate(ROUTES.MY_CARDS);
    } catch (error) {
      requestStatus(false, error, null, null);
    }
  }, [setSnack, navigate]);

  const handleUpdateCard = useCallback(async (card) => {
    try {
      setPending(true);
      const normalCard = normalizeCard(card);
      const data = await editCard(normalCard, cardId);
      requestStatus(false, null, null, data);
      setSnack('success', 'your card has been UPDATED!');
      navigate(ROUTES.MY_CARDS)
    } catch (error) {
      requestStatus(false, error, null, null);
    }
  },[cardId,navigate,setSnack]);

  const handleLikeCard = async cardId => {
    try {
      setPending(true);
      const card = await likeCard(cardId);
      requestStatus(false, null, null, card,);
    } catch (error) {
      requestStatus(false, error, null, null);
    }
  };

  const handleDeleteCard = async cardId => {
    try {
      setPending(true);
      const card = await deleteCard(cardId);
      setSnack('success', 'your card has been DELETED!');
      requestStatus(false, null, null, card);

    } catch (error) {
      requestStatus(false, error, null, null);
    }
    if (card) navigate(ROUTES.CARDS);
  };

  return {
    card,
    cards,
    pending,
    error,
    like,
    setCards,
    setCard,
    setLike,
    handleGetCards,
    handleGetCard,
    handleGetMyCards,
    handleCreateCard,
    handleUpdateCard,
    handleDeleteCard,
    handleLikeCard,
    handleGetFavCards,
    setCardId,
  };
};

export default useCards;
