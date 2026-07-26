import React from "react";
import { func, object, string } from "prop-types";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import ROUTES from "../../routes/routesModel";

const UserForm = ({
  onSubmit,
  onReset,
  onFormChange,
  title,
  errors,
  data,
  onInputChange,
  setData,
}) => {
  return (
    <Form
      onSubmit={onSubmit}
      onReset={onReset}
      onChange={onFormChange}
      styles={{ maxWidth: "800px", direction: "rtl", textAlign: "right" }}
      title={title}
      to={ROUTES.CARDS}
    >
      <Input
        name="first"
        label="שם פרטי"
        error={errors.first}
        onChange={onInputChange}
        data={data}
        sm={6}
      />
      <Input
        name="middle"
        label="שם אמצעי"
        error={errors.middle}
        onChange={onInputChange}
        data={data}
        sm={6}
        required={false}
      />
      <Input
        name="last"
        label="שם משפחה"
        error={errors.last}
        onChange={onInputChange}
        data={data}
        sm={6}
      />
      <Input
        name="phone"
        label="טלפון"
        type="phone"
        error={errors.phone}
        onChange={onInputChange}
        data={data}
        sm={6}
      />
      <Input
        name="email"
        label="אימייל"
        type="email"
        error={errors.email}
        onChange={onInputChange}
        data={data}
        sm={6}
      />
      <Input
        name="password"
        label="סיסמה"
        type="password"
        error={errors.password}
        onChange={onInputChange}
        data={data}
        sm={6}
      />
      <Input
        name="url"
        label="כתובת תמונה"
        error={errors.url}
        onChange={onInputChange}
        data={data}
        sm={6}
        required={false}
      />
      <Input
        name="alt"
        label="טקסט תמונה"
        error={errors.alt}
        onChange={onInputChange}
        data={data}
        sm={6}
        required={false}
      />
      <Input
        name="state"
        label="מדינה"
        error={errors.state}
        onChange={onInputChange}
        data={data}
        sm={6}
        required={false}
      />
      <Input
        label="ארץ"
        name="country"
        error={errors.country}
        onChange={onInputChange}
        data={data}
        sm={6}
      />
      <Input
        name="city"
        label="עיר"
        error={errors.city}
        onChange={onInputChange}
        data={data}
        sm={6}
      />
      <Input
        name="street"
        label="רחוב"
        error={errors.street}
        onChange={onInputChange}
        data={data}
        sm={6}
      />
      <Input
        name="houseNumber"
        label="מספר בית"
        type="number"
        error={errors.houseNumber}
        onChange={onInputChange}
        data={data}
        sm={6}
      />
      <Input
        name="zip"
        label="מיקוד"
        error={errors.zip}
        onChange={onInputChange}
        data={data}
        sm={6}
        required={false}
      />
      <Grid item>
        <FormControlLabel
          onChange={(e) => {
            setData({ ...data, isBusiness: !!e.target.checked });
          }}
          name="isBusiness"
          control={<Checkbox value={data.isBusiness} color="primary" />}
          label="הרשמה כעסק"
        />
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
  setData: func.isRequired,
};

export default React.memo(UserForm);
