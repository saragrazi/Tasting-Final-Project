import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Chip,
  Button,
  Divider,
  Link as MuiLink,
  Tabs,
  Tab,
} from "@mui/material";
import Spinner from "../../components/Spinner";
import { useUser } from "../providers/UserProvider";
import { useTheme } from "../../providers/ThemeProvider";
import useUsers from "../hooks/useUsers";
import { getCards } from "../../cards/services/cardService";
import { getContactMessages } from "../../contact/services/contactService";
import DeleteModal from "../../cards/components/DeleteModal";
import { getCardPath } from "../../cards/helpers/cardUrl";
import ContactMessagesAdminPanel from "../../contact/components/ContactMessagesAdminPanel";
import ReportsAdminPanel from "../../cards/components/ReportsAdminPanel";
import ErrorPage from "../../pages/ErrorPage";
import Seo from "../../components/Seo";
import ROUTES from "../../routes/routesModel";

const UsersManagementPage = () => {
  const { user } = useUser();
  const { isDark } = useTheme();
  const isAdmin = Boolean(user?.isAdmin);
  const { users, pending, handleGetUsers, handleBlockUser, handleDeleteUser, blockingUserId } = useUsers();
  const [cards, setCards] = useState([]);
  const [contactCount, setContactCount] = useState(null);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) return;
    handleGetUsers();
    getCards().then(setCards).catch(() => setCards([]));
    getContactMessages().then((messages) => setContactCount(messages.length)).catch(() => setContactCount(0));
    // eslint-disable-next-line
  }, [isAdmin]);

  if (!user || !isAdmin) return <ErrorPage />;

  const cardsByUser = (userId) => cards.filter((card) => String(card.user_id) === String(userId));
  const reportsCount = cards.reduce((count, card) => count + (card.reports?.length || 0), 0);

  return (
    <Container sx={{ direction: "rtl", textAlign: "right", minHeight: "80vh" }}>
      <Seo title="ניהול משתמשים" path={ROUTES.USERS_MANAGEMENT} noindex />
      <Typography variant="h4" sx={{ fontWeight: 700, textAlign: "center", my: 3 }}>
        ניהול
      </Typography>

      <Tabs
        value={activeTab}
        onChange={(e, newValue) => setActiveTab(newValue)}
        sx={{ mb: 2 }}
        textColor="inherit"
        TabIndicatorProps={{ style: { backgroundColor: "#d06b6b" } }}
      >
        <Tab label={`משתמשים${users ? ` (${users.length})` : ""}`} />
        <Tab label={`פניות${contactCount !== null ? ` (${contactCount})` : ""}`} />
        <Tab label={`דיווחים (${reportsCount})`} />
      </Tabs>

      {activeTab === 1 && <ContactMessagesAdminPanel />}
      {activeTab === 2 && <ReportsAdminPanel cards={cards} setCards={setCards} />}

      {activeTab === 0 && (
        <>
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
                    disabled={blockingUserId === u._id}
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
        </>
      )}
    </Container>
  );
};

export default UsersManagementPage;
