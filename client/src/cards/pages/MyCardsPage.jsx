import React, { Suspense, useCallback, useContext, useEffect, useState } from "react";
import { useUser } from "../../users/providers/UserProvider";
import usePaginatedCards from "../hooks/usePaginatedCards";
import { getMyCardsBrowse } from "../services/cardService";
import PageHeader from "../../components/PageHeader";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { Box, Button, Container, Fab, IconButton, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CardsFeedback from "../components/CardsFeedback";
import Spinner from "../../components/Spinner";
import { searchContext } from "../../providers/SearchProvider";
import FilterComp from "../../filters/FilterComp";
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableRowsIcon from '@mui/icons-material/TableRows';
import CardsTable, { preloadCardsTable } from "../../table/components/LazyCardsTable";

const MyCardsPage = () => {
  const { user } = useUser();
  const { cards, pending, setPending, error, hasMore, reload, loadMore, setCards, removeCard } = usePaginatedCards(getMyCardsBrowse);
  const { searchQuery, setCategory } = useContext(searchContext)
  const navigate = useNavigate();
  const [viewType, setViewType] = useState("cards")
  const [sortBy, setSortBy] = useState("")
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const handleOnChange = useCallback((e) => {
    setSortBy(e.target.value)
  }, [])

  useEffect(() => {
    if (!user) return undefined;
    setPending(true);
    const timer = setTimeout(() => {
      reload({ search: searchQuery, category: sortBy });
    }, 350);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, sortBy, user]);

  useEffect(() => {
    if (isMobile && viewType === 'table') setViewType('cards');
  }, [isMobile, viewType]);

  useEffect(() => {
    setCategory(sortBy);
    return () => setCategory("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy]);

  const getEmptyMessage = () => {
    if (searchQuery) {
      return sortBy
        ? `לא נמצאו מתכונים שלך בקטגוריית "${sortBy}" התואמים לחיפוש "${searchQuery}".`
        : `לא נמצאו מתכונים שלך התואמים לחיפוש "${searchQuery}".`;
    }
    if (sortBy) return `אין לך עדיין מתכונים בקטגוריית "${sortBy}".`;
    return "עדיין לא הוספת מתכונים. לחצו על + כדי להוסיף את המתכון הראשון שלכם!";
  };

  if (!user) {
    return (
      <Container sx={{ minHeight: "90vh", direction: "rtl" }}>
        <PageHeader title="המתכונים שלי" textAlign={"center"} />
        <Box display="flex" flexDirection="column" alignItems="center" mt={4} gap={2}>
          <Typography>יש להירשם או להתחבר כדי לראות את המתכונים שלך.</Typography>
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
        title="המתכונים שלי"
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
      <Fab
        variant="extended"
        onClick={() => navigate(ROUTES.CREATE_CARD)}
        color="primary"
        aria-label="הוסף מתכון"
        sx={
          isMobile
            ? { position: "fixed", bottom: 95, left: "50%", transform: "translateX(-50%)" }
            : {
                position: "fixed",
                bottom: 130,
                left: 25,
                minHeight: 64,
                padding: "0 28px",
                fontSize: "1.05rem",
              }
        }
      >
        <AddIcon sx={{ ml: 1, fontSize: isMobile ? undefined : "1.6rem" }} />
        הוסף מתכון
      </Fab>
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
          emptyMessage={getEmptyMessage()}
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

export default MyCardsPage;
