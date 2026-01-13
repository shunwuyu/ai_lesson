import axios from 'axios';

// 定义 API 基础配置（实际项目中建议封装在 axios 实例中）
export const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // 替换你的真实后端地址
  timeout: 5000,
});



