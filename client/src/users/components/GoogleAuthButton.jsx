import React from "react";
import { func } from "prop-types";
import { GoogleLogin } from "@react-oauth/google";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useSnack } from "../../providers/SnackbarProvider";

const GoogleAuthButton = ({ onLogin }) => {
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
    </Box>
  );
};

GoogleAuthButton.propTypes = {
  onLogin: func.isRequired,
};

export default GoogleAuthButton;
