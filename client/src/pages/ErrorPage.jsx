import React from "react";
import Container from "@mui/material/Container";
import PageHeader from "./../components/PageHeader";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import ROUTES from "./../routes/routesModel";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <PageHeader title="Error 404" subtitle="Page not found" />

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Typography variant="h5" color="initial">
            Oops... The requested URL was not found on this server
          </Typography>
          <Grid item xs={12} md={4} justifyContent="center">
            <img
              width="100%"
              src="/assets/images/error.jpg"
              alt="broken robot"
            />
          </Grid>
          <Button
            variant="text"
            color="primary"
            class="returnButton"
            onClick={() => navigate(ROUTES.CARDS)}
          >
            Return me to the home page...{" "}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ErrorPage;
