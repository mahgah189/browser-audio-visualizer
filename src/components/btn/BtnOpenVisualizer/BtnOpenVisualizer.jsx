import React from "react";
import "./BtnOpenVisualizer.css";

function BtnOpenVisualizer(props) {
  const handleOpenVisualizer = async () => {
    try {
      const tab = (await chrome.tabs.query({ active: true, currentWindow: true }))[0];
      console.log(tab);

      if (!tab?.id) {
        console.error("No active tab found");
        return;
      }

      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"]
      });
      console.log("script executed");

      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Wait longer for script to initialize
      await new Promise(resolve => setTimeout(resolve, 1000));

      const response = await chrome.tabs.sendMessage(tab.id, { action: "openVisualizer" });
      console.log("the response", response);

      console.log("Visualizer opened");

      window.close();
    } catch (error) {
      console.log("error opening Visualizer", error);
    }
  };

  return (
    <div>
      <button
        onClick={handleOpenVisualizer}
      >
        {props.children}
      </button>
    </div>

  )
};

export default BtnOpenVisualizer;