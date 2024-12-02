let mediaRecorder;
let audioChunks = [];

console.log("chrome object:", chrome);
console.log("chrome.tabCapture:", chrome.tabCapture);

if (!chrome.tabCapture) {
  console.error("chrome.tabCapture is not available. Make sure you have the correct permissions in manifest.json");
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "startRecording") {
    startRecording();
  } else if (request.action === "stopRecording") {
    stopRecording();
  }
});

function startRecording() {
  if (chrome.tabCapture) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      const tab = tabs[0];
      chrome.tabCapture.capture(
        {audio: true, video: false, tabId: tab.id},
        handleStream
      );
    });
  } else {
    // 如果 tabCapture 不可用，尝试使用 getUserMedia
    navigator.mediaDevices.getUserMedia({audio: true, video: false})
      .then(handleStream)
      .catch(error => {
        console.error("Error accessing media devices:", error);
      });
  }
}

function handleStream(stream) {
  if (chrome.runtime.lastError) {
    console.error(chrome.runtime.lastError);
    return;
  }
  
  mediaRecorder = new MediaRecorder(stream);
  audioChunks = [];

  mediaRecorder.ondataavailable = (event) => {
    audioChunks.push(event.data);
  };

  mediaRecorder.onstop = () => {
    const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
    transcribeAudio(audioBlob);
    stream.getTracks().forEach(track => track.stop());
  };

  mediaRecorder.start();
}

function stopRecording() {
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    mediaRecorder.stop();
  }
}

function transcribeAudio(audioBlob) {
  console.log("Transcribing audio...");
  // 模拟转写结果
  const transcription = "This is a sample transcription.";
  saveTranscription(transcription);
}

function saveTranscription(transcription) {
  chrome.storage.local.get("transcriptions", (result) => {
    const transcriptions = result.transcriptions || [];
    transcriptions.push({
      date: new Date().toISOString(),
      text: transcription,
    });
    chrome.storage.local.set({ transcriptions: transcriptions });
  });
}