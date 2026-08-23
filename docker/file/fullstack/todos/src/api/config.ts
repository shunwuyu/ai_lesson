// src/api/request.ts
import axios from 'axios';

// 1. 创建独立的 axios 实例，避免污染全局配置
const service = axios.create({
  baseURL: '/api', // 统一请求前缀，配合 Nginx 反向代理
  timeout: 10000,  // 全局超时时间设置
});

// 2. 请求拦截器：在请求发出前统一处理（如注入 Token）
service.interceptors.request.use(
  (config) => {
    // 示例：从本地存储获取 token 并注入请求头
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. 响应拦截器：统一处理响应数据或全局错误
service.interceptors.response.use(
  (response) => {
    // 直接返回 response.data，省去业务代码中重复的 .data 解析
    return response.data;
  },
  (error) => {
    // 全局错误处理：例如 401 跳转登录页，或弹出全局提示框
    console.error('API Error:', error.message);
    return Promise.reject(error);
  }
);

export default service;