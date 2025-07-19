import { useState } from "react";
import BtnCaptureAudio from "./components/buttons/BtnCaptureAudio/BtnCaptureAudio.jsx";
// import "./App.css";

function App() {

  const styles = {
    top: '20px',
    right: '20px',
    width: '350px',
    height: '200px',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  };

  return (
    <div style={styles}>
      <BtnCaptureAudio>
        Record
      </BtnCaptureAudio>
    </div>
  )
};

export default App;
