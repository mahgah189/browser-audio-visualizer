import React from "react";
import BtnOpenVisualizer from "/src/components/btn/BtnOpenVisualizer/BtnOpenVisualizer.jsx";
import "./Popup.css";

function Popup() {
  return (
    <div className="popup-container">
      <div className="popup-header">
        <h1>Browser Audio Visualizer</h1>
      </div>
      <BtnOpenVisualizer>Open Visualizer</BtnOpenVisualizer>
    </div>
  );
};

export default Popup;