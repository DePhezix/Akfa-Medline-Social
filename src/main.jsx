import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { PopUpProvider } from "./contexts/PopupContext";
import { LoadingProvider } from "./contexts/LoadingContext";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <PopUpProvider>
          <App />
        </PopUpProvider>
      </LoadingProvider>
    </BrowserRouter>
  </StrictMode>
);
