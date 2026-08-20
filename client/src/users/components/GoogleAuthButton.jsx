import React from "react";
import { bool, func } from "prop-types";
import { GoogleLogin } from "@react-oauth/google";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useSnack } from "../../providers/SnackbarProvider";

const GoogleAuthButton = ({ onLogin, pending }) => {
  const { setSnack } = useSnack();

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <GoogleLogin
          onSuccess={(credentialResponse) => onLogin(credentialResponse.credential)}
          onError={() => setSnack("error", "ההתחברות עם גוגל נכשלה")}
          text="signin_with"
          shape="rectangular"
          locale="he"
        />
      </Box>
      <Divider sx={{ my: 2 }}>
        <Typography variant="body2" color="text.secondary">
          או
        </Typography>
      </Divider>
      <Backdrop
        open={pending}
        sx={{
          position: "fixed",
          zIndex: (theme) => theme.zIndex.modal + 1,
          color: "#fff",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <CircularProgress color="inherit" />
        <Typography variant="body2">מתחברים...</Typography>
      </Backdrop>
    </Box>
  );
};

GoogleAuthButton.propTypes = {
  onLogin: func.isRequired,
  pending: bool,
};

GoogleAuthButton.defaultProps = {
  pending: false,
};

export default GoogleAuthButton;
