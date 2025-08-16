import React from "react";
import { createRoot } from "react-dom/client";
import ModalContainer from "/src/components/shadow-modal/ModalContainer/ModalContainer.jsx";

const shadowRoot = document.getElementById("visualizer-shadow-host")?.shadowRoot;
const mount = shadowRoot?.getElementById("react-shadow-root");

if (mount) {
  console.log("mounting React");
  createRoot(mount).render(<ModalContainer />);
} else {
  console.error("React mount point not found");
};