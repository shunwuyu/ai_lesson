import axios from 'axios';

// 配置后端地址
const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 60000, // 大模型推理较慢，超时时间设长一点
});

export const fetchCommitMessage = async (diffCode) => {
  const response = await apiClient.post('/generate-commit', {
    diff: diffCode
  });
  return response.data;
};