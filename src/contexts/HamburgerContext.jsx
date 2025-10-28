import { createContext, useState } from "react";

export const HamburgerContext = createContext({
  isHamburgerOpen: false,
  setIsHamburgerOpen: () => {},
});

export function HamburgerProvider ({ children }) {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  return (
    <HamburgerContext.Provider
      value={{ isHamburgerOpen, setIsHamburgerOpen }}
    >
      {children}
    </HamburgerContext.Provider>
  );
}
