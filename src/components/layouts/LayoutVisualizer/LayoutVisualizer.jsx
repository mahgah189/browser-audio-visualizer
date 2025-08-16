import React from "react";
import { Outlet } from "react-router-dom";
import ModalTitleBar from "/src/components/shadow-modal/ModalTitleBar/ModalTitleBar.jsx";
import "./LayoutVisualizer.css";

function LayoutVisualizer() {
  return (
    <>
      <ModalTitleBar />
      <Outlet />
    </>
  )
};

export default LayoutVisualizer;