document.getElementById('save').addEventListener('click', () => {
    const domain = document.getElementById('domain').value;
    const groupName = document.getElementById('groupName').value;
    const groupColor = document.getElementById('groupColor').value;
  
    if (domain && groupName) {
      chrome.storage.sync.get(['domainGroups'], (result) => {
        const domainGroups = result.domainGroups || {};
        domainGroups[domain] = { groupName, groupColor };
        chrome.storage.sync.set({ domainGroups }, () => {
          document.getElementById('message').textContent = '保存成功';
          setTimeout(() => {
            window.close();
          }, 1000);
        });
      });
    } else {
      document.getElementById('message').textContent = '请填写所有字段';
    }
  });