import { createContext, useState } from "react";

export const PopUpContext = createContext({
  isPopUpOpen: false,
  setIsPopUpOpen: () => {},
});

export function PopUpProvider({ children }) {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  return (
    <PopUpContext.Provider value={{ isPopUpOpen, setIsPopUpOpen }}>
      {children}
    </PopUpContext.Provider>
  );
}
