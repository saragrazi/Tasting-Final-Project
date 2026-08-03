import React from "react";
import { func, object, string } from "prop-types";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import ROUTES from "../../routes/routesModel";

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
};

export default React.memo(EditUserForm);
