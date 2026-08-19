// src/store/authStore.js
import { create } from 'zustand';
// Zustand 是一个轻量级 React 状态管理库，用极简 API 
// 创建全局 store，无需 Provider 包裹
export const useAuthStore = create(set => ({
  token: localStorage.getItem('token') || '',
  user: null,
  setAuth: ({ token, user }) => {
    localStorage.setItem('token', token);
    set({ token, user });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ token: '', user: null });
  }
}));
