const generateShadowDom = () => {
  if (document.getElementById("visualizer-shadow-root")) {
    return
  };

  const domContainer = document.createElement("div");
  domContainer.id = "visualizer-shadow-root";
  domContainer.style.position = "fixed";
  domContainer.style.top = "0";
  domContainer.style.right = "0";
  domContainer.style.zIndex = "999999";
  domContainer.style.width = "100px";
  domContainer.style.height = "100px";
  domContainer.style.pointerEvents = "none";

  const shadowRoot = domContainer.attachShadow({ mode: "open"});
  document.body.appendChild(domContainer);

  const mountPoint = document.createElement("div");
  mountPoint.id = "react-shadow-root";
  shadowRoot.appendChild(mountPoint);

  const script = document.createElement("script");
  script.src = chrome.runtime.getURL("react-shadow-bundle.js");
  script.type = "module";
  document.head.appendChild(script);
};

generateShadowDom();