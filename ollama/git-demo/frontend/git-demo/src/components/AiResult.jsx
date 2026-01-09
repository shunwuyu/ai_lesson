import React from 'react';

const AiResult = ({ content, error }) => {
  if (error) {
    return (
      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
        {error}
      </div>
    );
  }

  if (!content) return null;

  return (
    <div className="mt-8 animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          ✨ 生成结果
          <span className="text-xs font-normal px-2 py-0.5 bg-green-100 text-green-700 rounded-full">DeepSeek-R1</span>
        </h3>
        <button 
          onClick={() => navigator.clipboard.writeText(content)}
          className="text-sm text-indigo-600 hover:text-indigo-800"
        >
          复制
        </button>
      </div>
      <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
        <p className="font-mono text-gray-800 whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
};

export default AiResult;