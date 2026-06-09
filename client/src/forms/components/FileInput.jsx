import React from "react";
import { string, bool, object, func } from "prop-types";
import TextField from "@mui/material/TextField";
import { makeFirstLetterCapital } from "../utils/algoMethods";
import Grid from "@mui/material/Grid";

const FileInput = ({
  variant,
  type,
  name,
  data,
  label,
  required,
  error,
  onChange,
  ...rest
}) => {
  
  return (
    <Grid item xs={12} {...rest}>
      <TextField
        variant={variant}
        label={makeFirstLetterCapital(label)}
        type={type}
        id={name}
        name={name}
        required={required}
        helperText={error}
        error={Boolean(error)}
        onChange={onChange}
        fullWidth
        autoComplete="off"
      />
    </Grid>
  );
};

FileInput.propTypes = {
  name: string.isRequired,
  required: bool.isRequired,
  type: string.isRequired,
  error: string,
  onChange: func.isRequired,
  variant: string,
  data: object,
};

FileInput.defaultProps = {
  required: true,
  type: "text",
  variant: "outlined",
};

export default React.memo(FileInput);