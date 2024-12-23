// 创建右键菜单项
chrome.contextMenus.create({
    id: "translateWithGoogle",
    title: "使用谷歌进行翻译",
    contexts: ["selection"]
  });
  
  // 监听右键菜单点击事件
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "translateWithGoogle" && info.selectionText) {
      const selectedText = encodeURIComponent(info.selectionText);
      const url = `https://translate.google.com/?sl=auto&tl=en&text=${selectedText}`;
      chrome.tabs.create({ url: url });
    }
  });