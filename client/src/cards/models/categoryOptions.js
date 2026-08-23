const CATEGORY_OPTIONS = [
  { value: "ארוחות בשריות", label: "ארוחות בשריות" },
  { value: "ארוחות פרווה", label: "ארוחות פרווה" },
  { value: "ארוחות חלביות", label: "ארוחות חלביות" },
  { value: "דגים", label: "דגים" },
  { value: "סלטים", label: "סלטים" },
  { value: "קינוחים", label: "קינוחים" },
  { value: "עוגות ועוגיות", label: "עוגות ועוגיות" },
  { value: "פשטידות", label: "פשטידות" },
  { value: "לחמים", label: "לחמים" },
];

export const getCategoryLabel = (value) =>
  CATEGORY_OPTIONS.find((option) => option.value === value)?.label || value;

export default CATEGORY_OPTIONS;
