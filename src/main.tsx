import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./assets/styles/index.scss";
import App from "./components/App/App";

const container = document.getElementById("root") as HTMLElement;

if (container) {
  createRoot(container).render(
    <StrictMode>
      <ThemeProvider>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </ThemeProvider>
    </StrictMode>,
  );
}
