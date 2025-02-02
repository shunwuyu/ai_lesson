// 监听扩展图标点击事件
chrome.action.onClicked.addListener(async (tab) => {
  // 打开侧边栏
  await chrome.sidePanel.open({ windowId: tab.windowId });
  // 设置侧边栏标题
  await chrome.sidePanel.setOptions({
    tabId: tab.id,
    title: 'Kimi Translation & Summary',
    path: 'sidepanel.html'
  });
}); 