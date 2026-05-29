// 监听来自扩展程序其他部分（如 popup.js）发送的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // 检查接收到的消息的 action 属性是否为 "changeBackgroundColor"
    if (request.action === "changeBackgroundColor") {
        // 如果是，则将当前页面的背景颜色设置为绿色
        document.body.style.backgroundColor = "green";
    }
});