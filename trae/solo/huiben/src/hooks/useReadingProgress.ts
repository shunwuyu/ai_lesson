import { useState, useCallback, useEffect } from 'react';
import { readingAPI } from '@/services/api';
import { ReadingProgress, ReadingSession, Book } from '@/types';

interface ReadingProgressState {
  progress: ReadingProgress | null;
  sessions: ReadingSession[];
  isLoading: boolean;
  error: string | null;
  totalReadingTime: number;
  booksRead: number;
  weeklyGoal: number;
  weeklyProgress: number;
  monthlyProgress: number;
  achievements: string[];
}

interface ReadingProgressActions {
  fetchProgress: (userId: string, bookId: string) => Promise<void>;
  fetchSessions: (userId: string, bookId?: string, limit?: number) => Promise<void>;
  updateProgress: (userId: string, bookId: string, progress: number, currentPage?: number) => Promise<void>;
  startReadingSession: (userId: string, bookId: string) => Promise<string>;
  endReadingSession: (sessionId: string, endPage?: number) => Promise<void>;
  pauseReadingSession: (sessionId: string) => Promise<void>;
  resumeReadingSession: (sessionId: string) => Promise<void>;
  setWeeklyGoal: (userId: string, goal: number) => Promise<void>;
  getReadingStats: (userId: string, period: 'week' | 'month' | 'year') => Promise<void>;
  clearError: () => void;
}

const SESSION_STORAGE_KEY = 'reading_session';
const PROGRESS_UPDATE_INTERVAL = 30000; // 30秒更新一次进度

