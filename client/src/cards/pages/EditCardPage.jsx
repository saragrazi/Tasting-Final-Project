import React, { useEffect } from "react";
import useCards from "../hooks/useCards";
import { useUser } from "../../users/providers/UserProvider";
import useForm from "../../forms/hooks/useForm";
import initialCardForm from "../helpers/initialForms/initialCardForm";
import { EditcardSchema } from "../models/joi-schema/cardSchema";
import ROUTES from "../../routes/routesModel";
import { Navigate, useParams } from "react-router-dom";
import { Container } from "@mui/material";
import CardForm from "../components/CardForm";
import { getCard } from "../services/cardService";

// eslint-disable-next-line
const EditCardPage = () => {
  const { handleUpdateCard, setCardId } = useCards();
  const params = useParams()
  // eslint-disable-next-line
  const { user } = useUser();
  const { value, ...rest } = useForm(
    initialCardForm,
    EditcardSchema,
    handleUpdateCard,
  );

  useEffect(() => {
    const cardData = async () => {
      const card = await getCard(params.id)
      setCardId(card._id)
      const ingredients = Array.isArray(card.ingredients)
        ? card.ingredients.map((ingredient) => ({
            name: ingredient.name,
            quantity: ingredient.quantity ?? null,
          }))
        : (card.ingredients || '')
            .split('\n')
            .map((line) => line.trim())
            .filter(Boolean)
            .map((name) => ({ name, quantity: null }));
      rest.setData({
        title: card.title,
        subtitle: card.subtitle,
        ingredients,
        cookingSteps: card.cookingSteps,
        category: card.category,
        prepTime: card.prepTime,
        measuringCup: card.measuringCup,
        tips: card.tips,
        videoLink: card.videoLink || "",
        user_id: card.user_id,
        isPrivate: Boolean(card.isPrivate),
      })
    }
    cardData()
    // eslint-disable-next-line
  }, [])

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
      <CardForm
        multiline={false}
        title="ערוך מתכון"
        onSubmit={rest.onSubmit}
        onReset={rest.handleReset}
        errors={value.errors}
        onFormChange={rest.validateForm}
        onInputChange={rest.handleChange}
        onInputBlur={rest.handleBlur}
        handleFileUpload={rest.handleFileUpload}
        data={value.data}
      />
    </Container>
  );
};

export default EditCardPage;