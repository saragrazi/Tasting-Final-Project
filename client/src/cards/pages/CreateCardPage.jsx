import React from "react";
import useCards from "../hooks/useCards";
import { useUser } from "../../users/providers/UserProvider";
import useForm from "../../forms/hooks/useForm";
import initialCardForm from "../helpers/initialForms/initialCardForm";
import ROUTES from "../../routes/routesModel";
import { Navigate } from "react-router-dom";
import { Container } from "@mui/material";
import CardForm from "../components/CardForm";
import { cardSchema } from "../models/joi-schema/cardSchema";

const CreateCardPage = () => {
  const { handleCreateCard } = useCards();
  const { user } = useUser();
  const { value, ...rest } = useForm(
    initialCardForm,
    cardSchema,
    handleCreateCard
  );

  if (!user || !user.isBusiness) return <Navigate replace to={ROUTES.CARDS} />;

  return (
    <Container
      sx={{
        paddingTop: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CardForm
        title="Create Card"
        onSubmit={rest.onSubmit}
        onReset={rest.handleReset}
        errors={value.errors}
        onFormChange={rest.validateForm}
        onInputChange={rest.handleChange}
        handleFileUpload={rest.handleFileUpload}
        data={value.data}
      />
    </Container>
  );
};

export default CreateCardPage;