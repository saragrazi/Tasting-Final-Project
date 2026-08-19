import React, { useCallback, useContext, useMemo, useState } from "react";
import { node } from "prop-types";
import ContactModal from "../components/ContactModal";

const ContactModalContext = React.createContext(null);

export const ContactModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openContactModal = useCallback(() => setIsOpen(true), []);
  const closeContactModal = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ openContactModal, closeContactModal }),
    [openContactModal, closeContactModal]
  );

  return (
    <ContactModalContext.Provider value={value}>
      {children}
      <ContactModal open={isOpen} onClose={closeContactModal} />
    </ContactModalContext.Provider>
  );
};

export const useContactModal = () => {
  const context = useContext(ContactModalContext);
  if (!context) throw new Error("useContactModal must be used within ContactModalProvider");
  return context;
};

ContactModalProvider.propTypes = {
  children: node.isRequired,
};
