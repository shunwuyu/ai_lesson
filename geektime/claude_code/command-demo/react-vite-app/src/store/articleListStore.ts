import { create } from 'zustand';
import { mockArticleApi, Article, PaginationParams } from '../api/mockArticle';

// Article list store interface
interface ArticleListStore {
  // State
  articles: Article[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  hasMore: boolean;

  // Pagination state
  currentPage: number;
  pageSize: number;
  total: number;

  // Filter state
  filters: {
    category?: string;
    status?: string;
    keyword?: string;
  };

  // Actions
  fetchArticles: (refresh?: boolean) => Promise<void>;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  setFilters: (filters: Partial<ArticleListStore['filters']>) => void;
  resetFilters: () => void;
  clearError: () => void;
}

// Create article list store
export const useArticleListStore = create<ArticleListStore>((set, get) => ({
  // Initial state
  articles: [],
  isLoading: false,
  isLoadingMore: false,
  error: null,
  hasMore: true,
  currentPage: 1,
  pageSize: 10,
  total: 0,
  filters: {
    category: undefined,
    status: undefined,
    keyword: undefined,
  },

  // Fetch articles (append or replace based on refresh flag)
  fetchArticles: async (refresh = false) => {
    const { isLoading, isLoadingMore, currentPage, pageSize, filters, articles } = get();

    // Prevent duplicate requests
    if (isLoading || isLoadingMore) return;

    set({
      isLoading: !refresh,
      isLoadingMore: refresh,
      error: null
    });

    try {
      const params: PaginationParams = {
        page: currentPage,
        pageSize,
        ...filters,
      };

      const response = await mockArticleApi.getArticles(params);

      set((state) => ({
        // Append new articles or replace based on refresh flag
        articles: refresh ? [...state.articles, ...response.data] : response.data,
        total: response.total,
        hasMore: currentPage < response.totalPages,
        isLoading: false,
        isLoadingMore: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch articles',
        isLoading: false,
        isLoadingMore: false,
      });
    }
  },

  // Load more articles (infinite scroll)
  loadMore: async () => {
    const { isLoading, isLoadingMore, hasMore, currentPage } = get();

    // Prevent loading if:
    // - Already loading
    // - No more data
    // - Already on last page
    if (isLoading || isLoadingMore || !hasMore) return;

    const nextPage = currentPage + 1;

    set({
      currentPage: nextPage,
      isLoadingMore: true,
      error: null,
    });

    try {
      const params: PaginationParams = {
        page: nextPage,
        pageSize: get().pageSize,
        ...get().filters,
      };

      const response = await mockArticleApi.getArticles(params);

      set((state) => ({
        // Append new articles to existing list
        articles: [...state.articles, ...response.data],
        hasMore: nextPage < response.totalPages,
        isLoadingMore: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to load more articles',
        isLoadingMore: false,
        currentPage: nextPage - 1, // Revert page on error
      });
    }
  },

  // Refresh articles (reset and fetch from page 1)
  refresh: async () => {
    set({
      currentPage: 1,
      articles: [],
      hasMore: true,
    });
    await get().fetchArticles(false);
  },

  // Update filters and refresh
  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
      currentPage: 1,
      articles: [],
      hasMore: true,
    }));
    get().fetchArticles(false);
  },

  // Reset all filters and refresh
  resetFilters: () => {
    set({
      filters: {
        category: undefined,
        status: undefined,
        keyword: undefined,
      },
      currentPage: 1,
      articles: [],
      hasMore: true,
    });
    get().fetchArticles(false);
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },
}));

export default useArticleListStore;
