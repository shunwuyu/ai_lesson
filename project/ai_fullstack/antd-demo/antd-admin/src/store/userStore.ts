// src/store/userStore.ts
import { create } from 'zustand';
import { getUsers } from '../api/http';
import type { User } from '../types/index';

interface UserState {
  users: User[];
  total: number;
  loading: boolean;
  currentPage: number;
  pageSize: number;

  fetchUsers: (page: number, size?: number) => Promise<void>;
  setPage: (page: number) => void;
}

const useUserStore = create<UserState>((set, get) => ({
  users: [],
  total: 0,
  loading: false,
  currentPage: 1,
  pageSize: 2,

  fetchUsers: async (page: number, size?: number) => {
    const pageSize = size ?? get().pageSize;
    set({ loading: true });
    try {
      const res = await getUsers(page, pageSize) as any;
      // console.log(res, '///');
      set({
        users: res.users,
        total: res.total,
        currentPage: page,
        pageSize,
      });
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      set({ loading: false });
    }
  },

  setPage: (page: number) => {
    get().fetchUsers(page);
  },
}));

export default useUserStore;