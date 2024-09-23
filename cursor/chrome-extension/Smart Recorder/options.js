document.addEventListener('DOMContentLoaded', () => {
  const apiKeyInput = document.getElementById('apiKey');
  const saveButton = document.getElementById('saveButton');
  const status = document.getElementById('status');

  // 加载保存的 API Key
  chrome.storage.sync.get(['apiKey'], function(data) {
    if (data.apiKey) {
      apiKeyInput.value = data.apiKey;
    }
  });

  // 保存 API Key
  saveButton.addEventListener('click', () => {
    const apiKey = apiKeyInput.value;
    chrome.storage.sync.set({apiKey: apiKey}, function() {
      status.textContent = 'API Key 已保存';
      setTimeout(() => {
        status.textContent = '';
      }, 3000);
    });
  });
});
