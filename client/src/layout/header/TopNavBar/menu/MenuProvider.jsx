import React, { useContext, useEffect, useRef, useState } from "react";
import { node } from "prop-types";
import { Box, useMediaQuery, useTheme as useMuiTheme } from "@mui/material";
import MenuComponent from "./Menu";

const MenuContext = React.createContext(null);

export const MenuProvider = ({ children }) => {
  const theme = useMuiTheme();
  const screenSizeChanged = useMediaQuery(theme.breakpoints.up("md"));

  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchor] = useState(null);

  const ancorRef = useRef();

  useEffect(() => {
    setAnchor(ancorRef.current);
        // eslint-disable-next-line

  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [screenSizeChanged]);

  return (
    <>
      <MenuContext.Provider value={setIsOpen}>{children}</MenuContext.Provider>

      <Box
        ref={ancorRef}
        component="span"
        position="fixed"
        top="70px"
        right="20px"
      ></Box>
      {anchorEl && (
        <MenuComponent
          anchorEl={anchorEl}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
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

