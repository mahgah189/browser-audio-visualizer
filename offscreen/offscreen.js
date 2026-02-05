// Pipe captured tab audio to speakers so the user still hears it while we capture.
let audioContext = null;
let stream = null;

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.target !== "offscreen" || message.type !== "start-capture") {
    return;
  }
  const streamId = message.streamId;
  if (!streamId) {
    sendResponse({ success: false, error: "No streamId" });
    return true;
  }

  navigator.mediaDevices
    .getUserMedia({
      audio: {
        mandatory: {
          chromeMediaSource: "tab",
          chromeMediaSourceId: streamId,
        },
      },
      video: false,
    })
    .then((mediaStream) => {
      stream = mediaStream;
      audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(audioContext.destination);
      sendResponse({ success: true });
    })
    .catch((err) => {
      console.error("getUserMedia failed", err);
      sendResponse({ success: false, error: err.message });
    });

  return true;
});
