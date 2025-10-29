import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { WaitingListProvider } from "./contexts/JoinWaitingListContext";
import { HamburgerProvider } from "./contexts/HamburgerContext";
import { LoadingProvider } from "./contexts/LoadingContext";
import { LandingHeroSearchProvider } from "./contexts/LandingHeroSearchContext";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <HamburgerProvider>
          <WaitingListProvider>
            <LandingHeroSearchProvider>
              <App />
            </LandingHeroSearchProvider>
          </WaitingListProvider>
        </HamburgerProvider>
      </LoadingProvider>
    </BrowserRouter>
  </StrictMode>
);
