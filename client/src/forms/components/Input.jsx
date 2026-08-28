import React, { useState } from "react";
import { string, bool, object, func, number } from "prop-types";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import Visibility from "@mui/icons-material/VisibilityOutlined";
import VisibilityOff from "@mui/icons-material/VisibilityOffOutlined";
import { makeFirstLetterCapital } from "../utils/algoMethods";
import Grid from "@mui/material/Grid";

const REQUIRED_HINT = "שדה חובה";

const Input = ({
  multiline,
  minRows,
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
      <Typography
        variant="caption"
        dir="rtl"
        sx={{
          display: "block",
          mb: 0.5,
          textAlign: "right",
          color: "#d32f2f",
          visibility: required && !error && !data[name] ? "visible" : "hidden",
        }}
      >
        {REQUIRED_HINT}
      </Typography>
      <TextField
        variant={variant}
        label={makeFirstLetterCapital(label)}
        type={isPassword && showPassword ? "text" : type}
        id={name}
        name={name}
        value={data[name] ? data[name] : ""}
        helperText={error}
        error={Boolean(error)}
        onChange={onChange}
        onBlur={onBlur}
        fullWidth
        multiline={multiline}
        minRows={multiline ? minRows : undefined}
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
  minRows: number,
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