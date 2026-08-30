import React, { useState } from "react";
import { Box, Typography, TextField, Button, Chip, IconButton, CircularProgress } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { array, func, object } from "prop-types";
import Joi from "joi";
import { useTheme } from "../../providers/ThemeProvider";
import { commentSchema } from "../models/joi-schema/commentSchema";
import { validateOptions } from "../../forms/utils/joiValidationOptions";

const commentTextSchema = Joi.object({ text: commentSchema.text });

const validateCommentText = (text) => {
  const { error } = commentTextSchema.validate({ text }, validateOptions);
  return error ? error.details[0].message : null;
};

const AuthorLabel = ({ name, isOwner }) => (
  <Box display="flex" alignItems="center" gap={1}>
    <Typography sx={{ fontWeight: 700 }}>{name}</Typography>
    {isOwner && (
      <Chip
        label="יוצר המתכון"
        size="small"
        sx={{ height: 18, fontSize: "0.65rem", backgroundColor: "#d06b6b", color: "#fff" }}
      />
    )}
  </Box>
);

const CommentThread = ({ comment, replies, card, user, onReply, onDelete }) => {
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);
  const [deletingCommentId, setDeletingCommentId] = useState(null);
  const { isDark } = useTheme();

  const recipeOwnerId = String(card.user_id);
  const commentAuthorId = String(comment.user_id);
  const canReply = Boolean(user);
  const isAdmin = Boolean(user?.isAdmin);

  const handleDeleteComment = async (commentId) => {
    setDeletingCommentId(commentId);
    try {
      await onDelete(commentId);
    } finally {
      setDeletingCommentId(null);
    }
  };

  const handleSubmitReply = async (event) => {
    event.preventDefault();
    if (validateCommentText(replyText)) return;
    setIsSubmittingReply(true);
    try {
      await onReply(comment._id, replyText.trim());
      setReplyText("");
      setReplyOpen(false);
    } finally {
      setIsSubmittingReply(false);
    }
  };

  return (
    <Box mb={2} p={2} sx={{ backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "#f5f5f5", borderRadius: 2 }}>
      <Box display="flex" alignItems="flex-start" justifyContent="space-between">
        <AuthorLabel name={comment.authorName} isOwner={commentAuthorId === recipeOwnerId} />
        {isAdmin && (
          <IconButton
            size="small"
            title="מחק תגובה"
            aria-label="מחק תגובה"
            onClick={() => handleDeleteComment(comment._id)}
            disabled={deletingCommentId === comment._id}
            sx={{ color: "#d06b6b" }}
          >
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
      <Typography mt={0.5}>{comment.text}</Typography>
      <Typography variant="caption" color="text.secondary">
        {new Date(comment.createdAt).toLocaleDateString("he-IL")}
      </Typography>

      {canReply && (
        <Box mt={1}>
          <Button size="small" onClick={() => setReplyOpen((prev) => !prev)} sx={{ color: "#d06b6b" }}>
            {replyOpen ? "ביטול" : "הגב"}
          </Button>
          {replyOpen && (
            <Box component="form" onSubmit={handleSubmitReply} mt={1}>
              <TextField
                fullWidth
                size="small"
                multiline
                minRows={2}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="כתבו תגובה..."
                sx={{ mb: 1, backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "#fff" }}
              />
              <Button
                type="submit"
                size="small"
                variant="contained"
                disabled={isSubmittingReply || Boolean(validateCommentText(replyText))}
                sx={{ backgroundColor: "#d06b6b", "&:hover": { backgroundColor: "#b5585a" } }}
              >
                {isSubmittingReply ? <CircularProgress size={18} color="inherit" /> : "שלח"}
              </Button>
            </Box>
          )}
        </Box>
      )}

      {replies?.length > 0 && (
        <Box mt={2} pr={3} sx={{ borderRight: "2px solid #d06b6b" }}>
          {replies.map((reply) => (
            <Box key={reply._id} mb={1.5}>
              <Box display="flex" alignItems="flex-start" justifyContent="space-between">
                <AuthorLabel name={reply.authorName} isOwner={String(reply.user_id) === recipeOwnerId} />
                {isAdmin && (
                  <IconButton
                    size="small"
                    title="מחק תגובת תשובה"
                    aria-label="מחק תגובת תשובה"
                    onClick={() => handleDeleteComment(reply._id)}
                    disabled={deletingCommentId === reply._id}
                    sx={{ color: "#d06b6b" }}
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
              <Typography mt={0.5}>{reply.text}</Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(reply.createdAt).toLocaleDateString("he-IL")}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

CommentThread.propTypes = {
  comment: object.isRequired,
  replies: array,
  card: object.isRequired,
  user: object,
  onReply: func.isRequired,
  onDelete: func.isRequired,
};

CommentThread.defaultProps = {
  replies: [],
  user: null,
};

export default CommentThread;
