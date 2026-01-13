import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserInfo {
  id: number;
  name: string;
  avatar?: string;
}

interface AuthState {
  isLoggedIn: boolean;
  userInfo: UserInfo | null;
  login: (user: UserInfo) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      userInfo: null,
      login: (user) => set({ isLoggedIn: true, userInfo: user }),
      logout: () => set({ isLoggedIn: false, userInfo: null }),
    }),
    {
      name: 'auth-storage', // localStorage 中的 key 名称
      storage: createJSONStorage(() => localStorage),
    }
  )
);