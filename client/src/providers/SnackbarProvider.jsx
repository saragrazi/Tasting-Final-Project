import { Alert, Snackbar } from "@mui/material";
import React, { useCallback, useState, useContext } from "react";
import { node } from "prop-types";

const SnackbarContext = React.createContext(null);

export const SnackbarProvider = ({ children }) => {
  const [isSnackbarOpen, setOpenSnackbar] = useState(false);
  const [snackColor, setSnackColor] = useState("success");
  const [snackMessage, setSnackMessage] = useState("in Snackbar");
  const [snackVariant, setSnackVariant] = useState("filled");

  const setSnack = useCallback(
    (color, message, variant = "filled") => {
      setOpenSnackbar(true);
      setSnackColor(color);
      setSnackMessage(message);
      setSnackVariant(variant);
    },
    [setOpenSnackbar, setSnackColor, setSnackMessage, setSnackVariant]
  );
  return (
    <>
      <Snackbar
        open={isSnackbarOpen}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        autoHideDuration={5000}
      >
        <Alert severity={snackColor} variant={snackVariant}>
          {snackMessage}
        </Alert>
      </Snackbar>

      <SnackbarContext.Provider value={{ setSnack }}>
        {children}
      </SnackbarContext.Provider>
    </>
  );
};

export const useSnack = () => {
  const context = useContext(SnackbarContext);
  if (!context) throw Error("useContext must use with SnackbarProvider");
  return context;
};

SnackbarProvider.propTypes = {
  children: node.isRequired,
};
