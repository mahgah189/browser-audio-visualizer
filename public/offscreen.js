// console.log("[offscreen] offscreen.js loaded");

// chrome.runtime.onMessage.addListener(async (message) => {
//   if (message.target !== "offscreen") {
//     return;
//   }

//   console.log('[offscreen] received:', message);

//   if (message.type === "start-recording") {
//     const media = await navigator.mediaDevices.getUserMedia({
//       audio: {
//         mandatory: {
//           chromeMediaSource: "tab",
//           chromeMediaSourceId: message.data,
//         },
//       },
//     });

//     const output = new AudioContext();
//     const source = output.createMediaStreamSource(media);
//     source.connect(output.destination);
//     const analyser = output.createAnalyser();
//     source.connect(analyser);
//     analyser.fftSize = 2048; 

//     const bufferLength = analyser.frequencyBinCount;
    

//   }
// })