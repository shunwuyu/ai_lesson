// src/utils/request.js
import axios from 'axios';
import { useAuthStore } from '../store/user';

const instance = axios.create({
  baseURL: '/api',
  timeout: 5000
});

// 自动携带 token
instance.interceptors.request.use(config => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default instance;
