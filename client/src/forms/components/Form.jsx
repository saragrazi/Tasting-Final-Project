import React from "react";
import { node, func, string, number, object, bool } from "prop-types";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FormButton from "./FormButtom";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import LoopIcon from "@mui/icons-material/Loop";

const Form = ({
  title,
  onSubmit,
  onReset,
  onChange,
  color,
  spacing,
  styles,
  children,
  submitLabel,
  pending,
}) => {
  return (
    <Box
      component="form"
      color={color}
      sx={{ mt: 2, p: { xs: 1, sm: 2 }, direction: "rtl", textAlign: "right", ...styles }}
      onSubmit={onSubmit}
      autoComplete="off"
      noValidate>
      <Typography align="center" variant="h5" component="h1" mb={2}>
        {title.toUpperCase()}
      </Typography>

      <Grid container spacing={spacing}>
        {children}
      </Grid>

      <Grid container spacing={1} my={2} direction="row" width="100">
        <Grid item xs={12} sm={12}>
          <FormButton
            node={
              <Box display="flex" alignItems="center" justifyContent="center" gap={0.5}>
                <LoopIcon fontSize="small" />
                <span>- איפוס שדות</span>
              </Box>
            }
            variant="outlined"
            component="div"
            onClick={onReset}
            disabled={pending}
          />
        </Grid>
        <Grid item xs={12}>
          <FormButton
            node={pending ? <CircularProgress size={22} color="inherit" /> : submitLabel}
            onClick={onSubmit}
            disabled={!!onChange() || pending}
            size="large"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

Form.propTypes = {
  children: node.isRequired,
  onSubmit: func.isRequired,
  color: string.isRequired,
  spacing: number.isRequired,
  onReset: func.isRequired,
  onChange: func.isRequired,
  title: string.isRequired,
  styles: object.isRequired,
  submitLabel: string,
  pending: bool,
};

Form.defaultProps = {
  color: "inherit",
  to: "/",
  spacing: 1,
  title: "",
  styles: {},
  submitLabel: "שלח",
  pending: false,
};

export default React.memo(Form);