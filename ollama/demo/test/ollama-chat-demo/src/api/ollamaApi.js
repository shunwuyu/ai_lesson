import axios from 'axios';

// 创建 Axios 实例，配置基础 URL
const ollamaApi = axios.create({
  baseURL: 'http://localhost:11434/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 发送聊天请求到 Ollama
 * @param {Array} messages - 对话历史 [{role: 'user/assistant', content: '消息内容'}]
 * @returns {Promise<string>} AI 回复内容
 */
export const chatCompletions = async (messages) => {
  try {
    const response = await ollamaApi.post('/chat/completions', {
      model: 'deepseek-r1:1.5b', // 指定使用的模型
      messages: messages,         // 对话历史
      stream: false,              // 非流式输出
      temperature: 0.7,           // 随机性（可选，可调整）
    });

    // 提取 AI 回复内容（Ollama 接口兼容 OpenAI 格式）
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Ollama API 请求失败：', error);
    throw new Error(error.response?.data?.error || '请求 AI 失败，请检查 Ollama 是否启动');
  }
};

export default ollamaApi;