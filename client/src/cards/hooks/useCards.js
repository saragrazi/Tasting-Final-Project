import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnack } from "../../providers/SnackbarProvider";
import ROUTES from "../../routes/routesModel";
import normalizeCard from "../helpers/normalization/normalizeCard";
import {
  getCard,
  createCard,
  editCard,
  deleteCard,
  likeCard,
  addRating,
  addComment,
  deleteComment,
  reportCard,
} from "../services/cardService";
import useAxios from "../../hooks/useAxios";

const useCards = () => {
  const [cards, setCards] = useState(null);
  const [card, setCard] = useState(null);
  const [like, setLike] = useState(false)
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);
  const [cardId, setCardId] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { setSnack } = useSnack();
  const navigate = useNavigate();

  useAxios()

  const requestStatus = (pending, error, cards, card) => {
    setPending(pending);
    setError(error);
    setCards(cards);
    setCard(card);
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

  const handleCreateCard = useCallback(async (cardFromClient, images = []) => {
    const formData = new FormData();
    const normalCard = normalizeCard(cardFromClient);
    images.forEach((file) => formData.append("images", file));
    formData.append("form", JSON.stringify(normalCard))
    try {
      setPending(true);
      setUploadProgress(0);
      const card = await createCard(formData, setUploadProgress)
      requestStatus(false, null, null, card);
      setSnack('success', 'המתכון שלך נוצר בהצלחה!');
      navigate(ROUTES.MY_CARDS);
    } catch (error) {
      requestStatus(false, error, null, null);
    } finally {
      setUploadProgress(0);
    }
  }, [setSnack, navigate]);

  const handleUpdateCard = useCallback(async (card, images = []) => {
    const formData = new FormData();
    const normalCard = normalizeCard(card);
    images.forEach((file) => formData.append("images", file));
    formData.append("form", JSON.stringify(normalCard))
    try {
      setPending(true);
      setUploadProgress(0);
      const data = await editCard(formData, cardId, setUploadProgress);
      requestStatus(false, null, null, data);
      setSnack('success', 'המתכון שלך עודכן בהצלחה!');
      navigate(ROUTES.MY_CARDS)
    } catch (error) {
      requestStatus(false, error, null, null);
    } finally {
      setUploadProgress(0);
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

  const handleAddRating = async (cardId, rating) => {
    try {
      setPending(true);
      const card = await addRating(cardId, rating);
      requestStatus(false, null, null, card);
      setSnack('success', 'הדירוג נוסף בהצלחה!');
    } catch (error) {
      requestStatus(false, error, null, null);
      setSnack('error', error || 'לא ניתן להוסיף דירוג כרגע');
    }
  };

  const handleAddComment = async (cardId, comment) => {
    try {
      setPending(true);
      const card = await addComment(cardId, comment);
      requestStatus(false, null, null, card);
      setSnack('success', 'התגובה נוספה בהצלחה!');
    } catch (error) {
      requestStatus(false, error, null, null);
      setSnack('error', error || 'לא ניתן להוסיף תגובה כרגע');
    }
  };

  const handleDeleteComment = async (cardId, commentId) => {
    try {
      setPending(true);
      const card = await deleteComment(cardId, commentId);
      requestStatus(false, null, null, card);
      setSnack('success', 'התגובה נמחקה בהצלחה!');
    } catch (error) {
      requestStatus(false, error, null, null);
      setSnack('error', error || 'לא ניתן למחוק את התגובה כרגע');
    }
  };

  const handleReportCard = async (cardId, reason) => {
    try {
      setPending(true);
      await reportCard(cardId, reason);
      setPending(false);
      setSnack('success', 'תודה, הדיווח נשלח ויטופל בהקדם.');
    } catch (error) {
      setPending(false);
      setSnack('error', error || 'לא ניתן היה לשלוח את הדיווח כרגע');
    }
  };

  const handleDeleteCard = async cardId => {
    try {
      setPending(true);
      const card = await deleteCard(cardId);
      setSnack('success', 'המתכון שלך נמחק בהצלחה!');
      requestStatus(false, null, null, card);

    } catch (error) {
      requestStatus(false, error, null, null);
      navigate(ROUTES.CARDS);    }
    // if (card) navigate(ROUTES.CARDS);
  };

  return {
    card,
    cards,
    pending,
    uploadProgress,
    error,
    like,
    setCards,
    setCard,
    setLike,
    handleGetCard,
    handleCreateCard,
    handleUpdateCard,
    handleDeleteCard,
    handleReportCard,
    handleLikeCard,
    handleAddRating,
    handleAddComment,
    handleDeleteComment,
    setCardId,
  };
};

export default useCards;
