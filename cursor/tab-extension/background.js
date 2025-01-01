chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
      chrome.storage.sync.get(['domainGroups'], (result) => {
        const domainGroups = result.domainGroups || {};
        const url = new URL(tab.url);
        const domain = url.hostname;
  
        if (domainGroups[domain]) {
          const { groupName, groupColor } = domainGroups[domain];
          createOrAddToGroup(tabId, groupName, groupColor);
        } else {
          createOrAddToGroup(tabId, 'Default', '#808080');
        }
      });
    }
  });
  
  function createOrAddToGroup(tabId, groupName, groupColor) {
    chrome.tabGroups.query({ title: groupName }, (groups) => {
      if (groups.length > 0) {
        chrome.tabs.group({ tabIds: tabId, groupId: groups[0].id });
      } else {
        chrome.tabGroups.create({ tabIds: tabId, title: groupName, color: groupColor });
      }
    });
  }