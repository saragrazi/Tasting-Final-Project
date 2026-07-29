import { getVisibleCards } from "./filterCards";

describe("getVisibleCards", () => {
  it("sorts cards by highest average rating first", () => {
    const cards = [
      { _id: "1", title: "A", category: "desserts", averageRating: 3.5, reviews: [] },
      { _id: "2", title: "B", category: "desserts", averageRating: 4.5, reviews: [] },
      { _id: "3", title: "C", category: "salads", averageRating: 2.5, reviews: [] },
    ];

    const visibleCards = getVisibleCards(cards, "", "");

    expect(visibleCards.map((card) => card._id)).toEqual(["2", "1", "3"]);
  });

  it("filters cards by search text and category", () => {
    const cards = [
      { _id: "1", title: "Apple pie", category: "pies", averageRating: 4.2, reviews: [] },
      { _id: "2", title: "Greek salad", category: "salads", averageRating: 4.8, reviews: [] },
      { _id: "3", title: "Chocolate cake", category: "pies", averageRating: 4.1, reviews: [] },
    ];

    const visibleCards = getVisibleCards(cards, "pie", "pies");

    expect(visibleCards.map((card) => card._id)).toEqual(["1"]);
  });
});
