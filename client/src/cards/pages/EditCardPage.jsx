import React, { useCallback, useEffect, useState } from "react";
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
import Seo from "../../components/Seo";

// eslint-disable-next-line
const EditCardPage = () => {
  const { handleUpdateCard, setCardId } = useCards();
  const params = useParams()
  // eslint-disable-next-line
  const { user } = useUser();
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  const handleSubmitCard = useCallback(
    (cardData) => handleUpdateCard({ ...cardData, existingImages }, newImages),
    [handleUpdateCard, existingImages, newImages]
  );

  const { value, ...rest } = useForm(
    initialCardForm,
    EditcardSchema,
    handleSubmitCard,
  );

  useEffect(() => {
    const cardData = async () => {
      const card = await getCard(params.id)
      setCardId(card._id)
      setExistingImages(card.images?.length ? card.images : (card.image ? [card.image] : []))
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
        inspiredBy: card.inspiredBy || "",
        ingredients,
        cookingSteps: card.cookingSteps,
        category: card.category,
        prepTime: card.prepTime,
        measuringCup: card.measuringCup,
        tips: card.tips,
        videoLink: card.videoLink || "",
        user_id: card.user_id,
        isPrivate: Boolean(card.isPrivate),
        contentPolicyAccepted: true,
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
      <Seo title="עריכת מתכון" path={`${ROUTES.EDIT_CARD}/${params.id}`} noindex />
      <CardForm
        multiline={false}
        title="ערוך מתכון"
        submitLabel="עדכן מתכון"
        onSubmit={rest.onSubmit}
        onReset={rest.handleReset}
        errors={value.errors}
        onFormChange={rest.validateForm}
        onInputChange={rest.handleChange}
        onInputBlur={rest.handleBlur}
        data={value.data}
        pending={rest.pending}
        currentImages={existingImages}
        onCurrentImagesChange={setExistingImages}
        newImages={newImages}
        onNewImagesChange={setNewImages}
      />
    </Container>
  );
};

export default EditCardPage;