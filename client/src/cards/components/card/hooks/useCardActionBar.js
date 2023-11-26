import { useCallback, useState } from "react"
import { useSnack } from "../../../../providers/SnackbarProvider"
import { func, object } from "prop-types";

const useCardActionBar = (handleDeleteCard, handleLikeCard, setCards, cards) => {
  const [localLike, setLocalLike] = useState()
  const { setSnack } = useSnack();

  const onDelete = useCallback(async (cardId) => {
    if (window.confirm('Are you sure you want to delete this card')) {
      try {
        handleDeleteCard(cardId)
        setCards(() => cards.filter((card) => card._id !== cardId)
        );
      } catch (err) {

        setSnack("error", err)
      }
    } else {
      return
    }
  },[cards,handleDeleteCard,setCards,setSnack])

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
    setLocalLike
  }
}

export default useCardActionBar

useCardActionBar.propTypes = {  
  cards: object.isRequired,
  handleDeleteCard: func.isRequired,
  setCards: func.isRequired,
  handleLikeCard: func.isRequired,
};