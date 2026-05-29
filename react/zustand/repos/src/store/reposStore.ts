// src/store/reposStore.ts
import { create } from 'zustand';
import axios from 'axios';

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
}

interface ReposState {
  repos: Repo[];
  loading: boolean;
  error: string | null;
  fetchRepos: () => void;
}

export const useReposStore = create<ReposState>((set) => ({
  repos: [],
  loading: false,
  error: null,
  fetchRepos: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get<Repo[]>('https://api.github.com/users/shunwuyu/repos');
      set({ repos: response.data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch repositories', loading: false });
    }
  },
}));