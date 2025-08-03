// import React from "react";
// import { createRoot } from "react-dom/client";
// import VisualizerContainer from "/src/components/visualizer/VisualizerContainer/VisualizerContainer.jsx";

console.log('Content script loaded successfully!');

let shadowRoot = null;
// let reactRoot = null;

chrome.runtime.onMessage.addListener((message, sender, response) => {
  if (message.action === "openVisualizer") {
    openShadowModal();
    sendResponse({ success: "true" });
  }
  return true;
});

const openShadowModal = () => {
  if (shadowRoot) {
    return;
  } else {
    const hostElement = document.createElement("div");
    hostElement.id = "visualizer-shadow-host";
    hostElement.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 999999;
    `;

    document.body.appendChild(hostElement);

    shadowRoot = hostElement.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = `
      <style>
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999999;
        }
      </style>
      <div class="modal-overlay">
        <div id="react-container"></div>
      </div>
    `;

    // We're using querySelector because Shadow DOMs don't have access to getElementById.
    // const container = shadowRoot.querySelector("#react-container");
    // reactRoot = createRoot(container);
    // reactRoot.render(<VisualizerContainer />);
  }
};

// const closeModal = () => {
//   if (reactRoot) {
//     const hostElement = document.querySelector("#visualizer-shadow-host");

//     reactRoot.unmount();
//     reactRoot = null;
//     hostElement.remove();
//     shadowRoot = null;
//   }
// };