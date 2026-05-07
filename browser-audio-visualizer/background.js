const OFFSCREEN_REASON = "USER_MEDIA";
const OFFSCREEN_PATH = "offscreen/offscreen.html";

let activeTabId = null;
chrome.tabs.onActivated.addListener(({ tabId }) => {
  activeTabId = tabId;
});

async function ensureOffscreenDocument(streamId, capturedTabId) {
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
  await new Promise((r) => setTimeout(r, 50));
  chrome.runtime.sendMessage({
    target: "offscreen",
    type: "start-capture",
    streamId,
    capturedTabId,
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "start-visualizer") {
    const streamId = message.streamId;
    const capturedTabId = message.capturedTabId;
    if (!streamId) {
      sendResponse({ success: false, error: "Missing streamId" });
      return true;
    }
  }
});

// Sidepanel code

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "btn-open-side-panel",
    title: "Open side panel",
    contexts: ["all"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "btn-open-side-panel") {
    chrome.sidePanel.open({ windowId: tab.windowId });
  }
});