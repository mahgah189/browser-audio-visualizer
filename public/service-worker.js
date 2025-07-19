console.log("[service-worker] running");

chrome.action.onClicked.addListener(async (tab) => {
  console.log('[service-worker] icon clicked');

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"]
  });

  // check contexts for an offscreen document
  const getContextsAsync = () => {
    return new Promise((resolve) => {
      chrome.runtime.getContexts({}, resolve);
    });
  }

  const existingContexts = await getContextsAsync();
  let recording = false;

  // return true if an offscreen document was found
  const offscreenDocument = existingContexts.find((context) => {
    return context.contextType === "OFFSCREEN_DOCUMENT";
  });

  if (!offscreenDocument) {
    await chrome.offscreen.createDocument({
      url: "offscreen.html",
      reasons: ["USER_MEDIA"],
      justification: "Capturing audio from chrome.tabCapture API"
    });
  } else {
    recording = offscreenDocument.documentUrl.endsWith("#recording");
  }

  if (recording) {
    chrome.runtime.sendMessage({
      type: "stop-recording",
      target: "offscreen"
    });
    return;
  }

  const streamId = await chrome.tabCapture.getMediaStreamId({
    targetTabId: tab.id
  });

  chrome.runtime.sendMessage(
    {
      type: 'start-recording',
      target: 'offscreen',
      data: streamId
    },
    (response) => {
      const err = chrome.runtime.lastError;
      if (err) {
        console.error('[service-worker] Message failed:', err.message);
      } else {
        console.log('[service-worker] Message acknowledged:', response);
      }
    }
  );
});

console.log('[service-worker] loaded');
chrome.runtime.onInstalled.addListener(() => {
  console.log('[service-worker] onInstalled fired');
});