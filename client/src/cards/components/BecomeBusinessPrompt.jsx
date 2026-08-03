import React from "react";
import { Box, Typography, Button } from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import useUsers from "../../users/hooks/useUsers";

const BecomeBusinessPrompt = () => {
  const { handleBecomeBusiness } = useUsers();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      gap={2}
      py={8}
    >
      <RestaurantMenuIcon sx={{ fontSize: 56, color: "#d06b6b" }} />
      <Typography variant="h6">רוצה להוסיף מתכונים משלך?</Typography>
      <Typography color="text.secondary" sx={{ maxWidth: 420 }}>
        רק חשבונות עסקיים יכולים להעלות ולפרסם מתכונים. אפשר להפוך לחשבון
        עסקי בלחיצה אחת, בכל שלב - ולהתחיל להעלות מתכונים מיד.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleBecomeBusiness}
      >
        הפוך לחשבון עסקי
      </Button>
    </Box>
  );
};

export default BecomeBusinessPrompt;
