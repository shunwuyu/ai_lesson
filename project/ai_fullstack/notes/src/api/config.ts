import axios from 'axios';
import { useUserStore } from '@/store/user'; // 引入你的 store

const instance = axios.create({
  // baseURL: 'http://localhost:5173/api',
  baseURL: 'http://localhost:3000/api'
});

// 标记是否正在刷新 Token 的标志
let isRefreshing = false;
// 存储因为等待刷新 Token 而挂起的请求队列
let requestsQueue: any[] = [];

// 1. 请求拦截器
instance.interceptors.request.use((config) => {
  // 直接从 Zustand Store 中获取 accessToken (getState() 可以在组件外使用)
  const { accessToken } = useUserStore.getState();
  
  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
}, (error) => Promise.reject(error));

// 2. 响应拦截器
instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const { config, response } = error;

    // 如果状态码是 401，且不是刷新 Token 本身的接口报错
    if (response?.status === 401 && !config._retry) {
      
      // 如果已经在刷新中了，把后续请求加入队列
      if (isRefreshing) {
        return new Promise((resolve) => {
          requestsQueue.push((token: string) => {
            config.headers.Authorization = `Bearer ${token}`;
            resolve(instance(config));
          });
        });
      }

      config._retry = true; // 标记该请求已重试，避免死循环
      isRefreshing = true;

      try {
        const { refreshToken } = useUserStore.getState();
        
        // 调用后端刷新接口
        // 注意：这里使用原生 axios 或创建一个不带拦截器的实例，防止进入死循环
        const res = await axios.post('/auth/refresh', {}, {
          headers: { Authorization: `Bearer ${refreshToken}` }
        });

        const { access_token, refresh_token } = res.data.data; // 根据你后端返回结构调整

        // 核心：更新 Zustand Store（会自动触发 persist 存入 localStorage）
        useUserStore.setState({
          accessToken: access_token,
          refreshToken: refresh_token,
          isLogin: true
        });

        // 刷新成功，执行队列里的请求
        requestsQueue.forEach((callback) => callback(access_token));
        requestsQueue = [];

        // 执行当前报错的请求
        config.headers.Authorization = `Bearer ${access_token}`;
        return instance(config);

      } catch (refreshError) {
        // 连 Refresh Token 也过期了，直接强制登出
        useUserStore.getState().logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default instance;