import { lazy } from "react";

const importCardsTable = () => import("./CardsTable");

const LazyCardsTable = lazy(importCardsTable);

export const preloadCardsTable = importCardsTable;

export default LazyCardsTable;
