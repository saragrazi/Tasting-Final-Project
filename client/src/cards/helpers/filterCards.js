export const getVisibleCards = (cards = [], searchQuery = "", sortBy = "") => {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filtered = cards.filter((card) => {
    const matchesCategory = !sortBy || card.category === sortBy;
    const matchesSearch = !normalizedQuery || card.title?.toLowerCase().includes(normalizedQuery);
    return matchesCategory && matchesSearch;
  });

  return [...filtered].sort((a, b) => {
    const ratingA = Number(a.averageRating || 0);
    const ratingB = Number(b.averageRating || 0);
    if (ratingA === ratingB) {
      return (b.ratings?.length || 0) - (a.ratings?.length || 0);
    }
    return ratingB - ratingA;
  });
};
