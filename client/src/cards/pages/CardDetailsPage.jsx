import { Box, CardMedia, Container, Divider, Typography, TextField, Button, Rating } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useCards from '../hooks/useCards';
import { useUser } from '../../users/providers/UserProvider';

const CardDetailsPage = () => {
  const { id } = useParams();
  const { card, handleGetCard, handleAddReview } = useCards();
  const { user } = useUser();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    handleGetCard(id);
    // eslint-disable-next-line
  }, [id]);

  const isOwner = Boolean(user && card?.user_id && String(card.user_id) === String(user._id));
  const userHasReviewed = Boolean(
    user && card?.reviews?.some((review) => String(review.user_id) === String(user._id))
  );

  const handleSubmitReview = async (event) => {
    event.preventDefault();
    if (!user || isOwner) return;
    await handleAddReview(id, { rating, comment });
    setRating(0);
    setComment('');
  };

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
          <Typography color="#d06b6b" sx={{ textShadow: '1px 1px 1px black' }} mb={2} variant="h3">
            {card?.title}
          </Typography>
          <Box position="relative" display="flex" width={{ xs: '100%', sm: '50%' }} alignItems="center" justifyContent="center">
            <CardMedia
              sx={{ boxShadow: '1px 1px 15px 1px black', borderRadius: '8px', opacity: '1', minHeight: '250px', maxHeight: '600px' }}
              component="img"
              image={card?.image?.url}
              alt={card?.image?.alt}
            />
          </Box>
          <Box flexDirection="column" width={{ xs: '100%', sm: '50%' }} m={{ xs: 3, sm: 5 }} ml={{ xs: 0, sm: 5 }} display="flex" justifyContent="flex-start" alignItems="flex-start">
            <Typography sx={{ textShadow: '1px 1px 1px black' }} mb={3} variant="h5">
              {card?.subtitle}
            </Typography>
            <Typography>{card?.description}</Typography>
            <Box mb={2} mt={3}>
              <Typography variant="subtitle2" sx={{ color: '#d06b6b', fontWeight: 700, mb: 1 }}>
                דירוג המתכון
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <Rating name="card-rating" value={card?.averageRating || 0} precision={0.5} readOnly />
                <Typography variant="body2" sx={{ color: '#555' }}>
                  {card?.reviews?.length > 0
                    ? `דורג על ידי ${card.reviews.length} משתמש${card.reviews.length > 1 ? 'ים' : ''}`
                    : 'עדיין אין דירוגים'}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ height: '20px' }} />
            <Typography variant="h6" mt={3} mb={1}>
              המרכיבים:
            </Typography>
            {card?.ingredients?.split('\n').map((row, index) => (
              <Typography mt={1} key={index}>
                {index + 1} {row}
              </Typography>
            ))}
            <Typography variant="h6" mt={3} mb={1}>
              אופן ההכנה:
            </Typography>
            {card?.cookingSteps?.split('\n').map((row, index) => (
              <Typography mt={1} key={index}>
                {index + 1} {row}
              </Typography>
            ))}
            <Divider sx={{ height: '20px', mt: 4 }} />
            <Box mt={3} width="100%">
              <Typography variant="h5" mb={2}>
                כתבו ביקורת
              </Typography>
              {user ? (
                isOwner ? (
                  <Typography sx={{ color: '#d06b6b', fontWeight: 700 }}>
                    אינך יכול לדרג את המתכון שלך.
                  </Typography>
                ) : userHasReviewed ? (
                  <Typography sx={{ color: '#d06b6b', fontWeight: 700 }}>
                    כבר הגבת על המתכון הזה.
                  </Typography>
                ) : (
                  <Box component="form" onSubmit={handleSubmitReview}>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Rating
                        name="review-rating"
                        value={rating}
                        onChange={(event, newValue) => {
                          setRating(newValue);
                        }}
                      />
                      <Typography mr={2}>{rating || 'בחר דירוג'}</Typography>
                    </Box>
                    <TextField
                      fullWidth
                      multiline
                      minRows={3}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="כתבו את הביקורת שלכם..."
                      sx={{ mb: 2 }}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        backgroundColor: '#d06b6b',
                        color: '#fff',
                        textTransform: 'none',
                        '&:hover': {
                          backgroundColor: '#b5585a',
                        },
                      }}
                    >
                      שלח ביקורת
                    </Button>
                  </Box>
                )
              ) : (
                <Typography>אנא התחברו כדי לכתוב ביקורת.</Typography>
              )}
            </Box>
            {card?.reviews?.length > 0 && (
              <Box mt={4} width="100%">
                <Typography variant="h5" mb={2}>
                  ביקורות
                </Typography>
                {card.reviews.map((review, index) => (
                  <Box key={index} mb={2} p={2} sx={{ backgroundColor: '#f5f5f5', borderRadius: 2 }}>
                    <Box display="flex" alignItems="center" mb={1}>
                      <Rating value={review.rating || 0} readOnly size="small" />
                    </Box>
                    <Typography>{review.comment}</Typography>
                  </Box>
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