import { create } from 'zustand';
import { fetchCommit } from '@/api/git'

interface GitState {
  loading: boolean;
  diff: string;
  setLoading: (loading: boolean) => void;
  setDiff: (diff: string) => void;
  getCommit: (diff: string) => Promise<void>;
  commit: string;
}

export const useGitStore = create<GitState>((set, get) => ({
  loading: false,
  diff: '',
  commit:'',
  setLoading: (loading: boolean) => set({ loading }),
  setDiff: (diff: string) => set({ diff }),
  getCommit: async (diff: string) => {
    const res = await fetchCommit(diff)
    set({ commit: res.result })
  }
}))
