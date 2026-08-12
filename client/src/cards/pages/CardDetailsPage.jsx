import { Box, CardMedia, Chip, Container, Divider, Typography, TextField, Button, Rating, Grid, Modal, Backdrop, IconButton } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Joi from 'joi';

import useCards from '../hooks/useCards';
import { useUser } from '../../users/providers/UserProvider';
import { useSnack } from '../../providers/SnackbarProvider';
import formatPrepTime from '../helpers/formatPrepTime';
import CommentThread from '../components/CommentThread';
import { commentSchema } from '../models/joi-schema/commentSchema';
import { validateOptions } from '../../forms/utils/joiValidationOptions';
import ROUTES from '../../routes/routesModel';

const commentTextSchema = Joi.object({ text: commentSchema.text });

const validateCommentText = (text) => {
  const { error } = commentTextSchema.validate({ text }, validateOptions);
  return error ? error.details[0].message : null;
};

const CardDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { card, handleGetCard, handleAddRating, handleAddComment, handleDeleteComment } = useCards();
  const { user } = useUser();
  const { setSnack } = useSnack();
  const [rating, setRating] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    if (id) {
      handleGetCard(id).finally(() => setInitializing(false));
    } else {
      setInitializing(false);
    }
    // eslint-disable-next-line
  }, [id]);

  const isOwner = Boolean(user && card?.user_id && String(card.user_id) === String(user._id));
  const userHasRated = Boolean(
    user && card?.ratings?.some((r) => String(r.user_id) === String(user._id))
  );
  const userHasCommented = Boolean(
    user && !user.isAdmin && card?.comments?.some((c) => !c.parentCommentId && String(c.user_id) === String(user._id))
  );

  const handleSubmitRating = async (event) => {
    event.preventDefault();
    if (!user || isOwner || !rating) return;
    await handleAddRating(id, rating);
    setRating(0);
  };

  const handleSubmitComment = async (event) => {
    event.preventDefault();
    if (!user || validateCommentText(commentText)) return;
    setIsSubmittingComment(true);
    try {
      await handleAddComment(id, { text: commentText.trim(), parentCommentId: null });
      setCommentText('');
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleReply = async (parentCommentId, text) => {
    await handleAddComment(id, { text, parentCommentId });
  };

  const handleDeleteCommentClick = async (commentId) => {
    await handleDeleteComment(id, commentId);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setSnack('success', 'הקישור למתכון הועתק!');
    } catch (err) {
      setSnack('error', 'העתקת הקישור נכשלה');
    }
  };

  const topLevelComments = card?.comments?.filter((c) => !c.parentCommentId) || [];
  const repliesFor = (commentId) =>
    card?.comments?.filter((c) => String(c.parentCommentId) === String(commentId)) || [];

  const metaFields = [
    card?.prepTime && {
      icon: <AccessTimeIcon fontSize="small" sx={{ color: '#d06b6b' }} />,
      text: `זמן הכנה: ${formatPrepTime(card.prepTime)}`,
    },
    card?.authorName && {
      icon: <PersonIcon fontSize="small" sx={{ color: '#d06b6b' }} />,
      text: `נכתב על ידי: ${card.authorName}`,
    },
    card?.createdAt && {
      icon: <EventIcon fontSize="small" sx={{ color: '#d06b6b' }} />,
      text: `נכתב בתאריך: ${new Date(card.createdAt).toLocaleDateString('he-IL')}`,
    },
    card?.measuringCup && {
      icon: <LocalCafeIcon fontSize="small" sx={{ color: '#d06b6b' }} />,
      text: `כוס מדידה: ${card.measuringCup}`,
      fullWidth: true,
    },
  ].filter(Boolean);

  if (!initializing && !card) {
    return (
      <Container maxWidth="sm" sx={{ direction: 'rtl', textAlign: 'center', mt: 6 }}>
        <Typography variant="h5" sx={{ color: '#d06b6b', mb: 2 }}>
          המתכון הזה פרטי
        </Typography>
        <Typography color="text.secondary" mb={3}>
          רק מי שיצר את המתכון יכול לצפות בו. ייתכן גם שהמתכון הוסר או שהקישור אינו תקין.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate(ROUTES.CARDS)}
          sx={{ backgroundColor: '#d06b6b', '&:hover': { backgroundColor: '#b5585a' } }}
        >
          למתכונים אחרים
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ direction: 'rtl', textAlign: 'right' }}>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          direction: 'rtl',
          textAlign: 'right',
        }}
      >
        <Box mt={2} display="flex" alignItems="center" flexDirection={{ xs: 'column', sm: 'column' }}>
          {/* תמונת המתכון */}
          {card?.isPrivate && (
            <Chip label="פרטי - לא לפרסום" size="small" sx={{ mb: 1, backgroundColor: '#d06b6b', color: '#fff' }} />
          )}
          <Box position="relative" display="flex" width={{ xs: '100%', sm: '50%' }} alignItems="center" justifyContent="center">
            <CardMedia
              sx={{
                boxShadow: '1px 1px 15px 1px black',
                borderRadius: '8px',
                opacity: '1',
                minHeight: '250px',
                maxHeight: '600px',
                cursor: 'pointer',
                transition: 'transform 0.25s ease',
                '&:hover': { transform: 'scale(1.02)' },
              }}
              component="img"
              image={card?.image?.url}
              alt={card?.image?.alt}
              onClick={() => setLightboxOpen(true)}
            />
          </Box>

          {/* כותרת */}
          <Typography color="#d06b6b" sx={{ textShadow: '1px 1px 1px black' }} mt={2} mb={1} variant="h3">
            {card?.title}
          </Typography>

          <Modal
            open={lightboxOpen}
            onClose={() => setLightboxOpen(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              sx: {
                backgroundColor: 'rgba(0,0,0,0.55)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              },
            }}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}
          >
            <Box
              sx={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh', outline: 'none' }}
              onClick={() => setLightboxOpen(false)}
            >
              <IconButton
                onClick={() => setLightboxOpen(false)}
                sx={{
                  position: 'absolute',
                  top: -18,
                  right: -18,
                  backgroundColor: '#fff',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                  '&:hover': { backgroundColor: '#f0f0f0' },
                }}
              >
                <CloseIcon />
              </IconButton>
              <Box
                component="img"
                src={card?.image?.url}
                alt={card?.image?.alt}
                onClick={(event) => event.stopPropagation()}
                sx={{
                  maxWidth: '90vw',
                  maxHeight: '90vh',
                  borderRadius: '12px',
                  boxShadow: '0 0 40px rgba(0,0,0,0.6)',
                  display: 'block',
                }}
              />
            </Box>
          </Modal>

          <Box
            flexDirection="column"
            width={{ xs: '100%', sm: '50%' }}
            mt={{ xs: 1, sm: 1 }}
            mb={{ xs: 3, sm: 5 }}
            mr={{ xs: 3, sm: 5 }}
            ml={{ xs: 0, sm: 5 }}
            display="flex"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            {/* תאור קצר */}
            <Typography sx={{ textShadow: '1px 1px 1px black' }} mb={1} variant="h5">
              {card?.subtitle}
            </Typography>

            {/* העתקת קישור למתכון */}
            <Box
              onClick={handleCopyLink}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleCopyLink(); }}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
                mb: 3,
                cursor: 'pointer',
                color: 'text.secondary',
                userSelect: 'none',
                '&:hover': { color: '#d06b6b' },
              }}
            >
              <ContentCopyIcon sx={{ fontSize: 15 }} />
              <Typography variant="caption">העתקת קישור למתכון</Typography>
            </Box>

            {/* שורת הדירוגים הקיימים - ללא כותרת */}
            <Box display="flex" alignItems="center" gap={1} mb={3}>
              <Rating name="card-rating" value={card?.averageRating || 0} precision={0.5} readOnly />
              <Typography variant="body2" color="text.secondary">
                {card?.ratings?.length > 0
                  ? `דורג על ידי ${card.ratings.length} משתמש${card.ratings.length > 1 ? 'ים' : ''}`
                  : 'עדיין אין דירוגים'}
              </Typography>
            </Box>

            <Divider sx={{ width: '100%', mb: 3 }} />

            {/* 4 השדות - תמיד 2 בכל שורה */}
            <Grid container spacing={1.5} mb={2}>
              {metaFields.map((field, index) => (
                <Grid item xs={field.fullWidth ? 12 : 6} key={index}>
                  <Box display="flex" alignItems="center" gap={0.5}>
                    {field.icon}
                    <Typography variant="body2" sx={{ whiteSpace: 'nowrap' }}>
                      {field.text}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Divider sx={{ height: '20px', width: '100%' }} />

            {/* מרכיבים */}
            <Typography variant="h6" mt={3} mb={1}>
              המרכיבים:
            </Typography>
            {Array.isArray(card?.ingredients)
              ? card.ingredients.map((ingredient, index) => (
                  <Box key={index} display="flex" alignItems="flex-start" gap={1} mt={1}>
                    <CheckCircleIcon fontSize="small" sx={{ color: '#4caf50', mt: '2px' }} />
                    <Typography>
                      {ingredient.quantity !== null && ingredient.quantity !== undefined
                        ? `${ingredient.quantity} `
                        : ''}
                      {ingredient.name}
                    </Typography>
                  </Box>
                ))
              : card?.ingredients
                  ?.split('\n')
                  .filter(Boolean)
                  .map((row, index) => (
                    <Box key={index} display="flex" alignItems="flex-start" gap={1} mt={1}>
                      <CheckCircleIcon fontSize="small" sx={{ color: '#4caf50', mt: '2px' }} />
                      <Typography>{row}</Typography>
                    </Box>
                  ))}

            {/* אופן ההכנה */}
            <Typography variant="h6" mt={3} mb={1}>
              אופן ההכנה:
            </Typography>
            {card?.cookingSteps?.split('\n').filter(Boolean).map((row, index) => (
              <Typography mt={1} key={index}>
                <Typography component="span" fontWeight={700}>
                  {index + 1}.
                </Typography>{' '}
                {row}
              </Typography>
            ))}

            {/* טיפים */}
            {Boolean(card?.tips) && (
              <>
                <Typography variant="h6" mt={3} mb={1}>
                  טיפים:
                </Typography>
                {card.tips.split('\n').filter(Boolean).map((row, index) => (
                  <Typography mt={1} key={index}>
                    {row}
                  </Typography>
                ))}
              </>
            )}

            {Boolean(card?.videoLink) && (
              <Box mt={3}>
                <Button
                  href={card.videoLink}
                  target="_blank"
                  rel="noreferrer"
                  variant="outlined"
                  sx={{
                    color: '#d06b6b',
                    borderColor: '#d06b6b',
                    textTransform: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    '&:hover': { borderColor: '#b5585a', backgroundColor: 'rgba(208,107,107,0.08)' },
                  }}
                >
                  <OndemandVideoIcon fontSize="small" />
                  צפו בסרטון ההכנה
                </Button>
              </Box>
            )}

            <Divider sx={{ height: '20px', mt: 4, width: '100%' }} />

            {/* דרוג המתכון - כותרת + אפשרות לדרג */}
            <Box mb={2} mt={3} width="100%">
              <Typography variant="subtitle2" sx={{ color: '#d06b6b', fontWeight: 700, mb: 1 }}>
                דירוג המתכון
              </Typography>
              {user && (
                isOwner ? (
                  <Typography variant="body2" sx={{ color: '#d06b6b', mt: 1 }}>
                    אינך יכול לדרג את המתכון שלך.
                  </Typography>
                ) : userHasRated ? (
                  <Typography variant="body2" sx={{ color: '#d06b6b', mt: 1 }}>
                    כבר דירגת את המתכון הזה.
                  </Typography>
                ) : (
                  <Box component="form" onSubmit={handleSubmitRating} mt={1} display="flex" alignItems="center" gap={2}>
                    <Rating
                      name="new-rating"
                      value={rating}
                      onChange={(event, newValue) => setRating(newValue)}
                    />
                    <Button
                      type="submit"
                      size="small"
                      variant="contained"
                      disabled={!rating}
                      sx={{ backgroundColor: '#d06b6b', '&:hover': { backgroundColor: '#b5585a' } }}
                    >
                      שלח דירוג
                    </Button>
                  </Box>
                )
              )}
              {!user && (
                <Typography variant="body2" color="text.secondary" mt={1}>
                  אנא התחברו כדי לדרג את המתכון.
                </Typography>
              )}
            </Box>

            <Divider sx={{ height: '20px', width: '100%' }} />

            {/* תגובות */}
            <Box mt={3} width="100%">
              <Typography variant="h5" mb={2}>
                כתבו תגובה
              </Typography>
              {user ? (
                userHasCommented ? (
                  <Typography sx={{ color: '#d06b6b', fontWeight: 700 }}>
                    כבר כתבת תגובה על המתכון הזה.
                  </Typography>
                ) : (
                  <Box component="form" onSubmit={handleSubmitComment}>
                    <TextField
                      fullWidth
                      multiline
                      minRows={3}
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="כתבו את התגובה שלכם..."
                      sx={{ mb: 2 }}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isSubmittingComment || Boolean(validateCommentText(commentText))}
                      sx={{
                        backgroundColor: '#d06b6b',
                        color: '#fff',
                        textTransform: 'none',
                        '&:hover': {
                          backgroundColor: '#b5585a',
                        },
                      }}
                    >
                      {isSubmittingComment ? <CircularProgress size={22} color="inherit" /> : 'שלח תגובה'}
                    </Button>
                  </Box>
                )
              ) : (
                <Typography>אנא התחברו כדי לכתוב תגובה.</Typography>
              )}
            </Box>
            {topLevelComments.length > 0 && (
              <Box mt={4} width="100%">
                <Typography variant="h5" mb={2}>
                  תגובות
                </Typography>
                {topLevelComments.map((comment) => (
                  <CommentThread
                    key={comment._id}
                    comment={comment}
                    replies={repliesFor(comment._id)}
                    card={card}
                    user={user}
                    onReply={handleReply}
                    onDelete={handleDeleteCommentClick}
                  />
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Container>
  );
};

export default CardDetailsPage;
