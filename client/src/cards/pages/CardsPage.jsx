import { Container } from '@mui/system';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import PageHeader from '../../components/PageHeader';
import CardsFeedback from '../components/CardsFeedback';
import useCards from '../hooks/useCards';
import { searchContext } from '../../providers/SearchProvider';
import FilterComp from '../../filters/FilterComp';
import { Box, IconButton, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import DataTable from '../../table/components/CardsTable';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableRowsIcon from '@mui/icons-material/TableRows';
import { getVisibleCards } from '../helpers/filterCards';

const CardsPage = () => {
  const { searchQuery } = useContext(searchContext)
  const { pending, error, cards, handleGetCards, setCards, handleDeleteCard } = useCards();
  const [viewType, setViewType] = useState("cards")
  const [sortBy, setSortBy] = useState("")
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const handleOnChange = useCallback((e) => {
    setSortBy(e.target.value)
  }, [])

  const filtered = useMemo(() => getVisibleCards(cards || [], searchQuery, sortBy), [cards, searchQuery, sortBy]);

  useEffect(() => {
    handleGetCards();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isMobile && viewType === 'table') setViewType('cards');
  }, [isMobile, viewType]);

  const onDeleteCard = (cardId) => {
  
    handleDeleteCard(cardId);
  };

  return (
    <Container sx={{ direction: "rtl" }}>
      <PageHeader title="מתכונים" textAlign={"center"} />
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