import { create } from 'zustand';

// User store using Zustand
export const useUserStore = create((set) => ({
  users: [],
  currentUser: null,
  isLoading: false,

  setUsers: (users) => set({ users }),
  setCurrentUser: (user) => set({ currentUser: user }),
  setIsLoading: (loading) => set({ isLoading: loading }),

  addUser: (user) => set((state) => ({
    users: [...state.users, user],
  })),

  removeUser: (userId) => set((state) => ({
    users: state.users.filter((user) => user.id !== userId),
  })),
}));
