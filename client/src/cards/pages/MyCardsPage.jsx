import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useUser } from "../../users/providers/UserProvider";
import useCards from "../hooks/useCards";
import PageHeader from "../../components/PageHeader";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { Box, Container, Fab, IconButton, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CardsFeedback from "../components/CardsFeedback";
import { searchContext } from "../../providers/SearchProvider";
import FilterComp from "../../filters/FilterComp";
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableRowsIcon from '@mui/icons-material/TableRows';
import CardsTable from "../../table/components/CardsTable";
import { getVisibleCards } from "../helpers/filterCards";

const MyCardsPage = () => {
  const { user } = useUser();
  const { pending, error, cards, handleGetMyCards, setCards } = useCards();
  const { searchQuery } = useContext(searchContext)
  const navigate = useNavigate();
  const [viewType, setViewType] = useState("cards")
  const [sortBy, setSortBy] = useState("")
  const handleOnChange = useCallback((e) => {
    setSortBy(e.target.value)
  }, [])

  const filtered = useMemo(() => getVisibleCards(cards || [], searchQuery, sortBy), [cards, searchQuery, sortBy]);


  useEffect(() => {
    if (!user || !user.isBusiness) navigate(ROUTES.CARDS);
    else handleGetMyCards();
  }, [handleGetMyCards, navigate, user]);

  return (
    <Container sx={{ position: "relative", minHeight: "90vh", direction: "rtl" }}>
      <PageHeader
        title="המתכונים שלי"
        textAlign={"center"}
      />
      <Box display={"flex"} flexDirection={{ xs: "column", sm: "row" }} gap={2} mb={3} alignItems="center">
        <FilterComp handleOnChange={handleOnChange} sortBy={sortBy} cards={cards} />
        {viewType === 'cards' ? (
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
        <CardsTable cards={filtered} />
      )}
      {viewType === 'cards' && (
        <Box mt={3}>
          <CardsFeedback
            pending={pending}
            error={error}
          cards={filtered}
          onDelete={() => { }}
          setCards={setCards}
          />
        </Box>
      )}
    </Container>
  );
};

export default MyCardsPage;