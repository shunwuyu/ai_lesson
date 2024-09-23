document.addEventListener('DOMContentLoaded', function() {
    const changeBgBtn = document.getElementById('change-bg-btn');
    const status = document.getElementById('status');
  
    changeBgBtn.addEventListener('click', () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
          const activeTab = tabs[0];
          chrome.scripting.executeScript({
            target: { tabId: activeTab.id },
            function: changeBackgroundColor
          }).then(() => {
            status.textContent = '背景色已更改';
          }).catch(error => {
            console.error('Error executing script:', error);
          });
        }
      });
    });
  
    function changeBackgroundColor() {
      document.body.style.backgroundColor = 'green';
    }
  });