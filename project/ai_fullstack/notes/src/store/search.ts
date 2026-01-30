// src/store/searchStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { doSearch } from '@/api/search';

interface SearchState {
  loading: boolean;
  suggestions: [];
  history: string[];

  // 搜索并更新建议列表
  search: (keyword: string) => Promise<void>;

  // 手动添加搜索历史（去重、截断）
  addHistory: (keyword: string) => void;

  // 清空历史
  clearHistory: () => void;
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set, get) => ({
      loading: false,
      suggestions: [],
      history: [],

      search: async (keyword: string) => {
        if (!keyword.trim()) {
          set({ suggestions: [] });
          return;
        }

        set({ loading: true });
        try {
          const response = await doSearch(encodeURIComponent(keyword));
          const data:[] = response.data?.data || [];
          console.log(data, '/////')
          set({ suggestions: data });

          // 自动添加到历史（去重）
          get().addHistory(keyword.trim());
        } catch (error) {
          console.error('Search failed:', error);
          set({ suggestions: [] });
        } finally {
          set({ loading: false });
        }
      },

      addHistory: (keyword: string) => {
        const trimmed = keyword.trim();
        if (!trimmed) return;

        const { history } = get();
        const exists = history.includes(trimmed);
        let newHistory = exists
          ? [trimmed, ...history.filter((h) => h !== trimmed)] // 移到最前
          : [trimmed, ...history];

        // 限制最多 10 条
        newHistory = newHistory.slice(0, 10);

        set({ history: newHistory });
      },

      clearHistory: () => {
        set({ history: [] });
      },
    }),
    {
      name: 'search-store', // localStorage key
      partialize: (state) => ({ history: state.history }), // 只持久化 history
    }
  )
);