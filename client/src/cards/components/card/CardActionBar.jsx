import React, { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Box, CardActions, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useUser } from "../../../users/providers/UserProvider";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/routesModel";
import useCardActionBar from "./hooks/useCardActionBar";
import useCards from "../../hooks/useCards";

const CardActionBar = ({ cardId, userId, card, cards, setCards }) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { handleLikeCard, handleDeleteCard } = useCards();
  const { onDelete, onLike, localLike, setLocalLike } = useCardActionBar(
    handleDeleteCard,
    handleLikeCard,
    setCards,
    cards
  );
  useEffect(() => {
    const isLiked = async () => {
      const hasUser = await card.likes.filter((like) => like === user?._id);
      if (hasUser.length > 0) {
        setLocalLike(true);
      }
    };

    isLiked();
  }, [card.likes, user?._id, setLocalLike]);

  return (
    <>
      <CardActions sx={{ pt: 0, justifyContent: "space-between" }}>
        <Box>
          {user && (user?._id === userId || user.isAdmin) && (
            <IconButton
              sx={{ "&:hover": { backgroundColor: "#d06b6b", color: "white" } }}
              aria-label="delete"
              onClick={() => {
                onDelete(cardId);
              }}
            >
              <DeleteIcon />
            </IconButton>
          )}
          {user && user?._id === userId && (
            <IconButton
              sx={{ "&:hover": { backgroundColor: "#d06b6b", color: "white" } }}
              aria-label="edit"
              onClick={() => navigate(`${ROUTES.EDIT_CARD}/${cardId}`)}
            >
              <EditIcon />
            </IconButton>
          )}
        
        </Box>
        <Box>
          {user && (
            <IconButton
              sx={{
                "&:hover": {
                  backgroundColor:localLike? "white" : "#d06b6b",
                  color: localLike ? "#d56c7c" : "white",
                },
                color: localLike ? "#d56c7c" : "inherit",
              }}
              aria-label="like"
              onClick={() => onLike(cardId)}
            >
              <FavoriteIcon />
            </IconButton>
          )}
        </Box>
      </CardActions>
    </>
  );
};

export default CardActionBar;
