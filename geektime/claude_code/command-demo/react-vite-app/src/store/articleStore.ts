import { create } from 'zustand';
import { mockArticleApi, Article, PaginationParams, ArticleStats, ArticleStatus } from '../api/mockArticle';

// Article store interface
interface ArticleStore {
  // State
  articles: Article[];
  currentArticle: Article | null;
  stats: ArticleStats | null;
  isLoading: boolean;
  error: string | null;

  // Pagination state
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };

  // Filter state
  filters: {
    category?: string;
    status?: ArticleStatus;
    keyword?: string;
  };

  // Actions
  fetchArticles: (page?: number) => Promise<void>;
  fetchArticleById: (id: number) => Promise<void>;
  createArticle: (data: Omit<Article, 'id' | 'views' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateArticle: (id: number, data: Partial<Omit<Article, 'id' | 'views' | 'createdAt'>>) => Promise<void>;
  deleteArticle: (id: number) => Promise<void>;
  fetchStats: () => Promise<void>;

  // Pagination & Filter actions
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setFilters: (filters: Partial<ArticleStore['filters']>) => void;
  resetFilters: () => void;
  clearCurrentArticle: () => void;
  clearError: () => void;
}

// Create article store
export const useArticleStore = create<ArticleStore>((set, get) => ({
  // Initial state
  articles: [],
  currentArticle: null,
  stats: null,
  isLoading: false,
  error: null,

  pagination: {
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
  },

  filters: {
    category: undefined,
    status: undefined,
    keyword: undefined,
  },

  // Fetch articles with pagination and filters
  fetchArticles: async (page) => {
    set({ isLoading: true, error: null });
    try {
      const { pagination, filters } = get();
      const params: PaginationParams = {
        page: page || pagination.page,
        pageSize: pagination.pageSize,
        ...filters,
      };

      const response = await mockArticleApi.getArticles(params);

      set({
        articles: response.data,
        pagination: {
          page: response.page,
          pageSize: response.pageSize,
          total: response.total,
          totalPages: response.totalPages,
        },
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch articles',
        isLoading: false,
      });
    }
  },

  // Fetch single article by ID
  fetchArticleById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const article = await mockArticleApi.getArticleById(id);
      set({ currentArticle: article, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch article',
        isLoading: false,
      });
    }
  },

  // Create new article
  createArticle: async (data) => {
    set({ isLoading: true, error: null });
    try {
      await mockArticleApi.createArticle(data);
      // Refresh articles list
      await get().fetchArticles();
      set({ isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to create article',
        isLoading: false,
      });
      throw error;
    }
  },

  // Update existing article
  updateArticle: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      await mockArticleApi.updateArticle(id, data);
      // Refresh articles list
      await get().fetchArticles();
      // Update current article if it's the same one
      const { currentArticle } = get();
      if (currentArticle?.id === id) {
        await get().fetchArticleById(id);
      }
      set({ isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to update article',
        isLoading: false,
      });
      throw error;
    }
  },

  // Delete article
  deleteArticle: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await mockArticleApi.deleteArticle(id);
      // Refresh articles list
      await get().fetchArticles();
      // Clear current article if it was deleted
      const { currentArticle } = get();
      if (currentArticle?.id === id) {
        set({ currentArticle: null });
      }
      set({ isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to delete article',
        isLoading: false,
      });
      throw error;
    }
  },

  // Fetch statistics
  fetchStats: async () => {
    set({ isLoading: true, error: null });
    try {
      const stats = await mockArticleApi.getStats();
      set({ stats, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch stats',
        isLoading: false,
      });
    }
  },

  // Set page number
  setPage: (page) => {
    set((state) => ({
      pagination: { ...state.pagination, page },
    }));
    get().fetchArticles(page);
  },

  // Set page size
  setPageSize: (pageSize) => {
    set((state) => ({
      pagination: { ...state.pagination, pageSize, page: 1 },
    }));
    get().fetchArticles(1);
  },

  // Set filters
  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
      pagination: { ...state.pagination, page: 1 },
    }));
    get().fetchArticles(1);
  },

  // Reset all filters
  resetFilters: () => {
    set({
      filters: {
        category: undefined,
        status: undefined,
        keyword: undefined,
      },
      pagination: { ...get().pagination, page: 1 },
    });
    get().fetchArticles(1);
  },

  // Clear current article
  clearCurrentArticle: () => {
    set({ currentArticle: null });
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },
}));

export default useArticleStore;
