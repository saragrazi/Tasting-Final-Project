import React, { useCallback, useState } from "react";
import useCards from "../hooks/useCards";
import { useUser } from "../../users/providers/UserProvider";
import useForm from "../../forms/hooks/useForm";
import initialCardForm from "../helpers/initialForms/initialCardForm";
import ROUTES from "../../routes/routesModel";
import { Navigate } from "react-router-dom";
import { Container } from "@mui/material";
import CardForm from "../components/CardForm";
import { cardSchema } from "../models/joi-schema/cardSchema";
import Seo from "../../components/Seo";

const CreateCardPage = () => {
  const { handleCreateCard } = useCards();
  const { user } = useUser();
  const [newImages, setNewImages] = useState([]);

  const handleSubmitCard = useCallback(
    (cardData) => handleCreateCard(cardData, newImages),
    [handleCreateCard, newImages]
  );

  const { value, ...rest } = useForm(
    initialCardForm,
    cardSchema,
    handleSubmitCard
  );

  if (!user) return <Navigate replace to={ROUTES.CARDS} />;

  return (
    <Container
      sx={{
        paddingTop: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        direction: "rtl",
      }}
    >
      <Seo title="יצירת מתכון חדש" path={ROUTES.CREATE_CARD} noindex />
      <CardForm
        title="צור מתכון"
        submitLabel="פרסם מתכון"
        to={ROUTES.MY_CARDS}
        onSubmit={rest.onSubmit}
        onReset={rest.handleReset}
        errors={value.errors}
        onFormChange={rest.validateForm}
        onInputChange={rest.handleChange}
        onInputBlur={rest.handleBlur}
        data={value.data}
        pending={rest.pending}
        newImages={newImages}
        onNewImagesChange={setNewImages}
      />
    </Container>
  );
};

export default CreateCardPage;