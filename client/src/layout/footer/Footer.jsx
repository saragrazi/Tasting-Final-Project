import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { useContactModal } from "../../contact/providers/ContactModalProvider";

import DescriptionIcon from '@mui/icons-material/Description';
const Footer = () => {
  const navigate = useNavigate();
  const navigateTo = (to) => navigate(to);
  const { openContactModal } = useContactModal();
  return (
    <Paper
      sx={{ zIndex: 100, position: "sticky", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        sx={{ backgroundColor: "rgb(2 135 163 / 34%)" }}
        showLabels
      >
        <BottomNavigationAction
          onClick={() => navigateTo(ROUTES.ABOUT)}
          label="אודות"
          icon={<InfoIcon />}
        />
        <BottomNavigationAction
          onClick={() => navigateTo(ROUTES.FAV_CARDS)}
          label="מועדפים"
          icon={<FavoriteIcon />}
        />
        <BottomNavigationAction
          onClick={() => navigateTo(ROUTES.MY_CARDS)}
          label="המתכונים שלי"
          icon={<DescriptionIcon />}
        />
      </BottomNavigation>
      <Box sx={{ textAlign: "center", py: 0.5, backgroundColor: "rgba(0,0,0,0.06)" }}>
        <Typography variant="caption" color="text.secondary" dir="ltr" sx={{ display: "inline-block" }}>
          Built by{" "}
          <Link
            component="button"
            type="button"
            onClick={openContactModal}
            color="inherit"
            underline="hover"
            sx={{ font: "inherit", verticalAlign: "baseline" }}
          >
            Sara M
          </Link>
          {" "}©
        </Typography>
      </Box>
    </Paper>
  );
};

export default Footer;
