import { useCallback, useState } from "react"
import { useSnack } from "../../../../providers/SnackbarProvider"
import { func, object } from "prop-types";

const useCardActionBar = (handleDeleteCard, handleLikeCard, setCards, cards) => {
  const [localLike, setLocalLike] = useState()
  const [cardIdToDelete, setCardIdToDelete] = useState(null);
  const { setSnack } = useSnack();

  const onDelete = useCallback((cardId) => {
    setCardIdToDelete(cardId);
  }, [])

  const onCancelDelete = useCallback(() => {
    setCardIdToDelete(null);
  }, [])

  const onConfirmDelete = useCallback(async () => {
    const cardId = cardIdToDelete;
    setCardIdToDelete(null);
    try {
      handleDeleteCard(cardId)
      setCards(() => cards.filter((card) => card._id !== cardId)
      );
    } catch (err) {

      setSnack("error", err)
    }
  },[cardIdToDelete,cards,handleDeleteCard,setCards,setSnack])

  const onLike = useCallback(async (cardId) => {
    try {
      await handleLikeCard(cardId)
      cards.map(card => {
        if (card._id === cardId) {
          localLike ? setLocalLike(false) : setLocalLike(true)
          return card
        }
        return card
      })
    } catch (err) {
      setSnack("error", err);
    }
  },[cards,handleLikeCard,localLike,setSnack]);

  return {
    onDelete,
    onLike,
    localLike,
    setLocalLike,
    cardIdToDelete,
    onCancelDelete,
    onConfirmDelete
  }
}

export default useCardActionBar

useCardActionBar.propTypes = {  
  cards: object.isRequired,
  handleDeleteCard: func.isRequired,
  setCards: func.isRequired,
  handleLikeCard: func.isRequired,
};