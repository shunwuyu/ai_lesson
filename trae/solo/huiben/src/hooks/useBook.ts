import { useState, useCallback, useEffect } from 'react';
import { bookAPI } from '@/services/api';
import { Book, BookFilter, ReadingProgress, BookReview, BookCategory } from '@/types';

interface BookState {
  books: Book[];
  currentBook: Book | null;
  readingProgress: ReadingProgress[];
  reviews: BookReview[];
  categories: BookCategory[];
  isLoading: boolean;
  error: string | null;
  filters: BookFilter;
}

interface BookActions {
  fetchBooks: (filters?: BookFilter) => Promise<void>;
  fetchBookById: (id: string) => Promise<void>;
  fetchCategories: () => Promise<void>;
  updateReadingProgress: (bookId: string, progress: number) => Promise<void>;
  addReview: (bookId: string, review: Omit<BookReview, 'id' | 'createdAt' | 'userId'>) => Promise<void>;
  toggleFavorite: (bookId: string) => Promise<void>;
  updateBook: (id: string, updates: Partial<Book>) => Promise<void>;
  updateFilters: (filters: Partial<BookFilter>) => void;
  clearError: () => void;
}

export const useBook = (): BookState & BookActions => {
  const [bookState, setBookState] = useState<BookState>({
    books: [],
    currentBook: null,
    readingProgress: [],
    reviews: [],
    categories: [],
    isLoading: false,
    error: null,
    filters: {
      category: 'all',
      ageGroup: 'all',
      difficulty: 'all',
      language: 'all',
      searchQuery: '',
      sortBy: 'createdAt',
      sortOrder: 'desc',
    },
  });

  // 获取绘本列表
  const fetchBooks = useCallback(async (filters?: BookFilter): Promise<void> => {
    setBookState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const finalFilters = filters || bookState.filters;
      const books = await bookAPI.getBooks(finalFilters);

      setBookState(prev => ({
        ...prev,
        books,
        isLoading: false,
      }));
    } catch (error: any) {
      setBookState(prev => ({
        ...prev,
        error: error.message || '获取绘本列表失败',
        isLoading: false,
      }));
    }
  }, [bookState.filters]);

  // 根据ID获取绘本详情
  const fetchBookById = useCallback(async (id: string): Promise<void> => {
    setBookState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const book = await bookAPI.getBookById(id);
      const progress = await bookAPI.getReadingProgress(id);
      const reviews = await bookAPI.getBookReviews(id);
      
      setBookState(prev => ({
        ...prev,
        currentBook: book,
        readingProgress: progress,
        reviews,
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

  // 获取分类列表
  const fetchCategories = useCallback(async (): Promise<void> => {
    try {
      const categories = await bookAPI.getCategories();
      
      setBookState(prev => ({
        ...prev,
        categories,
      }));
    } catch (error: any) {
      setBookState(prev => ({
        ...prev,
        error: error.message || '获取分类列表失败',
      }));
    }
  }, []);

  // 更新阅读进度
  const updateReadingProgress = useCallback(async (bookId: string, progress: number): Promise<void> => {
    try {
      const updatedProgress = await bookAPI.updateReadingProgress(bookId, progress);
      
      setBookState(prev => ({
        ...prev,
        readingProgress: prev.readingProgress.map(p => 
          p.bookId === bookId ? updatedProgress : p
        ),
        books: prev.books.map(book => 
          book.id === bookId ? { ...book, readingProgress: progress } : book
        ),
        currentBook: prev.currentBook?.id === bookId 
          ? { ...prev.currentBook, readingProgress: progress }
          : prev.currentBook,
      }));
    } catch (error) {
      console.error('更新阅读进度失败:', error);
      throw error;
    }
  }, []);

  // 添加评论
  const addReview = useCallback(async (bookId: string, review: Omit<BookReview, 'id' | 'createdAt' | 'userId'>): Promise<void> => {
    try {
      const newReview = await bookAPI.addReview(bookId, review);
      
      setBookState(prev => ({
        ...prev,
        reviews: [newReview, ...prev.reviews],
        books: prev.books.map(book => 
          book.id === bookId 
            ? { ...book, reviewCount: book.reviewCount + 1, rating: calculateNewRating(book, newReview) }
            : book
        ),
        currentBook: prev.currentBook?.id === bookId 
          ? { 
              ...prev.currentBook, 
              reviewCount: prev.currentBook.reviewCount + 1,
              rating: calculateNewRating(prev.currentBook, newReview)
            }
          : prev.currentBook,
      }));
    } catch (error) {
      console.error('添加评论失败:', error);
      throw error;
    }
  }, []);

  // 切换收藏状态
  const toggleFavorite = useCallback(async (bookId: string): Promise<void> => {
    try {
      const isFavorited = await bookAPI.toggleFavorite(bookId);
      
      setBookState(prev => ({
        ...prev,
        books: prev.books.map(book => 
          book.id === bookId ? { ...book, isFavorited } : book
        ),
        currentBook: prev.currentBook?.id === bookId 
          ? { ...prev.currentBook, isFavorited }
          : prev.currentBook,
      }));
    } catch (error) {
      console.error('切换收藏状态失败:', error);
      throw error;
    }
  }, []);

  // 更新绘本信息
  const updateBook = useCallback(async (id: string, updates: Partial<Book>): Promise<void> => {
    try {
      const updatedBook = await bookAPI.updateBook(id, updates);
      
      setBookState(prev => ({
        ...prev,
        books: prev.books.map(book => 
          book.id === id ? updatedBook : book
        ),
        currentBook: prev.currentBook?.id === id ? updatedBook : prev.currentBook,
      }));
    } catch (error) {
      console.error('更新绘本失败:', error);
      throw error;
    }
  }, []);

  // 更新筛选条件
  const updateFilters = useCallback((filters: Partial<BookFilter>): void => {
    setBookState(prev => ({
      ...prev,
      filters: { ...prev.filters, ...filters },
    }));
  }, []);

  // 清除错误信息
  const clearError = useCallback((): void => {
    setBookState(prev => ({ ...prev, error: null }));
  }, []);

  // 获取用户收藏的绘本
  const fetchFavoriteBooks = useCallback(async (): Promise<void> => {
    try {
      const favoriteBooks = await bookAPI.getFavoriteBooks();
      
      setBookState(prev => ({
        ...prev,
        books: favoriteBooks,
      }));
    } catch (error) {
      console.error('获取收藏绘本失败:', error);
    }
  }, []);

  // 获取用户阅读历史
  const fetchReadingHistory = useCallback(async (): Promise<void> => {
    try {
      const readingHistory = await bookAPI.getReadingHistory();
      
      setBookState(prev => ({
        ...prev,
        books: readingHistory,
      }));
    } catch (error) {
      console.error('获取阅读历史失败:', error);
    }
  }, []);

  // 自动刷新绘本列表
  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // 获取分类列表
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    ...bookState,
    fetchBooks,
    fetchBookById,
    fetchCategories,
    updateReadingProgress,
    addReview,
    toggleFavorite,
    updateBook,
    updateFilters,
    clearError,
  };
};

// 辅助函数：计算新的评分
function calculateNewRating(book: Book, newReview: BookReview): number {
  const totalRating = (book.rating * book.reviewCount) + newReview.rating;
  return Math.round((totalRating / (book.reviewCount + 1)) * 10) / 10;
}

export default useBook;