import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { doLogin, getUser, getAiAvatar } from '../api/user';
import type { User } from '../types/index';

interface UserStore {
  user: User | null;
  isLogin: boolean;
  accessToken: string | null; // 新增
  refreshToken: string | null; // 新增
  login: (credentials: { name: string; password: string }) => Promise<void>;
  logout: () => void;
  getUser: () => void;
  aiAvatar: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      isLogin: false,
      accessToken: null, // 初始化
      refreshToken: null, // 初始化

      login: async ({ name = '', password = '' }) => {
        const res = await doLogin({ name, password });
        
        // 假设返回结构中包含 access_token 和 refresh_token
        const { access_token, refresh_token, data: user } = res.data;

        // 直接在 set 中更新，persist 插件会自动帮你存入 localStorage
        set({
          user,
          isLogin: true,
          accessToken: access_token,
          refreshToken: refresh_token,
        });
      },

      logout: () => {
        // 清空状态，persist 插件会自动同步删除 localStorage 中的对应字段
        set({
          user: null,
          isLogin: false,
          accessToken: null,
          refreshToken: null,
        });
      },

      getUser: async () => {
        // 可以直接从当前 store 的 get() 中获取（或者继续看 localStorage）
        // 这里沿用你的逻辑，但建议之后改用 store 内部的 accessToken
        if (!localStorage.getItem('user-store')) return; 

        const data = await getUser();
        set({
          isLogin: true,
          user: data.data.data
        });
      },

      aiAvatar: async () => {
        const res = await getAiAvatar();
        console.log(res, '???');
      }
    }),
    {
      name: 'user-store', // localStorage 的 key
      // partialized 决定哪些字段需要持久化
      partialize: (state) => ({
        user: state.user,
        isLogin: state.isLogin,
        accessToken: state.accessToken, // 持久化 access_token
        refreshToken: state.refreshToken, // 持久化 refresh_token
      }),
    }
  )
);