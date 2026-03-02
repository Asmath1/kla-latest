import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/PdfViewer.css";
import "./styles/table-accordion.css";
// run global table -> mobile accordion script
import "./lib/tableAccordion";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
