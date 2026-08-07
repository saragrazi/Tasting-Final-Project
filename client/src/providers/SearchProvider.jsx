import { createContext, useState } from "react";

export const searchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCleanUp = (ref) => {
    setSearchQuery("");
    ref.current.firstChild.value = "";
  };

  return (
    <searchContext.Provider
      value={{ searchQuery, setSearchQuery, handleChange, handleCleanUp, category, setCategory }}
    >
      {children}
    </searchContext.Provider>
  );
};
