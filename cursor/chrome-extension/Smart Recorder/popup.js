document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("startRecording");
  const stopButton = document.getElementById("stopRecording");

  startButton.addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "startRecording" });
    startButton.disabled = true;
    stopButton.disabled = false;
  });

  stopButton.addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "stopRecording" });
    startButton.disabled = false;
    stopButton.disabled = true;
  });
});