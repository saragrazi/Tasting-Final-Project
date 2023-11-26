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
      styles={{ maxWidth: "400px", display: "flex", flexDirection: "column" }}
      title={title}

    >
      <Input
        name="title"
        label="title"
        error={errors.title}
        onChange={onInputChange}
        data={data}
      />


      <Input
        name="subtitle"
        label="subtitle"
        error={errors.subtitle}
        onChange={onInputChange}
        data={data}
      />
        <Input
          name="ingredients"
          label="ingredients"
          error={errors.ingredients}
          onChange={onInputChange}
          data={data}
          multiline={true}
        />
      <Input
        name="cookingSteps"
        label="how to Cook it?"
        error={errors.cookingSteps}
        onChange={onInputChange}
        data={data}
        multiline={true}
      />
        <FormControl sx={{ marginLeft: "8px", marginTop: "15px" }} fullWidth>
          <InputLabel sx={{ display: "flex" }}>Category</InputLabel>
          <Select
            label="category"
            onChange={onInputChange}
            value={data?.category ? data?.category : ""}
            name="category"
          >
            <MenuItem value={"meat-meal"}>Meat-Meal</MenuItem>
            <MenuItem value={"milky-meal"}>Milky-Meal</MenuItem>
            <MenuItem value={"fish"}>Fish</MenuItem>
            <MenuItem value={"salads"}>Salads</MenuItem>
            <MenuItem value={"salad"}>Salad</MenuItem>
            <MenuItem value={"desserts"}>Desserts</MenuItem>
            <MenuItem value={"cakes-and-cookies"}>Cakes-And-Cookies</MenuItem>
            <MenuItem value={"pies"}>Pies</MenuItem>
          </Select>
        </FormControl>
      {title !== "edit Card" && (

        <FormControl sx={{ marginLeft: "8px", marginTop: "5px", width: "100%" }}>
          <FormLabel >Recipe Image Upload</FormLabel>
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