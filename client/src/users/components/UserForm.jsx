import React from "react";
import { func, object, string, bool } from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import GoogleAuthButton from "./GoogleAuthButton";
import ROUTES from "../../routes/routesModel";

const UserForm = ({
  onSubmit,
  onReset,
  onFormChange,
  title,
  errors,
  data,
  onInputChange,
  onInputBlur,
  setData,
  pending,
  onGoogleLogin,
}) => {
  return (
    <Form
      onSubmit={onSubmit}
      onReset={onReset}
      onChange={onFormChange}
      styles={{ maxWidth: "800px", direction: "rtl", textAlign: "right" }}
      title={title}
      submitLabel="הירשם"
      pending={pending}
      to={ROUTES.CARDS}
    >
      <Input
        name="first"
        label="שם פרטי"
        error={errors.first}
        onChange={onInputChange}
        onBlur={onInputBlur}
        data={data}
        sm={6}
      />
     
      <Input
        name="last"
        label="שם משפחה"
        error={errors.last}
        onChange={onInputChange}
        onBlur={onInputBlur}
        data={data}
        sm={6}
      />
      <Input
        name="phone"
        label="טלפון"
        type="phone"
        error={errors.phone}
        onChange={onInputChange}
        onBlur={onInputBlur}
        data={data}
        sm={6}
      />
      <Input
        name="email"
        label="אימייל"
        type="email"
        error={errors.email}
        onChange={onInputChange}
        onBlur={onInputBlur}
        data={data}
        sm={6}
      />
      <Input
        name="password"
        label="סיסמה"
        type="text"
        error={errors.password}
        onChange={onInputChange}
        onBlur={onInputBlur}
        data={data}
        sm={6}
      />
    
      <Input
        label="ארץ"
        name="country"
        error={errors.country}
        onChange={onInputChange}
        onBlur={onInputBlur}
        data={data}
        sm={6}
      />
      <Input
        name="city"
        label="עיר"
        error={errors.city}
        onChange={onInputChange}
        onBlur={onInputBlur}
        data={data}
        sm={6}
      />
      <Input
        name="street"
        label="רחוב"
        error={errors.street}
        onChange={onInputChange}
        onBlur={onInputBlur}
        data={data}
        sm={6}
      />
      <Input
        name="houseNumber"
        label="מספר בית"
        type="number"
        error={errors.houseNumber}
        onChange={onInputChange}
        onBlur={onInputBlur}
        data={data}
        sm={6}
        required={false}
      />
      <Input
        name="zip"
        label="מיקוד"
        error={errors.zip}
        onChange={onInputChange}
        onBlur={onInputBlur}
        data={data}
        sm={6}
        required={false}
      />
      <Grid item xs={12}>
        <FormControlLabel
          onChange={(e) => {
            setData({ ...data, isBusiness: !!e.target.checked });
          }}
          name="isBusiness"
          control={<Checkbox value={data.isBusiness} color="primary" />}
          label="הרשמה כעסק"
        />
        <Typography variant="caption" color="text.secondary" display="block">
          סמנו כאן אם תרצו להעלות ולפרסם מתכונים משלכם. אפשר גם לשדרג לחשבון עסקי מאוחר יותר, דרך עמוד הפרופיל.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={Boolean(data.rememberMe)}
              onChange={(e) =>
                setData({ ...data, rememberMe: e.target.checked })
              }
              color="primary"
            />
          }
          label="זכור אותי"
        />
        <Typography variant="caption" color="text.secondary" display="block">
          במידה ואפשרות זו תיבחר, לא תצטרך להתחבר מחדש
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ p: 1.5, borderRadius: 1, backgroundColor: "rgba(208,107,107,0.08)" }}>
          <FormControlLabel
            sx={{ mr: 0 }}
            control={
              <Checkbox
                checked={Boolean(data.termsAccepted)}
                onChange={(e) =>
                  setData({ ...data, termsAccepted: e.target.checked })
                }
                color="primary"
              />
            }
            label={
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                אני מאשר/ת את{" "}
                <Link component={RouterLink} to={ROUTES.TERMS} target="_blank" rel="noreferrer">
                  תנאי השימוש באתר
                </Link>
                {" "}
                <Typography component="span" color="error">*</Typography>
              </Typography>
            }
          />
          {errors.termsAccepted && (
            <Typography variant="caption" color="error" display="block">
              {errors.termsAccepted}
            </Typography>
          )}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2" align="center">
          כבר רשומים?{" "}
          <Link component={RouterLink} to={ROUTES.LOGIN}>
            להתחברות
          </Link>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <GoogleAuthButton onLogin={onGoogleLogin} />
      </Grid>
    </Form>
  );
};

UserForm.propTypes = {
  onSubmit: func.isRequired,
  onReset: func.isRequired,
  onFormChange: func.isRequired,
  title: string.isRequired,
  errors: object.isRequired,
  data: object.isRequired,
  onInputChange: func.isRequired,
  onInputBlur: func,
  setData: func.isRequired,
  pending: bool,
  onGoogleLogin: func.isRequired,
};

UserForm.defaultProps = {
  pending: false,
};

export default React.memo(UserForm);
