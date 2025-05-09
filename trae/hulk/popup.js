// 当整个 HTML 文档加载完成后执行回调函数
document.addEventListener('DOMContentLoaded', function() {
    // 通过元素的 ID 获取改变颜色的按钮元素
    const changeColorButton = document.getElementById('changeColorButton');
    // 为按钮添加点击事件监听器，当按钮被点击时执行回调函数
    changeColorButton.addEventListener('click', function() {
        // 查询当前活动窗口中的活动标签页
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            // 向查找到的活动标签页发送消息，请求改变背景颜色
            chrome.tabs.sendMessage(tabs[0].id, {action: "changeBackgroundColor"});
        });
    });
});