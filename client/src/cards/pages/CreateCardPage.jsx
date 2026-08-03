import React from "react";
import useCards from "../hooks/useCards";
import { useUser } from "../../users/providers/UserProvider";
import useForm from "../../forms/hooks/useForm";
import initialCardForm from "../helpers/initialForms/initialCardForm";
import ROUTES from "../../routes/routesModel";
import { Navigate } from "react-router-dom";
import { Container } from "@mui/material";
import CardForm from "../components/CardForm";
import BecomeBusinessPrompt from "../components/BecomeBusinessPrompt";
import PageHeader from "../../components/PageHeader";
import { cardSchema } from "../models/joi-schema/cardSchema";

const CreateCardPage = () => {
  const { handleCreateCard } = useCards();
  const { user } = useUser();
  const { value, ...rest } = useForm(
    initialCardForm,
    cardSchema,
    handleCreateCard
  );

  if (!user) return <Navigate replace to={ROUTES.CARDS} />;

  if (!user.isBusiness) {
    return (
      <Container sx={{ direction: "rtl" }}>
        <PageHeader title="צור מתכון" textAlign={"center"} />
        <BecomeBusinessPrompt />
      </Container>
    );
  }

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
        title="צור מתכון"
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

export default CreateCardPage;