console.log('Content script loaded successfully!');

let shadowRoot = null;

chrome.runtime.onMessage.addListener((message, sender, response) => {
  if (message.action === "openVisualizer") {
    openShadowModal();
  }
  return true;
});

const openShadowModal = () => {
  if (shadowRoot) {
    closeModal();
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
        <div id="react-shadow-root"></div>
      </div>
    `;

    const script = document.createElement("script");
    script.src = chrome.runtime.getURL("react-shadow-bundle.js");
    script.type = "module";
    document.head.appendChild(script);
  }
};

const closeModal = () => {
  if (shadowRoot) {
    const hostElement = document.querySelector("#visualizer-shadow-host");
    hostElement.remove();
    shadowRoot = null;
  }
};