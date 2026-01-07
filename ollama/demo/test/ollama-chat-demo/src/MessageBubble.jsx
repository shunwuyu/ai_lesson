import React from 'react';


const MessageBubble = ({ content, isSent }) => {
  // 使用条件类名实现响应式布局
  const bubbleClass = `${
    isSent ? 'bg-blue-200 text-white' : 'bg-green-200 text-black'
  } p-4 rounded-[15px] rounded-${
    isSent ? 'tr-[20px] bl-[20px]' : 'tl-[20px] br-[20px]'
  } max-w-[90%] md:max-w-[60%] mb-2 mx-2 text-sm md:text-base break-words`;

  return (
    <div className="flex items-start">
      {!isSent && (
        <div className="w-8 h-8 rounded-full bg-green-500 mr-2 flex items-center justify-center">
          AI
        </div>
      )}

      <div className={bubbleClass}>
        {content}
        {isSent && (
          <div className="flex absolute right-0 bottom-0 items-center justify-center text-[10px] md:text-[12px] text-blue-400">
            {new Date().toLocaleTimeString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;