import { useState, useCallback, useEffect } from 'react';
import { bookAPI } from '@/services/api';
import { Book, ReadingProgress, BookReview, BookType } from '@/types';

interface BookState {
  books: Book[];
  currentBook: Book | null;
  readingProgress: ReadingProgress[];
  userReviews: BookReview[];
  isLoading: boolean;
  error: string | null;
  filters: {
    type?: BookType;
    ageGroup?: string;
    difficulty?: string;
    searchTerm?: string;
    tags?: string[];
  };
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

interface BookActions {
  fetchBooks: (filters?: Partial<BookState['filters']>) => Promise<void>;
  fetchBookById: (bookId: string) => Promise<void>;
  fetchReadingProgress: (userId: string) => Promise<void>;
  updateReadingProgress: (userId: string, bookId: string, progress: number, currentPage?: number) => Promise<void>;
  addBookReview: (userId: string, bookId: string, rating: number, comment?: string) => Promise<void>;
  fetchBookReviews: (bookId: string) => Promise<void>;
  searchBooks: (searchTerm: string, filters?: Partial<BookState['filters']>) => Promise<void>;
  loadMoreBooks: () => Promise<void>;
  clearFilters: () => void;
  clearError: () => void;
}

const BOOKS_PER_PAGE = 12;

export const useBooks = (): BookState & BookActions => {
  const [bookState, setBookState] = useState<BookState>({
    books: [],
    currentBook: null,
    readingProgress: [],
    userReviews: [],
    isLoading: false,
    error: null,
    filters: {},
    pagination: {
      page: 1,
      limit: BOOKS_PER_PAGE,
      total: 0,
      hasMore: false,
    },
  });

  // 获取绘本列表
  const fetchBooks = useCallback(async (filters?: Partial<BookState['filters']>): Promise<void> => {
    setBookState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
      filters: { ...prev.filters, ...filters },
      pagination: { ...prev.pagination, page: 1 },
    }));

