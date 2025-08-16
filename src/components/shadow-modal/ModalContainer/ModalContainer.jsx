import React from "react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import LayoutVisualizer from "/src/components/layouts/LayoutVisualizer/LayoutVisualizer.jsx";
import VisualizerContainer from "/src/components/visualizer/VisualizerContainer/VisualizerContainer.jsx";
import "./ModalContainer.css";

function ModalContainer() {
  return (
    <MemoryRouter>
      <Routes>
        <Route element={<LayoutVisualizer />}>
          <Route path="/" element={<VisualizerContainer />} />
        </Route>
      </Routes>
    </MemoryRouter>
  )
};

export default ModalContainer;