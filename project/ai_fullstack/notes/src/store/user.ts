// userStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { doLogin, getUser, getAiAvatar } from '../api/user';
import type { User } from '../types/index';
interface UserStore {
  user: User | null;
  isLogin: boolean;
  login: (credentials: { name: string; password: string }) => Promise<void>;
  logout: () => void;
  getUser: () => void;
  aiAvatar: () => void;
}

export const useUserStore = create<UserStore>()(
  persist((set) => ({
  user: null,
  isLogin: false,

  login: async ({ name = '', password = '' }) => {
    const res = await doLogin({ name, password });
    // 假设 res.data 结构为 { token: string; data: User }
    const { token, data: user } = res.data;
    // const { access_token: token, data: user } = res.data;
    localStorage.setItem('token', token);
    set({
      user,
      isLogin: true,
    });
  },

  logout: () => {
    localStorage.removeItem('token');
    set({
      user: null,
      isLogin: false,
    });
  },
  getUser: async () => {
    if (!localStorage.getItem('token')) {
      return;
    }
    const data = await getUser();
    console.log(data, '))))))))))))))))))))))))');
    set({
      isLogin: true,
      user: data.data.data
    })
  },
  aiAvatar: async () => {
    const res = await getAiAvatar();
    console.log(res, '???');
  }
  }),{
      name: 'user-store', // localStorage key
      partialize: (state) => ({
        user: state.user,
        isLogin: state.isLogin,
      }),
  }), 
  
);