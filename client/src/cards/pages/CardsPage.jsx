import { Container } from '@mui/system';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import PageHeader from '../../components/PageHeader';
import CardsFeedback from '../components/CardsFeedback';
import useCards from '../hooks/useCards';
import { searchContext } from '../../providers/SearchProvider';
import FilterComp from '../../filters/FilterComp';
import { Box, IconButton } from '@mui/material';
import DataTable from '../../table/components/CardsTable';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableRowsIcon from '@mui/icons-material/TableRows';
import handleDeleteCard from '../hooks/useCards'

const CardsPage = () => {
  const { searchQuery } = useContext(searchContext)
  const { pending, error, cards, handleGetCards, setCards, } = useCards();
  const [viewType, setViewType] = useState("cards")
  const [filtered, setFiltered] = useState()
  const [sortBy, setSortBy] = useState("")
  const handleOnChange = useCallback((e) => {
    setSortBy(e.target.value)
  }, [])

  useMemo(() => {
    const query = searchQuery.toLowerCase();
    if (searchQuery.length > 0 && sortBy.length === 0) {
      setFiltered(cards?.filter(card => card?.title?.toLowerCase().includes(query)))
    } else if (sortBy.length > 0 && searchQuery.length === 0) {
      setFiltered(cards.filter((card) => (card.category === sortBy)))
    } else if (sortBy.length > 0 && searchQuery.length > 0) {
      let TempCards = []
      TempCards = (cards.filter((card) => (card.category === sortBy)))
      setFiltered(TempCards.filter(card => card?.title?.toLowerCase().includes(query)))
    } else {
      setFiltered(cards)
    }
  }, [cards, searchQuery, sortBy])

  useEffect(() => {
    handleGetCards();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDeleteCard = (cardId) => {
  
    handleDeleteCard(cardId);
  };

  return (
    <Container sx={{ direction: "rtl" }}>
      <PageHeader title="מתכונים" textAlign={"center"} />
      <Box display={"flex"} flexDirection={{ xs: "column", sm: "row" }} gap={2} mb={3} alignItems="center">
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
        <DataTable cards={filtered} />
      )}
      {viewType === 'cards' && (
        <Box mt={3}>
          <CardsFeedback
            pending={pending}
            error={error}
            cards={filtered}
            onDelete={onDeleteCard}
            setCards={setCards}
            searchQuery={searchQuery}
          />
        </Box>
      )}
    </Container>
  )
}

export default CardsPage