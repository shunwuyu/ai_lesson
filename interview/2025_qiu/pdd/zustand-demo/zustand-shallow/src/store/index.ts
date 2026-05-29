import { create } from 'zustand';

type User = {
  name: string;
  age: number;
};

interface AppState {
  count: number;
  user: User;
  setCount: (n: number) => void;
  setUser: (u: User) => void;
}

export const useAppStore = create<AppState>((set) => ({
  count: 0,
  user: { name: 'Andrew', age: 20 },
  setCount: (n) => set({ count: n }),
  setUser: (u) => set({ user: u }),
}));
