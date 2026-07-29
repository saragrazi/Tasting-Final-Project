import React, { useCallback, useContext, useEffect, useState } from "react";
import { node } from "prop-types";
import { useMediaQuery, useTheme as useMuiTheme } from "@mui/material";
import MenuComponent from "./Menu";

const MenuContext = React.createContext(null);

export const MenuProvider = ({ children }) => {
  const theme = useMuiTheme();
  const screenSizeChanged = useMediaQuery(theme.breakpoints.up("md"));

  // anchorEl points at the button that opened the menu, so the menu
  // drops down directly underneath it instead of a fixed screen corner.
  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = useCallback((target) => setAnchorEl(target), []);
  const closeMenu = useCallback(() => setAnchorEl(null), []);

  useEffect(() => {
    setAnchorEl(null);
  }, [screenSizeChanged]);

  return (
    <>
      <MenuContext.Provider value={openMenu}>{children}</MenuContext.Provider>

      <MenuComponent
        anchorEl={anchorEl}
        isOpen={Boolean(anchorEl)}
        onClose={closeMenu}
      />
    </>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) throw new Error("useMenu muse be used with MenuProvider");
  return context;
};

MenuProvider.propTypes = {
  children: node.isRequired,
};

