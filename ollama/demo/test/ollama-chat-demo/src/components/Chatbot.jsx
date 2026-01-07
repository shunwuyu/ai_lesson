import { useState, useRef, useEffect } from 'react';
import useLLM from '../hooks/useLLM';

const Chatbot = () => {
  const [inputValue, setInputValue] = useState('');
  const { messages, loading, error, sendMessage, resetChat } = useLLM();
  const messagesEndRef = useRef(null); // 用于滚动到最新消息

  // 发送消息处理
  const handleSend = (e) => {
    e.preventDefault();
    sendMessage(inputValue);
    setInputValue(''); // 清空输入框
  };

  // 自动滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-6 px-4">
      {/* 聊天容器：响应式宽度（PC 最大 800px，手机 100%） */}
      <div className="w-full max-w-[800px] bg-white rounded-lg shadow-md flex flex-col h-[90vh] max-h-[800px]">
        {/* 顶部标题栏 */}
        <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">DeepSeek Chatbot</h2>
          <button
            onClick={resetChat}
            className="bg-white text-blue-600 px-3 py-1 rounded-md text-sm hover:bg-gray-100 transition"
            disabled={loading}
          >
            清空对话
          </button>
        </div>

        {/* 错误提示 */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 text-sm">
            ❌ {error}
          </div>
        )}

        {/* 对话列表 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 py-10">
              你好！我是基于 deepseek-r1:1.5b 的本地聊天助手，有什么可以帮你的？
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] px-4 py-3 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/* 加载中提示 */}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-200 px-4 py-3 rounded-lg max-w-[80%]">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-75"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            </div>
          )}

          {/* 滚动锚点 */}
          <div ref={messagesEndRef} />
        </div>

        {/* 输入框区域 */}
        <form onSubmit={handleSend} className="p-4 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="输入消息...按回车发送"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
              disabled={loading || !inputValue.trim()}
            >
              {loading ? '发送中...' : '发送'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;