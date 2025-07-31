import React from "react";
import "./BtnOpenVisualizer.css";

function BtnOpenVisualizer(props) {
  return (
    <button>
      {props.children}
    </button>
  )
};

export default BtnOpenVisualizer;