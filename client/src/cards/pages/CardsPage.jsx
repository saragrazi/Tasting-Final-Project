import { Container } from '@mui/system';
import React, { Suspense, useCallback, useContext, useEffect, useState } from 'react'
import PageHeader from '../../components/PageHeader';
import CardsFeedback from '../components/CardsFeedback';
import Spinner from '../../components/Spinner';
import useCards from '../hooks/useCards';
import usePaginatedCards from '../hooks/usePaginatedCards';
import { getCardsBrowse } from '../services/cardService';
import { searchContext } from '../../providers/SearchProvider';
import FilterComp from '../../filters/FilterComp';
import { Box, Button, IconButton, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import DataTable, { preloadCardsTable } from '../../table/components/LazyCardsTable';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableRowsIcon from '@mui/icons-material/TableRows';

const CardsPage = () => {
  const { searchQuery, setCategory } = useContext(searchContext)
  const { handleDeleteCard } = useCards();
  const { cards, pending, error, hasMore, reload, loadMore, setCards, removeCard } = usePaginatedCards(getCardsBrowse);
  const [viewType, setViewType] = useState("cards")
  const [sortBy, setSortBy] = useState("")
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const handleOnChange = useCallback((e) => {
    setSortBy(e.target.value)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      reload({ search: searchQuery, category: sortBy });
    }, 350);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, sortBy]);

  useEffect(() => {
    if (isMobile && viewType === 'table') setViewType('cards');
  }, [isMobile, viewType]);

  useEffect(() => {
    setCategory(sortBy);
    return () => setCategory("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy]);

  const onDeleteCard = (cardId) => {
    handleDeleteCard(cardId);
    removeCard(cardId);
  };

  const getEmptyMessage = () => {
    if (searchQuery) {
      return sortBy
        ? `לא נמצאו מתכונים בקטגוריית "${sortBy}" התואמים לחיפוש "${searchQuery}".`
        : `לא נמצאו מתכונים התואמים לחיפוש "${searchQuery}".`;
    }
    if (sortBy) return `אין עדיין מתכונים בקטגוריית "${sortBy}".`;
    return "עדיין אין מתכונים באתר.";
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
          <DataTable cards={cards} />
        </Suspense>
      )}
      {viewType === 'cards' && (
        <Box mt={3}>
          <CardsFeedback
            pending={pending}
            error={error}
            cards={cards}
            onDelete={onDeleteCard}
            setCards={setCards}
            removeCard={removeCard}
            searchQuery={searchQuery}
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
  )
}

export default CardsPage
