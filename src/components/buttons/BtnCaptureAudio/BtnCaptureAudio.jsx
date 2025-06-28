import React from "react";
import "./BtnCaptureAudio.css";

function BtnCaptureAudio(props) {
  // const [record, toggleRecord] = React.useState(false);

  // React.useEffect(() => {
  //   toggleTabAudioCapture();
  // }, [record]);

  // const toggleTabAudioCapture = async () => {
  //   const arrayTab = await chrome.tabs.query({
  //     active: true,
  //     currentWindow: true
  //   });

  //   const tab = arrayTab[0];
  //   console.log(tab);

  //   // check contexts for an offscreen document
  //   const getContextsAsync = () => {
  //     return new Promise((resolve) => {
  //       chrome.runtime.getContexts({}, resolve);
  //     });
  //   }

  //   const existingContexts = await getContextsAsync();
  //   let recording = false;

  //    // return true if an offscreen document was found
  //   const offscreenDocument = existingContexts.find((context) => {
  //     return context.contextType === "OFFSCREEN_DOCUMENT";
  //   });

  //   if (!offscreenDocument) {
  //     await chrome.offscreen.createDocument({
  //       url: "offscreen.html",
  //       reasons: ["USER_MEDIA"],
  //       justification: "Capturing audio from chrome.tabCapture API"
  //     });
  //   } else {
  //     recording = offscreenDocument.documentUrl.endsWith("#recording");
  //   }

  //   if (recording) {
  //     chrome.runtime.sendMessage({
  //       type: "stop-recording",
  //       target: "offscreen"
  //     });
  //     return;
  //   }

  //   const streamId = await chrome.tabCapture.getMediaStreamId({
  //     targetTabId: tab.id
  //   });

  //   chrome.runtime.sendMessage({
  //     type: "start-recording",
  //     target: "offscreen",
  //     data: streamId
  //   });
  // };
  
  return (
    <button
      // onClick={() => {
      //   toggleRecord(!record);
      // }}
    >
      {props.children}
    </button>
  )
};

export default BtnCaptureAudio;