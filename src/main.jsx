import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { PopUpProvider } from "./contexts/PopupContext";
import { LoadingProvider } from "./contexts/LoadingContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <LoadingProvider>
        <PopUpProvider>
          <App />
        </PopUpProvider>
      </LoadingProvider>
  </StrictMode>
);
