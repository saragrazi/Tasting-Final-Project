import React, { useCallback, useContext, useEffect, useState } from "react";
import { useUser } from "../../users/providers/UserProvider";
import usePaginatedCards from "../hooks/usePaginatedCards";
import { getMyCardsBrowse } from "../services/cardService";
import PageHeader from "../../components/PageHeader";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { Box, Button, Container, Fab, IconButton, Tooltip, useMediaQuery, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CardsFeedback from "../components/CardsFeedback";
import { searchContext } from "../../providers/SearchProvider";
import FilterComp from "../../filters/FilterComp";
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableRowsIcon from '@mui/icons-material/TableRows';
import CardsTable from "../../table/components/CardsTable";

const MyCardsPage = () => {
  const { user } = useUser();
  const { cards, pending, error, hasMore, reload, loadMore, setCards, removeCard } = usePaginatedCards(getMyCardsBrowse);
  const { searchQuery } = useContext(searchContext)
  const navigate = useNavigate();
  const [viewType, setViewType] = useState("cards")
  const [sortBy, setSortBy] = useState("")
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const handleOnChange = useCallback((e) => {
    setSortBy(e.target.value)
  }, [])

  useEffect(() => {
    if (!user || !user.isBusiness) navigate(ROUTES.CARDS);
  }, [navigate, user]);

  useEffect(() => {
    if (!user || !user.isBusiness) return undefined;
    const timer = setTimeout(() => {
      reload({ search: searchQuery, category: sortBy });
    }, 350);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, sortBy, user]);

  useEffect(() => {
    if (isMobile && viewType === 'table') setViewType('cards');
  }, [isMobile, viewType]);

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
        onClick={() => navigate(ROUTES.CREATE_CARD)}
        color="primary"
        aria-label="הוסף מתכון"
        sx={{ position: "absolute", bottom: 75, left: 15 }}
      >
        <AddIcon />
      </Fab>
      {viewType === 'table' && (
        <CardsTable cards={cards} />
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
