import React from "react";
import { func, object, string } from "prop-types";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import { FormControl, FormLabel, InputLabel, MenuItem, Select } from "@mui/material";
import FileInput from "../../forms/components/FileInput";



const CardForm = ({
  onSubmit,
  onReset,
  errors,
  onFormChange,
  onInputChange,
  handleFileUpload,
  data,
  title,
}) => {
  return (
    <Form
      onSubmit={onSubmit}
      onReset={onReset}
      errors={errors}
      onChange={onFormChange}
      styles={{ maxWidth: "400px", display: "flex", flexDirection: "column", direction: "rtl", textAlign: "right" }}
      title={title}
    >
      <Input
        name="title"
        label="כותרת"
        error={errors.title}
        onChange={onInputChange}
        data={data}
      />


      <Input
        name="subtitle"
        label="תת-כותרת"
        error={errors.subtitle}
        onChange={onInputChange}
        data={data}
      />
        <Input
          name="ingredients"
          label="מרכיבים"
          error={errors.ingredients}
          onChange={onInputChange}
          data={data}
          multiline={true}
        />
      <Input
        name="cookingSteps"
        label="איך מכינים אותו?"
        error={errors.cookingSteps}
        onChange={onInputChange}
        data={data}
        multiline={true}
      />
        <FormControl sx={{ marginLeft: "8px", marginTop: "15px" }} fullWidth>
          <InputLabel sx={{ display: "flex" }}>קטגוריה</InputLabel>
          <Select
            label="קטגוריה"
            onChange={onInputChange}
            value={data?.category ? data?.category : ""}
            name="category"
          >
            <MenuItem value={"ארוחות בשר"}>ארוחות בשר</MenuItem>
            <MenuItem value={"ארוחות חלביות"}>ארוחות חלביות</MenuItem>
            <MenuItem value={"דגים"}>דגים</MenuItem>
            <MenuItem value={"סלטים"}>סלטים</MenuItem>
            <MenuItem value={"קינוחים"}>קינוחים</MenuItem>
            <MenuItem value={"עוגות ועוגיות"}>עוגות ועוגיות</MenuItem>
            <MenuItem value={"פשטידות"}>פשטידות</MenuItem>
          </Select>
        </FormControl>
      {title !== "ערוך מתכון" && (

        <FormControl sx={{ marginLeft: "8px", marginTop: "5px", width: "100%" }}>
          <FormLabel>העלאת תמונת מנה</FormLabel>
          <FileInput
            name="dishImage"
            label=""
            onChange={handleFileUpload}
            type="file"
            error={errors.description}
            data={data}
          />
        </FormControl>
      )}
    </Form>
  );
};

CardForm.propTypes = {
  onSubmit: func.isRequired,
  onReset: func.isRequired,
  errors: object.isRequired,
  onFormChange: func.isRequired,
  onInputChange: func.isRequired,
  onFileChange: func,
  data: object.isRequired,
  title: string.isRequired,
};

export default React.memo(CardForm);