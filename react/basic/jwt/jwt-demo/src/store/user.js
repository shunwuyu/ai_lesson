// src/store/authStore.js
import { create } from 'zustand';

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