    try {
      const response = await bookAPI.getBooks({
        ...bookState.filters,
        ...filters,
        page: 1,
        limit: bookState.pagination.limit,
      });

      setBookState(prev => ({
        ...prev,
        books: response.books,
        pagination: {
          ...prev.pagination,
          total: response.total,
          hasMore: response.books.length >= prev.pagination.limit,
        },
        isLoading: false,
      }));
    } catch (error: any) {
      setBookState(prev => ({
        ...prev,
        error: error.message || '获取绘本列表失败',
        isLoading: false,
      }));
    }
  }, [bookState.filters, bookState.pagination.limit]);

  // 根据ID获取绘本详情
  const fetchBookById = useCallback(async (bookId: string): Promise<void> => {
    setBookState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const book = await bookAPI.getBookById(bookId);
      setBookState(prev => ({
        ...prev,
        currentBook: book,
        isLoading: false,
      }));
    } catch (error: any) {
      setBookState(prev => ({
        ...prev,
        error: error.message || '获取绘本详情失败',
        isLoading: false,
      }));
    }
  }, []);

  // 获取用户阅读进度
  const fetchReadingProgress = useCallback(async (userId: string): Promise<void> => {
    try {
      const progress = await bookAPI.getReadingProgress(userId);
      setBookState(prev => ({ ...prev, readingProgress: progress }));
    } catch (error) {
      console.error('获取阅读进度失败:', error);
    }
  }, []);

  // 更新阅读进度
  const updateReadingProgress = useCallback(async (
    userId: string,
    bookId: string,
    progress: number,
    currentPage?: number
  ): Promise<void> => {
    try {
      const updatedProgress = await bookAPI.updateReadingProgress(userId, bookId, progress, currentPage);
      
      setBookState(prev => ({
        ...prev,
        readingProgress: prev.readingProgress.map(p =>
          p.bookId === bookId ? updatedProgress : p
        ),
      }));

      // 更新当前绘本的进度
      if (bookState.currentBook && bookState.currentBook.id === bookId) {
        setBookState(prev => ({
          ...prev,
          currentBook: {
            ...prev.currentBook!,
            readingProgress: progress,
            currentPage: currentPage || prev.currentBook?.currentPage || 0,
          },
        }));
      }
    } catch (error) {
      console.error('更新阅读进度失败:', error);
      throw error;
    }
  }, [bookState.currentBook]);

  // 添加绘本评价
  const addBookReview = useCallback(async (
    userId: string,
    bookId: string,
    rating: number,
    comment?: string
  ): Promise<void> => {
    try {
      const review = await bookAPI.addBookReview(userId, bookId, rating, comment);
      setBookState(prev => ({
        ...prev,
        userReviews: [...prev.userReviews, review],
      }));

      // 更新当前绘本的评价信息
      if (bookState.currentBook && bookState.currentBook.id === bookId) {
        const updatedBook = {
          ...bookState.currentBook,
          totalRatings: bookState.currentBook.totalRatings + 1,
          averageRating: ((bookState.currentBook.averageRating * bookState.currentBook.totalRatings) + rating) / (bookState.currentBook.totalRatings + 1),
        };
        
        setBookState(prev => ({
          ...prev,
          currentBook: updatedBook,
        }));
      }
    } catch (error) {
      console.error('添加评价失败:', error);
      throw error;
    }
  }, [bookState.currentBook]);

  // 获取绘本评价
  const fetchBookReviews = useCallback(async (bookId: string): Promise<void> => {
    try {
      const reviews = await bookAPI.getBookReviews(bookId);
      setBookState(prev => ({
        ...prev,
        currentBook: prev.currentBook ? {
          ...prev.currentBook,
          reviews: reviews,
        } : null,
      }));
    } catch (error) {
      console.error('获取绘本评价失败:', error);
    }
  }, []);

  // 搜索绘本
  const searchBooks = useCallback(async (searchTerm: string, filters?: Partial<BookState['filters']>): Promise<void> => {
    setBookState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
      filters: { ...prev.filters, searchTerm, ...filters },
      pagination: { ...prev.pagination, page: 1 },
    }));

    try {
      const response = await bookAPI.searchBooks(searchTerm, {
        ...bookState.filters,
        ...filters,
        page: 1,
        limit: bookState.pagination.limit,
      });

      setBookState(prev => ({
        ...prev,
        books: response.books,
        pagination: {
          ...prev.pagination,
          total: response.total,
          hasMore: response.books.length >= prev.pagination.limit,
        },
        isLoading: false,
      }));
    } catch (error: any) {
      setBookState(prev => ({
        ...prev,
        error: error.message || '搜索绘本失败',
        isLoading: false,
      }));
    }
  }, [bookState.filters, bookState.pagination.limit]);

  // 加载更多绘本
  const loadMoreBooks = useCallback(async (): Promise<void> => {
    if (!bookState.pagination.hasMore || bookState.isLoading) return;

    const nextPage = bookState.pagination.page + 1;
    setBookState(prev => ({ ...prev, isLoading: true }));

    try {
      const response = await bookAPI.getBooks({
        ...bookState.filters,
        page: nextPage,
        limit: bookState.pagination.limit,
      });

      setBookState(prev => ({
        ...prev,
        books: [...prev.books, ...response.books],
        pagination: {
          ...prev.pagination,
          page: nextPage,
          hasMore: response.books.length >= prev.pagination.limit,
        },
        isLoading: false,
      }));
    } catch (error: any) {
      setBookState(prev => ({
        ...prev,
        error: error.message || '加载更多绘本失败',
        isLoading: false,
      }));
    }
  }, [bookState.filters, bookState.pagination, bookState.isLoading]);

  // 清除筛选条件
  const clearFilters = useCallback((): void => {
    setBookState(prev => ({
      ...prev,
      filters: {},
      pagination: { ...prev.pagination, page: 1 },
    }));
  }, []);

  // 清除错误信息
  const clearError = useCallback((): void => {
    setBookState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...bookState,
    fetchBooks,
    fetchBookById,
    fetchReadingProgress,
    updateReadingProgress,
    addBookReview,
    fetchBookReviews,
    searchBooks,
    loadMoreBooks,
    clearFilters,
    clearError,
  };
};

export default useBooks;