export const useReadingProgress = (): ReadingProgressState & ReadingProgressActions => {
  const [readingState, setReadingState] = useState<ReadingProgressState>({
    progress: null,
    sessions: [],
    isLoading: false,
    error: null,
    totalReadingTime: 0,
    booksRead: 0,
    weeklyGoal: 7, // 默认每周7天阅读目标
    weeklyProgress: 0,
    monthlyProgress: 0,
    achievements: [],
  });

  const [currentSession, setCurrentSession] = useState<ReadingSession | null>(null);
  const [progressUpdateTimer, setProgressUpdateTimer] = useState<NodeJS.Timeout | null>(null);

  // 从本地存储恢复会话
  useEffect(() => {
    const savedSession = localStorage.getItem(SESSION_STORAGE_KEY);
    if (savedSession) {
      try {
        const session = JSON.parse(savedSession);
        setCurrentSession(session);
      } catch (error) {
        console.error('恢复阅读会话失败:', error);
        localStorage.removeItem(SESSION_STORAGE_KEY);
      }
    }
  }, []);

  // 清理定时器
  useEffect(() => {
    return () => {
      if (progressUpdateTimer) {
        clearInterval(progressUpdateTimer);
      }
    };
  }, [progressUpdateTimer]);

  const fetchProgress = useCallback(async (userId: string, bookId: string): Promise<void> => {
    setReadingState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const progress = await readingAPI.getProgress(userId, bookId);
      setReadingState(prev => ({
        ...prev,
        progress,
        isLoading: false,
      }));
    } catch (error: any) {
      setReadingState(prev => ({
        ...prev,
        error: error.message || '获取阅读进度失败',
        isLoading: false,
      }));
    }
  }, []);

  const fetchSessions = useCallback(async (userId: string, bookId?: string, limit = 10): Promise<void> => {
    setReadingState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const sessions = await readingAPI.getSessions(userId, bookId, limit);
      setReadingState(prev => ({
        ...prev,
        sessions,
        isLoading: false,
      }));
    } catch (error: any) {
      setReadingState(prev => ({
        ...prev,
        error: error.message || '获取阅读记录失败',
        isLoading: false,
      }));
    }
  }, []);

  const updateProgress = useCallback(async (userId: string, bookId: string, progress: number, currentPage?: number): Promise<void> => {
    setReadingState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const updatedProgress = await readingAPI.updateProgress(userId, bookId, progress, currentPage);
      setReadingState(prev => ({
        ...prev,
        progress: updatedProgress,
        isLoading: false,
      }));
    } catch (error: any) {
      setReadingState(prev => ({
        ...prev,
        error: error.message || '更新阅读进度失败',
        isLoading: false,
      }));
    }
  }, []);

  const startReadingSession = useCallback(async (userId: string, bookId: string): Promise<string> => {
    try {
      // 如果有正在进行的会话，先结束它
      if (currentSession) {
        await endReadingSession(currentSession.id);
      }

      const session = await readingAPI.startSession(userId, bookId);
      setCurrentSession(session);
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));

      // 启动进度更新定时器
      const timer = setInterval(async () => {
        if (currentSession) {
          try {
            await readingAPI.updateSessionProgress(session.id);
          } catch (error) {
            console.error('更新会话进度失败:', error);
          }
        }
      }, PROGRESS_UPDATE_INTERVAL);
      
      setProgressUpdateTimer(timer);

      return session.id;
    } catch (error) {
      console.error('开始阅读会话失败:', error);
      throw error;
    }
  }, [currentSession]);

  const endReadingSession = useCallback(async (sessionId: string, endPage?: number): Promise<void> => {
    try {
      await readingAPI.endSession(sessionId, endPage);
      
      // 清理定时器和本地存储
      if (progressUpdateTimer) {
        clearInterval(progressUpdateTimer);
        setProgressUpdateTimer(null);
      }
      
      localStorage.removeItem(SESSION_STORAGE_KEY);
      setCurrentSession(null);

      // 更新当前进度
      if (currentSession) {
        await fetchProgress(currentSession.userId, currentSession.bookId);
      }
    } catch (error) {
      console.error('结束阅读会话失败:', error);
      throw error;
    }
  }, [currentSession, progressUpdateTimer, fetchProgress]);

  const pauseReadingSession = useCallback(async (sessionId: string): Promise<void> => {
    try {
      await readingAPI.pauseSession(sessionId);
      
      if (progressUpdateTimer) {
        clearInterval(progressUpdateTimer);
        setProgressUpdateTimer(null);
      }
    } catch (error) {
      console.error('暂停阅读会话失败:', error);
      throw error;
    }
  }, [progressUpdateTimer]);

  const resumeReadingSession = useCallback(async (sessionId: string): Promise<void> => {
    try {
      await readingAPI.resumeSession(sessionId);
      
      // 重新启动进度更新定时器
      const timer = setInterval(async () => {
        try {
          await readingAPI.updateSessionProgress(sessionId);
        } catch (error) {
          console.error('更新会话进度失败:', error);
        }
      }, PROGRESS_UPDATE_INTERVAL);
      
      setProgressUpdateTimer(timer);
    } catch (error) {
      console.error('恢复阅读会话失败:', error);
      throw error;
    }
  }, []);

  const setWeeklyGoal = useCallback(async (userId: string, goal: number): Promise<void> => {
    try {
      await readingAPI.setWeeklyGoal(userId, goal);
      setReadingState(prev => ({ ...prev, weeklyGoal: goal }));
    } catch (error) {
      console.error('设置每周阅读目标失败:', error);
      throw error;
    }
  }, []);

  const getReadingStats = useCallback(async (userId: string, period: 'week' | 'month' | 'year'): Promise<void> => {
    setReadingState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const stats = await readingAPI.getReadingStats(userId, period);
      
      setReadingState(prev => ({
        ...prev,
        totalReadingTime: stats.totalReadingTime,
        booksRead: stats.booksRead,
        weeklyProgress: stats.weeklyProgress,
        monthlyProgress: stats.monthlyProgress,
        achievements: stats.achievements,
        isLoading: false,
      }));
    } catch (error: any) {
      setReadingState(prev => ({
        ...prev,
        error: error.message || '获取阅读统计失败',
        isLoading: false,
      }));
    }
  }, []);

  const clearError = useCallback((): void => {
    setReadingState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...readingState,
    currentSession,
    fetchProgress,
    fetchSessions,
    updateProgress,
    startReadingSession,
    endReadingSession,
    pauseReadingSession,
    resumeReadingSession,
    setWeeklyGoal,
    getReadingStats,
    clearError,
  };
};

export default useReadingProgress;