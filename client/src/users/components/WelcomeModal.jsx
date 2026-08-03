import React, { useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useUser } from '../providers/UserProvider';
import { useTheme } from '../../providers/ThemeProvider';

export default function WelcomeModal() {
  const { welcomeUser, setWelcomeUser } = useUser();
  const { isDark } = useTheme();
  const isOpen = Boolean(welcomeUser);

  useEffect(() => {
    if (!isOpen) return undefined;
    const timer = setTimeout(() => setWelcomeUser(null), 3000);
    return () => clearTimeout(timer);
  }, [isOpen, welcomeUser, setWelcomeUser]);

  return (
    <Modal
      open={isOpen}
      onClose={() => setWelcomeUser(null)}
      closeAfterTransition
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}
    >
      <Fade in={isOpen}>
        <Box
          sx={{
            outline: 'none',
            textAlign: 'center',
            borderRadius: '20px',
            px: 5,
            py: 4,
            maxWidth: '90vw',
            backgroundColor: isDark ? '#2b2b2b' : '#fff',
            color: isDark ? '#f0f0f0' : '#000',
            boxShadow: '0 10px 40px rgba(0,0,0,0.35)',
          }}
        >
          <EmojiEmotionsIcon sx={{ fontSize: 56, color: '#d06b6b', mb: 1 }} />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            שלום, {welcomeUser?.first} {welcomeUser?.last}!
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            כיף שאת/ה כאן
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
}
