import React from "react";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { Container } from "@mui/material";
import { useUser } from "../providers/UserProvider";
import useForm from "../../forms/hooks/useForm";
import useUsers from "./../hooks/useUsers";
import signUpSchema from "../models/joi-schema/signUpSchema";
import UserForm from "../components/UserForm";
import initialSignUpForm from "../helpers/initial-forms/initialSignUpForm";

const SignUpPage = () => {
  const { handleSignup } = useUsers();

  const { value, ...rest } = useForm(
    initialSignUpForm,
    signUpSchema,
    handleSignup
  );

  const { user } = useUser();

  if (user) {
    return <Navigate replace to={ROUTES.CARDS} />;
  }

  return (
    <Container
      sx={{
        paddingTop: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <UserForm
        title="register user"
        onSubmit={rest.onSubmit}
        onReset={rest.handleReset}
        onFormChange={rest.validateForm}
        onInputChange={rest.handleChange}
        data={value.data}
        errors={value.errors}
        setData={rest.setData}
      />
    </Container>
  );
};

export default SignUpPage;
