import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

const shadowRoot = document.getElementById("visualizer-shadow-root")?.shadowRoot;
const mount = shadowRoot?.getElementById("react-shadow-root");

if (mount) {
  createRoot(shadowRoot).render(<App />);
} else {
  console.error("React mount point not found");
}