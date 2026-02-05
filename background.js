const OFFSCREEN_REASON = "USER_MEDIA";
const OFFSCREEN_PATH = "offscreen/offscreen.html";

async function ensureOffscreenDocument(streamId) {
  const existingContexts = await chrome.runtime.getContexts({
    contextTypes: ["OFFSCREEN_DOCUMENT"],
    documentUrls: [chrome.runtime.getURL(OFFSCREEN_PATH)],
  });
  if (existingContexts.length > 0) {
    await chrome.offscreen.closeDocument();
  }
  await chrome.offscreen.createDocument({
    url: chrome.runtime.getURL(OFFSCREEN_PATH),
    reasons: [OFFSCREEN_REASON],
    justification: "Capture tab audio for visualization while keeping playback.",
  });
  // StreamId expires in a few seconds; give offscreen doc a moment to load then send it
  await new Promise((r) => setTimeout(r, 50));
  chrome.runtime.sendMessage({
    target: "offscreen",
    type: "start-capture",
    streamId,
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "start-visualizer") {
    const streamId = message.streamId;
    if (!streamId) {
      sendResponse({ success: false, error: "Missing streamId" });
      return true;
    }
    ensureOffscreenDocument(streamId)
      .then(() => sendResponse({ success: true }))
      .catch((err) => {
        console.error(err);
        sendResponse({ success: false, error: err.message });
      });
    return true;
  }
  return false;
});
