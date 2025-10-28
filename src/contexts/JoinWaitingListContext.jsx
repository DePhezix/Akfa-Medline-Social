import { createContext, useState } from "react";

export const WaitingListContext = createContext({
  isOpen: false,
  setIsOpen: () => {},
});

export function WaitingListProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <WaitingListContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </WaitingListContext.Provider>
  );
}
