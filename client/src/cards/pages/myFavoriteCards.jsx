import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useUser } from "../../users/providers/UserProvider";
import useCards from "../hooks/useCards";
import PageHeader from "../../components/PageHeader";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { Box, Container, IconButton, Tooltip } from "@mui/material";
import CardsFeedback from "../components/CardsFeedback";
import { searchContext } from "../../providers/SearchProvider";
import FilterComp from "../../filters/FilterComp";
import CardsTable from "../../table/components/CardsTable";
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableRowsIcon from '@mui/icons-material/TableRows';
import { getVisibleCards } from "../helpers/filterCards";

const MyFavoriteCards = () => {
  const { user } = useUser();
  const { pending, error, cards, handleGetFavCards, setCards } = useCards();
  const navigate = useNavigate();
  const { searchQuery } = useContext(searchContext)
  const [sortBy, setSortBy] = useState("")
  const [viewType, setViewType] = useState("cards")
  const handleOnChange = useCallback((e) => {
    setSortBy(e.target.value)
  }, [])

  const filtered = useMemo(() => getVisibleCards(cards || [], searchQuery, sortBy), [cards, searchQuery, sortBy]);

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
    <Container sx={{ position: "relative", minHeight: "90vh", direction: "rtl" }}>
      <PageHeader
        title="המועדפים שלי"
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
            showDelete={false}
          />
        </Box>
      )}

    </Container>
  );
};

export default MyFavoriteCards;