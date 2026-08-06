import React, { Suspense, useCallback, useContext, useEffect, useState } from "react";
import { useUser } from "../../users/providers/UserProvider";
import usePaginatedCards from "../hooks/usePaginatedCards";
import { getMyFavoriteCardsBrowse } from "../services/cardService";
import PageHeader from "../../components/PageHeader";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { Box, Button, Container, IconButton, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material";
import CardsFeedback from "../components/CardsFeedback";
import Spinner from "../../components/Spinner";
import { searchContext } from "../../providers/SearchProvider";
import FilterComp from "../../filters/FilterComp";
import CardsTable, { preloadCardsTable } from "../../table/components/LazyCardsTable";
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableRowsIcon from '@mui/icons-material/TableRows';

const MyFavoriteCards = () => {
  const { user } = useUser();
  const { cards, pending, error, hasMore, reload, loadMore, setCards, removeCard } = usePaginatedCards(getMyFavoriteCardsBrowse);
  const navigate = useNavigate();
  const { searchQuery } = useContext(searchContext)
  const [sortBy, setSortBy] = useState("")
  const [viewType, setViewType] = useState("cards")
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const handleOnChange = useCallback((e) => {
    setSortBy(e.target.value)
  }, [])

  useEffect(() => {
    if (isMobile && viewType === 'table') setViewType('cards');
  }, [isMobile, viewType]);

  useEffect(() => {
    if (!user) return undefined;
    const timer = setTimeout(() => {
      reload({ search: searchQuery, category: sortBy });
    }, 350);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, sortBy, user]);

  if (!user) {
    return (
      <Container sx={{ minHeight: "90vh", direction: "rtl" }}>
        <PageHeader title="המועדפים שלי" textAlign={"center"} />
        <Box display="flex" flexDirection="column" alignItems="center" mt={4} gap={2}>
          <Typography>יש להירשם או להתחבר כדי לראות את המועדפים שלך.</Typography>
          <Box display="flex" gap={2}>
            <Button variant="contained" color="primary" onClick={() => navigate(ROUTES.LOGIN)}>
              התחברות
            </Button>
            <Button variant="outlined" color="primary" onClick={() => navigate(ROUTES.SIGNUP)}>
              הרשמה
            </Button>
          </Box>
        </Box>
      </Container>
    );
  }

  return (
    <Container sx={{ position: "relative", minHeight: "90vh", direction: "rtl" }}>
      <PageHeader
        title="המועדפים שלי"
        textAlign={"center"}
      />
      <Box display={"flex"} flexDirection={{ xs: "column", sm: "row" }} gap={2} mb={3} alignItems="center">
        <FilterComp handleOnChange={handleOnChange} sortBy={sortBy} cards={cards} />
        {!isMobile && (
          viewType === 'cards' ? (
            <Tooltip title="תצוגת טבלה">
              <IconButton
                color="inherit"
                aria-label="החלף לתצוגת טבלה"
                onMouseEnter={preloadCardsTable}
                onFocus={preloadCardsTable}
                onClick={() => { setViewType('table') }}><TableRowsIcon /></IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="תצוגת כרטיסים">
              <IconButton
                color='inherit'
                aria-label="החלף לתצוגת כרטיסים"
                onClick={() => { setViewType('cards') }}><DashboardIcon /></IconButton>
            </Tooltip>
          )
        )}
      </Box>
      {viewType === 'table' && (
        <Suspense fallback={<Spinner height="20vh" />}>
          <CardsTable cards={cards} />
        </Suspense>
      )}
      {viewType === 'cards' && (
        <Box mt={3}>
          <CardsFeedback
            pending={pending}
            error={error}
            cards={cards}
            onDelete={() => { }}
            setCards={setCards}
            removeCard={removeCard}
            showDelete={false}
            emptyMessage={
              searchQuery
                ? `לא נמצאו מועדפים התואמים לחיפוש "${searchQuery}".`
                : "עדיין אין לך מתכונים מועדפים. סמנו מתכונים שאהבתם כדי לראות אותם כאן."
            }
          />
          {hasMore && !pending && (
            <Box display="flex" justifyContent="center" mt={3}>
              <Button variant="contained" color="primary" onClick={loadMore}>
                טען עוד
              </Button>
            </Box>
          )}
        </Box>
      )}

    </Container>
  );
};

export default MyFavoriteCards;
