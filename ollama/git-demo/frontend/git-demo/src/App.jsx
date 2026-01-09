import React, { useState } from 'react';
import CodeInput from './components/CodeInput';
import AiResult from './components/AiResult';
import { useCommitGenerator } from './hooks/useCommitGenerator';

function App() {
  const [diff, setDiff] = useState('');
  const { generate, loading, result, error } = useCommitGenerator();

  const handleGenerate = () => {
    if (diff.trim()) {
      generate(diff);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            DeepSeek 代码提交助手
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            基于 LangChain 和 Ollama 构建的本地 AI 工作流
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-6 sm:p-10">
          <CodeInput 
            value={diff} 
            onChange={setDiff} 
            onGenerate={handleGenerate}
            isLoading={loading}
          />
          
          <AiResult content={result} error={error} />
        </div>
      </div>
    </div>
  );
}

export default App;