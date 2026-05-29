import React from 'react';

const CodeInput = ({ value, onChange, onGenerate, isLoading }) => {
  return (
    <div className="flex flex-col gap-4">
      <label className="text-sm font-bold text-gray-700">
        Git Diff 代码片段
      </label>
      <textarea
        className="w-full h-64 p-4 text-sm font-mono text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
        placeholder="粘贴你的 git diff..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        onClick={onGenerate}
        disabled={isLoading || !value}
        className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors
          ${isLoading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg'
          }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            AI 正在推理中...
          </span>
        ) : '生成 Commit 日志'}
      </button>
    </div>
  );
};

export default CodeInput;