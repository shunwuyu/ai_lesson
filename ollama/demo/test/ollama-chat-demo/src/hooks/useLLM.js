import { useState, useCallback } from 'react';
import { chatCompletions } from '../api/ollamaApi';

/**
 * 自定义 Hooks：管理 LLM 聊天逻辑
 * @returns {Object} 包含对话列表、加载状态、错误信息、发送消息方法
 */
const useLLM = () => {
  // 对话历史：[{ role: 'user/assistant', content: '内容' }]
  const [messages, setMessages] = useState([]);
  // 加载状态
  const [loading, setLoading] = useState(false);
  // 错误信息
  const [error, setError] = useState(null);

  /**
   * 发送消息到 AI
   * @param {string} userInput - 用户输入的内容
   */
  const sendMessage = useCallback(async (userInput) => {
    // 空输入直接返回
    if (!userInput.trim() || loading) return;

    // 1. 添加用户消息到对话列表
    const userMessage = { role: 'user', content: userInput.trim() };
    setMessages(prev => [...prev, userMessage]);
    setError(null); // 清空之前的错误
    setLoading(true);

    try {
      // 2. 调用 API 获取 AI 回复
      const aiReply = await chatCompletions([...messages, userMessage]);
      // 3. 添加 AI 回复到对话列表
      const aiMessage = { role: 'assistant', content: aiReply };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      // 4. 捕获错误
      setError(err.message);
    } finally {
      // 5. 结束加载
      setLoading(false);
    }
  }, [messages, loading]);

  // 重置对话（可选，增强体验）
  const resetChat = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    loading,
    error,
    sendMessage,
    resetChat,
  };
};

export default useLLM;