import { create } from 'zustand';
import type { Article } from '../types/article';

interface ArticlesStore {
  articles: Article[];
  setArticles: (articles: Article[]) => void;
}

export const useArticlesStore = create<ArticlesStore>((set) => ({
    articles: [],
    setArticles: (articles) => set({ articles }),
}));