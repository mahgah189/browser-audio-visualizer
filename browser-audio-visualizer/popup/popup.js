const btnOpenVisualizer = document.getElementById("btn-open-side-panel");

btnOpenVisualizer.addEventListener("click", async() => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tab?.id) {
    console.error("No active tab");
    return;
  }
  
  try {
    const streamId = await chrome.tabCapture.getMediaStreamId({
      targetTabId: tab.id,
    });
    await chrome.sidePanel.open({ windowId: tab.windowId });
  } catch (err) {
    console.error("getMediaStreamId Failed", err);
  }
});

// btnStartVisualizer.addEventListener("click", async () => {
//   const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
//   if (!tab?.id) {
//     console.error("No active tab");
//     return;
//   }
//   try {
//     const streamId = await chrome.tabCapture.getMediaStreamId({
//       targetTabId: tab.id,
//     });
//     chrome.runtime.sendMessage(
//       { action: "start-visualizer", streamId, capturedTabId: tab.id },
//       (response) => {
//         if (chrome.runtime.lastError) {
//           console.error(chrome.runtime.lastError);
//           return;
//         }
//         if (response?.success) {
//           console.log("Capture started; audio will keep playing.");
//         } else {
//           console.error("Capture failed", response?.error);
//         }
//       }
//     );
//   } catch (err) {
//     console.error("getMediaStreamId failed", err);
//   }
// });