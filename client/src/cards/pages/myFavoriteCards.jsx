import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useUser } from "../../users/providers/UserProvider";
import useCards from "../hooks/useCards";
import PageHeader from "../../components/PageHeader";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { Box, Container, IconButton } from "@mui/material";
import CardsFeedback from "../components/CardsFeedback";
import { searchContext } from "../../providers/SearchProvider";
import FilterComp from "../../filters/FilterComp";
import CardsTable from "../../table/components/CardsTable";
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableRowsIcon from '@mui/icons-material/TableRows';

const MyFavoriteCards = () => {
  const { user } = useUser();
  const { pending, error, cards, handleGetFavCards } = useCards();
  const navigate = useNavigate();
  const { searchQuery } = useContext(searchContext)
  const [filtered, setFiltered] = useState()
  const [sortBy, setSortBy] = useState("")
  const [viewType, setViewType] = useState("cards")
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
    const getCards = async () => {
      if (!user) {
        navigate(ROUTES.CARDS);
      }
      else {
        await handleGetFavCards(user._id);
      }
    }
    getCards()
    // eslint-disable-next-line
  }, []);

  return (
    <Container sx={{ position: "relative", minHeight: "90vh" }}>
      <PageHeader
        title="My Favorite Recipes"
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
      {viewType === 'table' && (
        <CardsTable cards={filtered} />
      )}
      {viewType === 'cards' && (

        <CardsFeedback
          pending={pending}
          error={error}
          cards={filtered}
          onDelete={() => { }}
          showDelete={false}
        />
      )}

    </Container>
  );
};

export default MyFavoriteCards;