import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Chip,
  Button,
  Divider,
  Link as MuiLink,
} from "@mui/material";
import PageHeader from "../../components/PageHeader";
import Spinner from "../../components/Spinner";
import { useUser } from "../providers/UserProvider";
import { useTheme } from "../../providers/ThemeProvider";
import useUsers from "../hooks/useUsers";
import { getCards } from "../../cards/services/cardService";
import ROUTES from "../../routes/routesModel";
import DeleteModal from "../../cards/components/DeleteModal";
import { getCardPath } from "../../cards/helpers/cardUrl";

const UsersManagementPage = () => {
  const { user } = useUser();
  const { isDark } = useTheme();
  const { users, pending, handleGetUsers, handleBlockUser, handleDeleteUser } = useUsers();
  const [cards, setCards] = useState([]);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    handleGetUsers();
    getCards().then(setCards).catch(() => setCards([]));
    // eslint-disable-next-line
  }, []);

  if (!user || !user.isAdmin) return <Navigate replace to={ROUTES.CARDS} />;

  const cardsByUser = (userId) => cards.filter((card) => String(card.user_id) === String(userId));

  return (
    <Container sx={{ direction: "rtl", textAlign: "right", minHeight: "80vh" }}>
      <PageHeader
        title="ניהול משתמשים"
        subtitle={`צפייה בכל המשתמשים, המתכונים שלהם, וחסימת משתמשים${users ? ` (סה"כ ${users.length} משתמשים)` : ""}`}
      />

      {pending && <Spinner />}

      {!pending && users?.map((u) => {
        const userCards = cardsByUser(u._id);
        const isSelf = String(u._id) === String(user._id);

        return (
          <Box
            key={u._id}
            mb={2}
            p={2}
            sx={{
              backgroundColor: u.isBlocked
                ? (isDark ? "rgba(229,62,62,0.15)" : "#fdecea")
                : (isDark ? "rgba(255,255,255,0.08)" : "#f5f5f5"),
              borderRadius: 2,
              border: u.isBlocked ? "1px solid #e53e3e" : "1px solid transparent",
            }}
          >
            <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={1}>
              <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                <Typography sx={{ fontWeight: 700 }}>
                  {u.name?.first} {u.name?.last}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {u.email}
                </Typography>
                {u.isAdmin && <Chip label="מנהל" size="small" color="secondary" />}
                {u.isBusiness && <Chip label="עסק" size="small" color="success" />}
                {u.isBlocked && <Chip label="חסום" size="small" sx={{ backgroundColor: "#e53e3e", color: "#fff" }} />}
              </Box>

              {!isSelf && (
                <Box display="flex" gap={1}>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => handleBlockUser(u._id, !u.isBlocked)}
                    sx={{
                      backgroundColor: u.isBlocked ? "#457127" : "#e53e3e",
                      "&:hover": { backgroundColor: u.isBlocked ? "#365a1e" : "#c53030" },
                    }}
                  >
                    {u.isBlocked ? "בטל חסימה" : "חסום משתמש"}
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => setUserIdToDelete(u._id)}
                    sx={{
                      color: "#e53e3e",
                      borderColor: "#e53e3e",
                      "&:hover": { backgroundColor: "rgba(229,62,62,0.08)", borderColor: "#c53030" },
                    }}
                  >
                    מחק משתמש
                  </Button>
                </Box>
              )}
            </Box>

            <Divider sx={{ my: 1 }} />

            <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
              מתכונים שנכתבו על ידי משתמש זה ({userCards.length}):
            </Typography>
            {userCards.length > 0 ? (
              <Box display="flex" flexDirection="column" gap={0.5}>
                {userCards.map((card) => (
                  <MuiLink
                    key={card._id}
                    component="button"
                    underline="hover"
                    sx={{ textAlign: "right" }}
                    onClick={() => navigate(getCardPath(card))}
                  >
                    {card.title}
                  </MuiLink>
                ))}
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary">
                אין מתכונים
              </Typography>
            )}
          </Box>
        );
      })}

      <DeleteModal
        isOpen={Boolean(userIdToDelete)}
        onClose={() => setUserIdToDelete(null)}
        onConfirm={() => {
          handleDeleteUser(userIdToDelete);
          setUserIdToDelete(null);
        }}
        title="מחיקת משתמש"
        message="האם אתה בטוח שברצונך למחוק את המשתמש הזה? הפעולה אינה הפיכה."
      />
    </Container>
  );
};

export default UsersManagementPage;
