import React, { useState } from "react";
import { string, bool, object, func } from "prop-types";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/VisibilityOutlined";
import VisibilityOff from "@mui/icons-material/VisibilityOffOutlined";
import { makeFirstLetterCapital } from "../utils/algoMethods";
import Grid from "@mui/material/Grid";

const Input = ({
  multiline,
  variant,
  type,
  name,
  data,
  label,
  required,
  error,
  onChange,
  onBlur,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <Grid item xs={12} {...rest}>
      <TextField
        variant={variant}
        label={makeFirstLetterCapital(label)}
        type={isPassword && showPassword ? "text" : type}
        id={name}
        name={name}
        value={data[name] ? data[name] : ""}
        required={required}
        helperText={error}
        error={Boolean(error)}
        onChange={onChange}
        onBlur={onBlur}
        fullWidth
        multiline={multiline}
        autoComplete="off"
        dir="rtl"
        inputProps={{ style: { textAlign: "right" } }}
        sx={{
          "& input::-ms-reveal, & input::-ms-clear": {
            display: "none",
          },
        }}
        InputProps={
          isPassword
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showPassword ? "הסתר סיסמה" : "הצג סיסמה"}
                      onClick={() => setShowPassword((show) => !show)}
                      edge="end"
                      tabIndex={-1}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : undefined
        }
      />
    </Grid>
  );
};

Input.propTypes = {
  name: string.isRequired,
  multiline: bool,
  required: bool.isRequired,
  type: string.isRequired,
  error: string,
  onChange: func.isRequired,
  onBlur: func,
  variant: string,
  data: object,
};

Input.defaultProps = {
  required: true,
  type: "text",
  variant: "outlined",
};

export default React.memo(Input);