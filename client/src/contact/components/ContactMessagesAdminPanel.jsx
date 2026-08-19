import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "../../providers/ThemeProvider";
import { useSnack } from "../../providers/SnackbarProvider";
import Spinner from "../../components/Spinner";
import DeleteModal from "../../cards/components/DeleteModal";
import { getContactMessages, deleteContactMessage } from "../services/contactService";

const ContactMessagesAdminPanel = () => {
  const { isDark } = useTheme();
  const { setSnack } = useSnack();
  const [messages, setMessages] = useState(null);
  const [messageIdToDelete, setMessageIdToDelete] = useState(null);

  useEffect(() => {
    getContactMessages().then(setMessages).catch(() => setMessages([]));
  }, []);

  const handleDelete = async () => {
    const id = messageIdToDelete;
    setMessageIdToDelete(null);
    try {
      await deleteContactMessage(id);
      setMessages((prev) => prev.filter((m) => m._id !== id));
    } catch (error) {
      setSnack("error", error || "לא ניתן היה למחוק את הפנייה כרגע");
    }
  };

  if (!messages) return <Spinner />;

  if (messages.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        אין פניות חדשות.
      </Typography>
    );
  }

  return (
    <Box>
      {messages.map((message) => (
        <Box
          key={message._id}
          mb={2}
          p={2}
          sx={{
            backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "#f5f5f5",
            borderRadius: 2,
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={1}>
            <Box>
              <Typography sx={{ fontWeight: 700 }}>{message.subject}</Typography>
              <Typography variant="body2" color="text.secondary">
                {message.name} · {message.email}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(message.createdAt).toLocaleString("he-IL")}
              </Typography>
            </Box>
            <IconButton
              aria-label="מחק פנייה"
              onClick={() => setMessageIdToDelete(message._id)}
              sx={{ "&:hover": { backgroundColor: "#d06b6b", color: "white" } }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
            {message.message}
          </Typography>
        </Box>
      ))}

      <DeleteModal
        isOpen={Boolean(messageIdToDelete)}
        onClose={() => setMessageIdToDelete(null)}
        onConfirm={handleDelete}
        title="מחיקת פנייה"
        message="האם אתה בטוח שברצונך למחוק את הפנייה הזו?"
      />
    </Box>
  );
};

export default ContactMessagesAdminPanel;
