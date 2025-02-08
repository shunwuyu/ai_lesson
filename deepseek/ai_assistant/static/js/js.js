document.addEventListener("DOMContentLoaded", function () {
  // 获取元素
  const chatLogElement = document.getElementById('chat-log');
  const conversationListElement = document.getElementById('conversation-list');
  const messageInput = document.getElementById('message');
  const backToTopButton = document.getElementById('back-to-top');

  let messageLimit = 50; // 每次加载的消息数量
  let currentPage = 1;
  let hasMoreMessages = true;

  // 控制回到顶部按钮的显示和隐藏
  chatLogElement.addEventListener('scroll', () => {
    if (chatLogElement.scrollTop > 300) { // 根据需要调整这个值
      backToTopButton.style.display = 'block';
    } else {
      backToTopButton.style.display = 'none';
    }
  });

  // 点击回到顶部按钮时滚动到顶部
  backToTopButton.addEventListener('click', () => {
    chatLogElement.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // 打字效果函数
  const typeMessage = (element, message, doneCallback) => {
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < message.length) {
        element.textContent += message.charAt(index++);
      } else {
        clearInterval(intervalId);
        if (typeof doneCallback === 'function') {
          doneCallback();
        }
      }
    }, 50); // 控制打字速度，这里设置为50ms/字符
  };
  // typeMessage(chatLogElement, "你好，我是DeepSeek AI助手，很高兴为您服务！你好，我是DeepSeek AI助手，很高兴为您服务！你好，我是DeepSeek AI助手，很高兴为您服务！", () => {
  //   console.log('/////')
  // });
})