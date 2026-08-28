import React from "react";
import { func, object, string, bool } from "prop-types";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import ROUTES from "../../routes/routesModel";
import { FORM_MAX_WIDTH } from "../../forms/constants";

const EditUserForm = ({
  onSubmit,
  onReset,
  onFormChange,
  title,
  errors,
  data,
  onInputChange,
  onInputBlur,
  setData,
  isBusiness,
  onBecomeBusiness,
  businessPending,
  pending,
}) => {
  return (
    <Form
      onSubmit={onSubmit}
      onReset={onReset}
      onChange={onFormChange}
      styles={{ maxWidth: `${FORM_MAX_WIDTH}px`, direction: "rtl", textAlign: "right" }}
      title={title}
      submitLabel="עדכן פרטים"
      to={ROUTES.CARDS}
      pending={pending}
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
      {!isBusiness && (
        <Grid item xs={12}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={onBecomeBusiness}
            disabled={businessPending}
          >
            הפוך למשתמש עסקי
          </Button>
        </Grid>
      )}
    </Form>
  );
};

EditUserForm.propTypes = {
  onSubmit: func.isRequired,
  onReset: func.isRequired,
  onFormChange: func.isRequired,
  title: string.isRequired,
  errors: object.isRequired,
  data: object.isRequired,
  onInputChange: func.isRequired,
  onInputBlur: func,
  setData: func.isRequired,
  isBusiness: bool,
  onBecomeBusiness: func,
  businessPending: bool,
  pending: bool,
};

export default React.memo(EditUserForm);
