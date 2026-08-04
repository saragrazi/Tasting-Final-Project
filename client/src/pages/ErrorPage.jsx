import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import ROUTES from "./../routes/routesModel";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Container
      sx={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: 2,
        py: 6,
      }}
    >
      <Box
        component="img"
        src="/assets/images/error.jpg"
        alt="404 - הדף לא נמצא"
        sx={{ width: { xs: "60%", sm: 260 }, maxWidth: 320, mb: 2 }}
      />
      <Typography variant="h2" sx={{ color: "#d06b6b", fontWeight: 700 }}>
        שגיאה 404
      </Typography>
      <Typography variant="h5">אופס, הדף הזה לא קיים</Typography>
      <Typography color="text.secondary" sx={{ maxWidth: 420 }}>
        אולי הכתובת הוקלדה לא נכון, או שהדף פשוט לא כאן. בואו נחזור למשהו טעים יותר.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<HomeIcon />}
        onClick={() => navigate(ROUTES.CARDS)}
        sx={{ mt: 2 }}
      >
        חזרה לדף הבית
      </Button>
    </Container>
  );
};

export default ErrorPage;
