import React from "react";
import { createRoot } from "react-dom/client";
import VisualizerContainer from "/src/components/visualizer/VisualizerContainer/VisualizerContainer.jsx";

const shadowRoot = document.getElementById("visualizer-shadow-host")?.shadowRoot;
const mount = shadowRoot?.getElementById("react-shadow-root");

if (mount) {
  console.log("mounting React");
  createRoot(mount).render(<VisualizerContainer />);
} else {
  console.error("React mount point not found");
};