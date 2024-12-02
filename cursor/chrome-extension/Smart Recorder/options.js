document.addEventListener("DOMContentLoaded", () => {
  const transcriptionList = document.getElementById("transcriptionList");
  const clearButton = document.getElementById("clearTranscriptions");

  function loadTranscriptions() {
    chrome.storage.local.get("transcriptions", (result) => {
      const transcriptions = result.transcriptions || [];
      transcriptionList.innerHTML = "";
      transcriptions.forEach((item, index) => {
        const div = document.createElement("div");
        div.textContent = `${index + 1}. ${new Date(item.date).toLocaleString()}: ${item.text}`;
        transcriptionList.appendChild(div);
      });
    });
  }

  clearButton.addEventListener("click", () => {
    chrome.storage.local.set({ transcriptions: [] }, () => {
      loadTranscriptions();
    });
  });

  loadTranscriptions();
});