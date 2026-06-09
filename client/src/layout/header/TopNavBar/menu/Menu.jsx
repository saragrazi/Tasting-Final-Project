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
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Box>
        <MenuLink
          text="about"
          navigateTo={ROUTES.ABOUT}
          onClick={onClose}
          styles={{ color: "black" }}
        ></MenuLink>
        {!user && (
          <>
            <MenuLink
              text="login"
              navigateTo={ROUTES.LOGIN}
              onClick={onClose}
              styles={{ display: { xs: "block", md: "none" }, color: "black" }}
            ></MenuLink>
            <MenuLink
              text="signup"
              navigateTo={ROUTES.SIGNUP}
              onClick={onClose}
              styles={{ display: { xs: "block", md: "none" }, color: "black" }}
            ></MenuLink>
          </>
        )}
        {user && (
          <>
            <MenuLink
              text="profile"
              navigateTo={ROUTES.USER_PROFILE}
              onClick={onClose}
              styles={{ color: "black" }}
            ></MenuLink>
            {/* <MenuLink
              text="signup"
              navigateTo={ROUTES.EDIT_PROFILE}
              onClick={onClose}
            ></MenuLink> */}
            <MenuLink
              text="logout"
              navigateTo={ROUTES.CARDS}
              onClick={onLogout}
              styles={{ color: "black" }}
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
