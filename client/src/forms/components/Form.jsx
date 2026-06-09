import React from "react";
import { node, func, string, number, object } from "prop-types";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FormButton from "./FormButtom";
import Typography from "@mui/material/Typography";
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
}) => {
  return (
    <Box
      component="form"
      color={color}
      sx={{ mt: 2, p: { xs: 1, sm: 2 }, ...styles }}
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
            node={<LoopIcon />}
            variant="outlined"
            component="div"
            onClick={onReset}
          />
        </Grid>
        <Grid item xs={12}>
          <FormButton
            node="Submit"
            onClick={onSubmit}
            disabled={!!onChange()}
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
};

Form.defaultProps = {
  color: "inherit",
  to: "/",
  spacing: 1,
  title: "",
  styles: {},
};

export default React.memo(Form);