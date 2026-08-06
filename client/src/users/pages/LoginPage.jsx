import React from "react";
import { Navigate, Link as RouterLink } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { useUser } from "../providers/UserProvider";
import useUsers from "../hooks/useUsers";
import useForm from "../../forms/hooks/useForm";
import initialLoginForm from "../helpers/initial-forms/initialLoginForm";
import loginSchema from "../models/joi-schema/loginSchema";
import Container from "@mui/material/Container";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const LoginPage = () => {
  const { user } = useUser();
  const { handleLogin } = useUsers();

  const { value, ...rest } = useForm(
    initialLoginForm,
    loginSchema,
    handleLogin
  );

  if (user) return <Navigate replace to={ROUTES.CARDS} />;

  return (
    <Container
      sx={{
        paddingTop: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        direction: "rtl",
      }}>
      <Form
        onSubmit={rest.onSubmit}
        onReset={rest.handleReset}
        onChange={rest.validateForm}
        title="התחברות"
        submitLabel="התחבר"
        pending={rest.pending}
        styles={{ maxWidth: "450px", direction: "rtl", textAlign: "right" }}
        to={ROUTES.CARDS}>
        <Input
          label="אימייל"
          name="email"
          type="email"
          error={value.errors.email}
          onChange={rest.handleChange}
          onBlur={rest.handleBlur}
          data={value.data}
        />
        <Input
          label="סיסמה"
          name="password"
          type="password"
          error={value.errors.password}
          onChange={rest.handleChange}
          onBlur={rest.handleBlur}
          data={value.data}
        />
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={Boolean(value.data.rememberMe)}
                onChange={(e) =>
                  rest.setData({ ...value.data, rememberMe: e.target.checked })
                }
              />
            }
            label="זכור אותי"
          />
          <Typography variant="caption" color="text.secondary" display="block">
            במידה ואפשרות זו תיבחר, לא תצטרך להתחבר מחדש
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" align="center">
            עוד לא נרשמתם?{" "}
            <Link component={RouterLink} to={ROUTES.SIGNUP}>
              להרשמה
            </Link>
          </Typography>
        </Grid>
      </Form>
    </Container>
  );
};

export default LoginPage;
