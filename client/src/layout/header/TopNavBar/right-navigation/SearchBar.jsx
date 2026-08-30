import React, { memo, useContext, useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import { useTheme } from "../../../../providers/ThemeProvider";
import { searchContext } from "../../../../providers/SearchProvider";
import { useUser } from "../../../../users/providers/UserProvider";
import { useLocation } from "react-router-dom";
import { getCategoryLabel } from "../../../../cards/models/categoryOptions";

const SearchBar = () => {
  const location = useLocation();
  const [path, setPath] = useState(location);
  const { isDark } = useTheme();
  const { user } = useUser();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const { handleChange, handleCleanUp, SearchQuery, category } =
    useContext(searchContext);
  const refy = useRef();

  useEffect(() => {
    setPath(location);
    if (location !== path) {
      handleCleanUp(refy);
    }
  }, [location, handleCleanUp, path]);

  // Only these pages have anything to search - everywhere else (login,
  // signup, about, profile, admin, create/edit-card, card details...)
  // hides the search bar.
  const SEARCHABLE_PATHS = ["/", "/cards", "/my-cards", "/favorites"];
  const isSearchablePage = SEARCHABLE_PATHS.includes(location.pathname);
  const isMyContentPage =
    location.pathname === "/my-cards" || location.pathname === "/favorites";
  const shouldHide = !isSearchablePage || (isMyContentPage && !user);

  const getPlaceholder = (pathname) => {
    if (isMobile) return "חפש";
    if (category) return `חפש בקטגוריית "${getCategoryLabel(category)}"`;
    if (pathname === "/my-cards") return "חפש במתכונים שלי";
    if (pathname === "/favorites") return "חפש במועדפים שלי";
    return "חפש מתכונים";
  };

  return (
    <Box display={shouldHide ? "none" : "inline-flex"}>
      <FormControl variant="standard" sx={{ width: { xs: 110, sm: 160, md: 200 } }}>
        <OutlinedInput
          onInput={(e) => {
            handleChange(e);
          }}
          ref={refy}
          sx={{
            backgroundColor: isDark ? "#333333" : "#e3f2fd",
            width: "100%",
            "& input": {
              fontSize: { xs: "0.75rem", sm: "0.8rem" },
              textOverflow: "ellipsis",
            },
          }}
          placeholder={getPlaceholder(location.pathname)}
          size="small"
          value={SearchQuery}
          endAdornment={
            <InputAdornment position="end">
              <IconButton edge="end" aria-label="חיפוש">
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
