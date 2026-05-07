// Holds the captured tab stream, pipes to speakers, and sends frequency data for the overlay.
let audioContext = null;
let stream = null;
let analyser = null;
let intervalId = null;
let targetTabId = null;

function stopVisualizer() {
  if (intervalId != null) {
    clearInterval(intervalId);
    intervalId = null;
  }
  targetTabId = null;
}

function sendFrequencyData() {
  if (!analyser || targetTabId == null) return;
  const data = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(data);
  chrome.runtime.sendMessage({
    target: "background",
    type: "audioData",
    tabId: targetTabId,
    data: Array.from(data),
  });
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.target !== "offscreen" || message.type !== "start-capture") {
    return;
  }
  const streamId = message.streamId;
  targetTabId = message.capturedTabId ?? null;
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
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;
      source.connect(analyser);
      analyser.connect(audioContext.destination);
      audioContext.resume().then(() => {
        intervalId = setInterval(sendFrequencyData, 33);
      });
      sendResponse({ success: true });
    })
    .catch((err) => {
      console.error("getUserMedia failed", err);
      sendResponse({ success: false, error: err.message });
    });

  return true;
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.target === "offscreen" && message.type === "stop-capture") {
    stopVisualizer();
  }
});
