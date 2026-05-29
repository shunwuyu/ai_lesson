import { FC, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';


const MessageList = ({ messages }) => {
  const containerRef = useRef(null);

  // 自动滚动到底部
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      // 平滑滚动到最新消息
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col h-screen overflow-y-auto px-4 md:px-8"
    >
      {messages.map((message, index) => (
        <div key={index} className="mb-2">
          <MessageBubble
            content={message.content}
            isSent={message.role === 'user'}
          />
        </div>
      ))}
    </div>
  );
};

export default MessageList;