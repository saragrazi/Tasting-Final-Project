import React from "react";
import { func, bool } from "prop-types";
import { useUser } from "../../../../users/providers/UserProvider";
import useUsers from "../../../../users/hooks/useUsers";
import Menu from "@mui/material/Menu";
import { Box } from "@mui/material";
import MenuLink from "../../../../routes/MenuLink";
import ROUTES from "../../../../routes/routesModel";

const MenuComponent = ({ isOpen, anchorEl, onClose }) => {
  const { user } = useUser();
  const { handleLogout } = useUsers();

  const onLogout = () => {
    handleLogout();
    onClose();
  };

  return (
    <Menu
      open={isOpen}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      sx={{ direction: "rtl" }}
    >
      <Box>
        <MenuLink
          text="אודות"
          navigateTo={ROUTES.ABOUT}
          onClick={onClose}
        ></MenuLink>
        <MenuLink
          text="המתכונים שלי"
          navigateTo={ROUTES.MY_CARDS}
          onClick={onClose}
          styles={{ display: { xs: "block", md: "none" } }}
        ></MenuLink>
        <MenuLink
          text="המועדפים שלי"
          navigateTo={ROUTES.FAV_CARDS}
          onClick={onClose}
          styles={{ display: { xs: "block", md: "none" } }}
        ></MenuLink>
        {!user && (
          <>
            <MenuLink
              text="התחברות"
              navigateTo={ROUTES.LOGIN}
              onClick={onClose}
              styles={{ display: { xs: "block", md: "none" } }}
            ></MenuLink>
            <MenuLink
              text="הרשמה"
              navigateTo={ROUTES.SIGNUP}
              onClick={onClose}
              styles={{ display: { xs: "block", md: "none" } }}
            ></MenuLink>
          </>
        )}
        {user && (
          <>
            <MenuLink
              text="פרופיל"
              navigateTo={ROUTES.USER_PROFILE}
              onClick={onClose}
            ></MenuLink>
            {user.isAdmin && (
              <MenuLink
                text="ניהול משתמשים"
                navigateTo={ROUTES.USERS_MANAGEMENT}
                onClick={onClose}
                styles={{ display: { xs: "block", md: "none" } }}
              ></MenuLink>
            )}
            {/* <MenuLink
              text="ערוך פרופיל"
              navigateTo={ROUTES.EDIT_PROFILE}
              onClick={onClose}
            ></MenuLink> */}
            <MenuLink
              text="התנתק"
              navigateTo={ROUTES.CARDS}
              onClick={onLogout}
            ></MenuLink>
          </>
        )}
      </Box>
    </Menu>
  );
};

MenuComponent.propTypes = {
  isOpen: bool.isRequired,
  onClose: func.isRequired,
};

export default MenuComponent;
