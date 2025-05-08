import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Handle redirect from 404.html for GitHub Pages
const redirectPath = new URLSearchParams(window.location.search).get("redirect");
if (redirectPath) {
  window.history.replaceState(null, "", redirectPath);
}

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <App />
  // </StrictMode>
);
