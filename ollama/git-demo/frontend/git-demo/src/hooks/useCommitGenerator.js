import { useState } from 'react';
import { fetchCommitMessage } from '../api/aiService';

export const useCommitGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState(null);

  const generate = async (diff) => {
    // 状态重置
    setLoading(true);
    setError(null);
    setResult('');

    try {
      const data = await fetchCommitMessage(diff);
      if (data && data.result) {
        setResult(data.result);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "生成失败，请检查后端服务");
    } finally {
      setLoading(false);
    }
  };

  return {
    generate,
    loading,
    result,
    error
  };
};