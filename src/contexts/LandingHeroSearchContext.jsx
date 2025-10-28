import { createContext, useState } from "react";

export const LandingHeroSearchContext = createContext({
  isSearchOpen: false,
  setIsSearchOpen: () => {},
});

export function LandingHeroSearchProvider({ children }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <LandingHeroSearchContext.Provider
      value={{ isSearchOpen, setIsSearchOpen }}
    >
      {children}
    </LandingHeroSearchContext.Provider>
  );
}
