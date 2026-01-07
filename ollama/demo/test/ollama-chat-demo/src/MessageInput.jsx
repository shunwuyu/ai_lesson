import { useState, useRef } from 'react';

const MessageInput = ({ send, loading }) => {
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  // 输入框回车发送
  const handleEnter = (e) => {
    if (e.key === 'Enter' && !loading) {
      send(input);
      setInput('');
      inputRef.current.focus();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 flex flex-col md:flex-row items-center justify-center px-4 py-3 md:px-6 md:py-4 bg-white border-t border-t-blue-100">
      <input
        type="text"
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleEnter}
        placeholder="输入你的消息..."
        className="w-full md:w-[70%] rounded-[25px] border border-blue-200 px-4 py-2 focus:outlinenone focus:ring-2 focus:ring-blue-300 transition duration-300 ease-in-out"
      />
      <button
        onClick={() => send(input)}
        disabled={loading}
        className="mt-2 md:mt-0 md:ml-4 bg-blue-500 text-white rounded-[25px] px-4 py-2 md:px-6 md:py-3 disabled:opacity-50 disabled:cursordefault transition duration-300 ease-in-out"
      >
        {loading ? '发送中...' : '发送'}
      </button>
    </div>
  );
};

export default MessageInput;