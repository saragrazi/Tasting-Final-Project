import { useCallback, useRef, useState } from "react";

const PAGE_SIZE = 40;

const usePaginatedCards = (fetchFn) => {
  const [cards, setCards] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(null);
  const filtersRef = useRef({ search: "", category: "" });

  const fetchPage = useCallback(
    async (nextPage, filters, append) => {
      try {
        setPending(true);
        setError(null);
        const { cards: newCards, total: newTotal } = await fetchFn({
          page: nextPage,
          limit: PAGE_SIZE,
          search: filters.search,
          category: filters.category,
        });
        setTotal(newTotal);
        setPage(nextPage);
        setCards((prev) => (append ? [...prev, ...newCards] : newCards));
      } catch (err) {
        setError(err);
      } finally {
        setPending(false);
      }
    },
    [fetchFn]
  );

  const reload = useCallback(
    (filters = {}) => {
      filtersRef.current = {
        search: filters.search || "",
        category: filters.category || "",
      };
      return fetchPage(1, filtersRef.current, false);
    },
    [fetchPage]
  );

  const loadMore = useCallback(() => {
    return fetchPage(page + 1, filtersRef.current, true);
  }, [fetchPage, page]);

  const removeCard = useCallback((cardId) => {
    setCards((prev) => prev.filter((c) => c._id !== cardId));
    setTotal((prev) => Math.max(0, prev - 1));
  }, []);

  const hasMore = cards.length < total;

  return { cards, total, pending, error, hasMore, reload, loadMore, setCards, removeCard };
};

export default usePaginatedCards;
