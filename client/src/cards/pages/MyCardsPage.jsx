import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useUser } from "../../users/providers/UserProvider";
import useCards from "../hooks/useCards";
import PageHeader from "../../components/PageHeader";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { Box, Container, Fab, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CardsFeedback from "../components/CardsFeedback";
import { searchContext } from "../../providers/SearchProvider";
import FilterComp from "../../filters/FilterComp";
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableRowsIcon from '@mui/icons-material/TableRows';
import CardsTable from "../../table/components/CardsTable";

const MyCardsPage = () => {
  const { user } = useUser();
  const { pending, error, cards, handleGetMyCards, setCards } = useCards();
  const { searchQuery } = useContext(searchContext)
  const navigate = useNavigate();
  const [filtered, setFiltered] = useState()
  const [viewType, setViewType] = useState("cards")
  const [sortBy, setSortBy] = useState("")
  const handleOnChange = useCallback((e) => {
    setSortBy(e.target.value)
  }, [])

  useMemo(() => {
    if (searchQuery.length > 0 && sortBy.length === 0) {
      setFiltered(cards?.filter(card => (card?.title.match(searchQuery))))
    } else if (sortBy.length > 0 && searchQuery.length === 0) {
      setFiltered(cards.filter((card) => (card.category === sortBy)))
    } else if (sortBy.length > 0 && searchQuery.length > 0) {
      let TempCards = []
      TempCards = (cards.filter((card) => (card.category === sortBy)))
      setFiltered(TempCards.filter(card => (card?.title.match(searchQuery))))
    } else {
      setFiltered(cards)
    }
  }, [cards, searchQuery, sortBy])


  useEffect(() => {
    if (!user || !user.isBusiness) navigate(ROUTES.CARDS);
    else handleGetMyCards();
  }, [handleGetMyCards, navigate, user]);

  return (
    <Container sx={{ position: "relative", minHeight: "90vh" }}>
      <PageHeader
        title="My Recipes Page"
        textAlign={"center"}
      />
      <Box display={"flex"} flexDirection={{ xs: "column", sm: "row" }} >
        <FilterComp handleOnChange={handleOnChange} sortBy={sortBy} cards={cards} />
        {viewType === 'cards' ?
          (<IconButton
            color="inherit"
            onClick={() => { setViewType(viewType === 'cards' ? 'table' : 'cards') }}><TableRowsIcon /></IconButton>)
          :
          (<IconButton color='inherit' onClick={() => { setViewType(viewType === 'cards' ? "table" : "cards") }}><DashboardIcon /></IconButton>)
        }
      </Box>
      <Fab
        onClick={() => navigate(ROUTES.CREATE_CARD)}
        color="primary"
        aria-label="add card"
        sx={{ position: "absolute", bottom: 75, right: 15 }}
      >
        <AddIcon />
      </Fab>
      {viewType === 'table' && (
        <CardsTable cards={filtered} />
      )}
      {viewType === 'cards' && (

        <CardsFeedback
          pending={pending}
          error={error}
          cards={filtered}
          onDelete={() => { }}
          setCards={setCards}
        />
      )}
    </Container>
  );
};

export default MyCardsPage;