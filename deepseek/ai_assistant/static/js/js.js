document.addEventListener("DOMContentLoaded", function () {
  // 获取元素
  const chatLogElement = document.getElementById('chat-log');
  const conversationListElement = document.getElementById('conversation-list');
  const messageInput = document.getElementById('message');
  const backToTopButton = document.getElementById('back-to-top');
  const loadingIndicator = document.querySelector('.loading-indicator');

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

   // 添加消息到聊天记录，并添加复制按钮
   const appendMessage = (role, content, type='add') => {
    const messageWrapper = document.createElement('div');
    messageWrapper.classList.add('message', role);

    const bubble = document.createElement('div');
    bubble.classList.add('bubble', `${role}-bubble`);

    if (role === 'assistant') {
      typeMessage(bubble, content, () => addCopyButton(messageWrapper, content));
    } else {
      bubble.textContent = content;
      messageWrapper.appendChild(bubble);
      chatLogElement.scrollTop = chatLogElement.scrollHeight;
    }

    if (role === 'assistant') {
      const avatar = document.createElement('img');
      avatar.src = 'img/assistant-avatar.png'; // 确保路径正确
      avatar.alt = 'Assistant Avatar';
      avatar.className = 'avatar';
      messageWrapper.appendChild(avatar);
    }

    messageWrapper.appendChild(bubble);
    chatLogElement.appendChild(messageWrapper);
    chatLogElement.scrollTop = chatLogElement.scrollHeight;

    if (type !== 'init') {
      saveChatLog(role, content);
    }
  };

  const saveChatLog = (role, content) => {
    const chatLog = JSON.parse(localStorage.getItem('chatLog')) || [];
    chatLog.push({
      role,
      content
    });
    localStorage.setItem('chatLog', JSON.stringify(chatLog));
  };

   // 添加复制按钮
   const addCopyButton = (messageWrapper, content) => {
    const copyButton = document.createElement('button');
    copyButton.innerHTML = '<i class="fas fa-copy"></i>';
    copyButton.classList.add('copy-button');

    copyButton.addEventListener('click', () => {
      navigator.clipboard.writeText(content).then(() => {
        alert('内容已复制到剪贴板！');
      }).catch(err => {
        console.error('无法复制文本: ', err);
        alert('复制失败，请尝试手动选择并复制。');
      });
    });

    messageWrapper.appendChild(copyButton);
  };

  // appendMessage('assistant', 'I am DeepSeek AI assistant, how can I help you?');
  // appendMessage('user', '你好')
  // 对话历史管理
  const loadChatLog = () => {
    const chatLog = JSON.parse(localStorage.getItem('chatLog')) || [];
    // 最后messageLimit条消息
    // slice方法用于从数组中提取一部分元素，并返回一个新的数组
    // start end  起始 结束
    chatLog.slice(-messageLimit).forEach(({
      role,
      content
    }) => appendMessage(role, content, 'init')); // 只加载最后N条消息
  };

  const loadConversationList = () => {
    const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
    console.log(chatHistory, '/////')
    chatHistory.forEach((conversation, index) => {
      const button = document.createElement('button');
      button.innerHTML = `对话 ${index + 1} <span class="delete-btn" data-index="${index}">x</span>`;
      button.addEventListener('click', () => loadConversation(index));
      conversationListElement.appendChild(button);
    });
  };

  const updateConversationList = () => {
    conversationListElement.innerHTML = '';
    loadConversationList();
  };

  const saveCurrentConversation = () => {
    const currentChatLog = JSON.parse(localStorage.getItem('chatLog')) || [];
    const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
    const timestamp = new Date().toLocaleString();
    chatHistory.push({
      name: `对话 ${chatHistory.length + 1} (${timestamp})`,
      messages: currentChatLog
    });
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    updateConversationList();
  };

  const loadConversation = (index) => {
    const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
    const conversation = chatHistory[index].messages || [];
    chatLogElement.innerHTML = '';
    conversation.slice(-messageLimit).forEach(({
      role,
      content
    }) => appendMessage(role, content)); // 只加载最后N条消息
    localStorage.setItem('chatLog', JSON.stringify(conversation));
    currentPage = 1;
    hasMoreMessages = true;
  };
  
  const startNewConversation = () => {
    saveCurrentConversation();
    localStorage.removeItem('chatLog');
    chatLogElement.innerHTML = '';
    currentPage = 1;
    hasMoreMessages = true;
  };

  const sendMessage = (message) => {
    return fetch('/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages:[
          {"role": "user", "content": message},
        ],
        temperature: 0.7
      }),
    }).then(res => res.json())
    .then(data => {
      return data.message
    })
  }

  // 发送消息的点击处理程序
  document.querySelector('.send-icon').addEventListener('click', async () => {
    // showLoadingIndicator();
    const messageText = messageInput.value.trim();
    if (messageText) {
      appendMessage('user', messageText);
      messageInput.value = '';

      try {
        showLoadingIndicator();
        const assistantMessage = await sendMessage(messageText);
        hideLoadingIndicator();
        console.log(assistantMessage, '?????')
        appendMessage('assistant', assistantMessage);
      } catch (error) {
        console.error('发送消息时出错:', error);
        appendMessage('assistant', '抱歉，我遇到了一个问题，无法回复。');
      }
    }
  });

  // 监听Enter键发送消息
  messageInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && !event.shiftKey) { // 按下Enter键但不是Shift + Enter
      event.preventDefault(); // 防止换行
      document.querySelector('.send-icon').click(); // 触发发送按钮点击事件
    }
  });

  // 加载指示器
  const showLoadingIndicator = () => {
    if (loadingIndicator) {
      loadingIndicator.style.display = 'block';
    }
  };

  const hideLoadingIndicator = () => {
    if (loadingIndicator) {
      loadingIndicator.style.display = 'none';
    }
  };

  // 初始化状态
  loadChatLog();
  loadConversationList();
  
  // 全局能访问
  window.startNewConversation = startNewConversation;
  window.saveCurrentConversation = saveCurrentConversation;
})