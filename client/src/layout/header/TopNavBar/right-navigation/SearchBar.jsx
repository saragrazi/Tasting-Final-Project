import React, { memo, useContext, useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "../../../../providers/ThemeProvider";
import { searchContext } from "../../../../providers/SearchProvider";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const location = useLocation();
  const [path, setPath] = useState(location);
  const { isDark } = useTheme();
  const { handleChange, handleCleanUp, SearchQuery } =
    useContext(searchContext);
  const refy = useRef();

  useEffect(() => {
    setPath(location);
    if (location !== path) {
      handleCleanUp(refy);
    }
  }, [location, handleCleanUp, path]);

  return (
    <Box
      display={
        location.pathname === "/about" ||
        location.pathname === "/about" ||
        location.pathname === "/user-profile" ||
        location.pathname === "/admin-panel" ||
        location.pathname.match("/card-info") ||
        location.pathname.match("/create-card") ||
        location.pathname.match("/edit-card") ||
        location.pathname.match("/my-cards") ||
        location.pathname.match("/favorites")
          ? "none"
          : "inline-flex"
      }
    >
      <FormControl variant="standard">
        <OutlinedInput
          onInput={(e) => {
            handleChange(e);
          }}
          ref={refy}
          sx={{ backgroundColor: isDark ? "#333333" : "#e3f2fd" }}
          placeholder="Search"
          size="small"
          value={SearchQuery}
          endAdornment={
            <InputAdornment position="end">
              <IconButton edge="end">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
};

export default memo(SearchBar);
