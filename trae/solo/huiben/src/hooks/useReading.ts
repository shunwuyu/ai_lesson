import { useState, useCallback, useEffect } from 'react';
import { readingAPI } from '@/services/api';
import { ReadingRecord, ReadingGoal, ReadingStatistics } from '@/types';

interface ReadingState {
  readingRecords: ReadingRecord[];
  currentRecord: ReadingRecord | null;
  readingGoals: ReadingGoal[];
  readingStatistics: ReadingStatistics | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    dateRange?: {
      start: Date;
      end: Date;
    };
    bookId?: string;
    childId?: string;
    readingTime?: number;
  };
}

interface ReadingActions {
  fetchReadingRecords: (filters?: Partial<ReadingState['filters']>) => Promise<void>;
  fetchReadingRecordById: (recordId: string) => Promise<void>;
  createReadingRecord: (record: Omit<ReadingRecord, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateReadingRecord: (recordId: string, updates: Partial<ReadingRecord>) => Promise<void>;
  deleteReadingRecord: (recordId: string) => Promise<void>;
  fetchReadingGoals: (userId: string) => Promise<void>;
  createReadingGoal: (goal: Omit<ReadingGoal, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateReadingGoal: (goalId: string, updates: Partial<ReadingGoal>) => Promise<void>;
  deleteReadingGoal: (goalId: string) => Promise<void>;
  fetchReadingStatistics: (userId: string, dateRange?: { start: Date; end: Date }) => Promise<void>;
  clearFilters: () => void;
  clearError: () => void;
}

export const useReading = (): ReadingState & ReadingActions => {
  const [readingState, setReadingState] = useState<ReadingState>({
    readingRecords: [],
    currentRecord: null,
    readingGoals: [],
    readingStatistics: null,
    isLoading: false,
    error: null,
    filters: {},
  });

  // 获取阅读记录列表
  const fetchReadingRecords = useCallback(async (filters?: Partial<ReadingState['filters']>): Promise<void> => {
    setReadingState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
      filters: { ...prev.filters, ...filters },
    }));

    try {
      const records = await readingAPI.getReadingRecords({
        ...readingState.filters,
        ...filters,
      });

      setReadingState(prev => ({
        ...prev,
        readingRecords: records,
        isLoading: false,
      }));
    } catch (error: any) {
      setReadingState(prev => ({
        ...prev,
        error: error.message || '获取阅读记录失败',
        isLoading: false,
      }));
    }
  }, [readingState.filters]);

  // 根据ID获取阅读记录详情
  const fetchReadingRecordById = useCallback(async (recordId: string): Promise<void> => {
    setReadingState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const record = await readingAPI.getReadingRecordById(recordId);
      setReadingState(prev => ({
        ...prev,
        currentRecord: record,
        isLoading: false,
      }));
    } catch (error: any) {
      setReadingState(prev => ({
        ...prev,
        error: error.message || '获取阅读记录详情失败',
        isLoading: false,
      }));
    }
  }, []);

  // 创建阅读记录
  const createReadingRecord = useCallback(async (record: Omit<ReadingRecord, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> => {
    try {
      const newRecord = await readingAPI.createReadingRecord(record);
      
      setReadingState(prev => ({
        ...prev,
        readingRecords: [newRecord, ...prev.readingRecords],
        currentRecord: newRecord,
      }));

      // 更新阅读统计
      if (readingState.readingStatistics) {
        const updatedStats = {
          ...readingState.readingStatistics,
          totalReadingTime: readingState.readingStatistics.totalReadingTime + record.readingTime,
          totalBooksRead: readingState.readingStatistics.totalBooksRead + 1,
          averageReadingTime: Math.round(
            (readingState.readingStatistics.totalReadingTime + record.readingTime) /
            (readingState.readingStatistics.totalBooksRead + 1)
          ),
        };
        setReadingState(prev => ({
          ...prev,
          readingStatistics: updatedStats,
        }));
      }
    } catch (error) {
      console.error('创建阅读记录失败:', error);
      throw error;
    }
  }, [readingState.readingStatistics]);

  // 更新阅读记录
  const updateReadingRecord = useCallback(async (recordId: string, updates: Partial<ReadingRecord>): Promise<void> => {
    try {
      const updatedRecord = await readingAPI.updateReadingRecord(recordId, updates);
      
      setReadingState(prev => ({
        ...prev,
        readingRecords: prev.readingRecords.map(record =>
          record.id === recordId ? updatedRecord : record
        ),
        currentRecord: prev.currentRecord?.id === recordId ? updatedRecord : prev.currentRecord,
      }));
    } catch (error) {
      console.error('更新阅读记录失败:', error);
      throw error;
    }
  }, []);

  // 删除阅读记录
  const deleteReadingRecord = useCallback(async (recordId: string): Promise<void> => {
    try {
      await readingAPI.deleteReadingRecord(recordId);
      
      setReadingState(prev => ({
        ...prev,
        readingRecords: prev.readingRecords.filter(record => record.id !== recordId),
        currentRecord: prev.currentRecord?.id === recordId ? null : prev.currentRecord,
      }));

      // 更新阅读统计
      if (readingState.readingStatistics) {
        const deletedRecord = readingState.readingRecords.find(record => record.id === recordId);
        if (deletedRecord) {
          const updatedStats = {
            ...readingState.readingStatistics,
            totalReadingTime: Math.max(0, readingState.readingStatistics.totalReadingTime - deletedRecord.readingTime),
            totalBooksRead: Math.max(0, readingState.readingStatistics.totalBooksRead - 1),
          };
          
          if (updatedStats.totalBooksRead > 0) {
            updatedStats.averageReadingTime = Math.round(updatedStats.totalReadingTime / updatedStats.totalBooksRead);
          } else {
            updatedStats.averageReadingTime = 0;
          }
          
          setReadingState(prev => ({
            ...prev,
            readingStatistics: updatedStats,
          }));
        }
      }
    } catch (error) {
      console.error('删除阅读记录失败:', error);
      throw error;
    }
  }, [readingState.readingRecords, readingState.readingStatistics]);

  // 获取阅读目标
  const fetchReadingGoals = useCallback(async (userId: string): Promise<void> => {
    try {
      const goals = await readingAPI.getReadingGoals(userId);
      setReadingState(prev => ({ ...prev, readingGoals: goals }));
    } catch (error) {
      console.error('获取阅读目标失败:', error);
      throw error;
    }
  }, []);

  // 创建阅读目标
  const createReadingGoal = useCallback(async (goal: Omit<ReadingGoal, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> => {
    try {
      const newGoal = await readingAPI.createReadingGoal(goal);
      setReadingState(prev => ({
        ...prev,
        readingGoals: [...prev.readingGoals, newGoal],
      }));
    } catch (error) {
      console.error('创建阅读目标失败:', error);
      throw error;
    }
  }, []);

  // 更新阅读目标
  const updateReadingGoal = useCallback(async (goalId: string, updates: Partial<ReadingGoal>): Promise<void> => {
    try {
      const updatedGoal = await readingAPI.updateReadingGoal(goalId, updates);
      setReadingState(prev => ({
        ...prev,
        readingGoals: prev.readingGoals.map(goal =>
          goal.id === goalId ? updatedGoal : goal
        ),
      }));
    } catch (error) {
      console.error('更新阅读目标失败:', error);
      throw error;
    }
  }, []);

  // 删除阅读目标
  const deleteReadingGoal = useCallback(async (goalId: string): Promise<void> => {
    try {
      await readingAPI.deleteReadingGoal(goalId);
      setReadingState(prev => ({
        ...prev,
        readingGoals: prev.readingGoals.filter(goal => goal.id !== goalId),
      }));
    } catch (error) {
      console.error('删除阅读目标失败:', error);
      throw error;
    }
  }, []);

  // 获取阅读统计
  const fetchReadingStatistics = useCallback(async (
    userId: string,
    dateRange?: { start: Date; end: Date }
  ): Promise<void> => {
    try {
      const statistics = await readingAPI.getReadingStatistics(userId, dateRange);
      setReadingState(prev => ({ ...prev, readingStatistics: statistics }));
    } catch (error) {
      console.error('获取阅读统计失败:', error);
      throw error;
    }
  }, []);

  // 清除筛选条件
  const clearFilters = useCallback((): void => {
    setReadingState(prev => ({ ...prev, filters: {} }));
  }, []);

  // 清除错误信息
  const clearError = useCallback((): void => {
    setReadingState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...readingState,
    fetchReadingRecords,
    fetchReadingRecordById,
    createReadingRecord,
    updateReadingRecord,
    deleteReadingRecord,
    fetchReadingGoals,
    createReadingGoal,
    updateReadingGoal,
    deleteReadingGoal,
    fetchReadingStatistics,
    clearFilters,
    clearError,
  };
};

export default useReading;