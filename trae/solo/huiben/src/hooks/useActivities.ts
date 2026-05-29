import { useState, useCallback, useEffect } from 'react';
import { activityAPI } from '@/services/api';
import { Activity, ActivityRegistration, ActivityType } from '@/types';

interface ActivityState {
  activities: Activity[];
  currentActivity: Activity | null;
  userRegistrations: ActivityRegistration[];
  isLoading: boolean;
  error: string | null;
  filters: {
    type?: ActivityType;
    ageGroup?: string;
    dateRange?: {
      start: Date;
      end: Date;
    };
    searchTerm?: string;
    status?: 'upcoming' | 'ongoing' | 'completed';
  };
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

interface ActivityActions {
  fetchActivities: (filters?: Partial<ActivityState['filters']>) => Promise<void>;
  fetchActivityById: (activityId: string) => Promise<void>;
  fetchUserRegistrations: (userId: string) => Promise<void>;
  registerForActivity: (userId: string, activityId: string, childInfo?: any) => Promise<void>;
  cancelRegistration: (registrationId: string) => Promise<void>;
  searchActivities: (searchTerm: string, filters?: Partial<ActivityState['filters']>) => Promise<void>;
  loadMoreActivities: () => Promise<void>;
  clearFilters: () => void;
  clearError: () => void;
}

const ACTIVITIES_PER_PAGE = 12;

export const useActivities = (): ActivityState & ActivityActions => {
  const [activityState, setActivityState] = useState<ActivityState>({
    activities: [],
    currentActivity: null,
    userRegistrations: [],
    isLoading: false,
    error: null,
    filters: {},
    pagination: {
      page: 1,
      limit: ACTIVITIES_PER_PAGE,
      total: 0,
      hasMore: false,
    },
  });

  // 获取活动列表
  const fetchActivities = useCallback(async (filters?: Partial<ActivityState['filters']>): Promise<void> => {
    setActivityState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
      filters: { ...prev.filters, ...filters },
      pagination: { ...prev.pagination, page: 1 },
    }));

    try {
      const response = await activityAPI.getActivities({
        ...activityState.filters,
        ...filters,
        page: 1,
        limit: activityState.pagination.limit,
      });

      setActivityState(prev => ({
        ...prev,
        activities: response.activities,
        pagination: {
          ...prev.pagination,
          total: response.total,
          hasMore: response.activities.length >= prev.pagination.limit,
        },
        isLoading: false,
      }));
    } catch (error: any) {
      setActivityState(prev => ({
        ...prev,
        error: error.message || '获取活动列表失败',
        isLoading: false,
      }));
    }
  }, [activityState.filters, activityState.pagination.limit]);

  // 根据ID获取活动详情
  const fetchActivityById = useCallback(async (activityId: string): Promise<void> => {
    setActivityState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const activity = await activityAPI.getActivityById(activityId);
      setActivityState(prev => ({
        ...prev,
        currentActivity: activity,
        isLoading: false,
      }));
    } catch (error: any) {
      setActivityState(prev => ({
        ...prev,
        error: error.message || '获取活动详情失败',
        isLoading: false,
      }));
    }
  }, []);

  // 获取用户报名记录
  const fetchUserRegistrations = useCallback(async (userId: string): Promise<void> => {
    try {
      const registrations = await activityAPI.getUserRegistrations(userId);
      setActivityState(prev => ({ ...prev, userRegistrations: registrations }));
    } catch (error) {
      console.error('获取用户报名记录失败:', error);
    }
  }, []);

  // 报名参加活动
  const registerForActivity = useCallback(async (
    userId: string,
    activityId: string,
    childInfo?: any
  ): Promise<void> => {
    try {
      const registration = await activityAPI.registerForActivity(userId, activityId, childInfo);
      
      setActivityState(prev => ({
        ...prev,
        userRegistrations: [...prev.userRegistrations, registration],
        activities: prev.activities.map(activity =>
          activity.id === activityId
            ? { ...activity, registeredCount: activity.registeredCount + 1 }
            : activity
        ),
      }));

      // 更新当前活动的报名数
      if (activityState.currentActivity && activityState.currentActivity.id === activityId) {
        setActivityState(prev => ({
          ...prev,
          currentActivity: prev.currentActivity ? {
            ...prev.currentActivity,
            registeredCount: prev.currentActivity.registeredCount + 1,
          } : null,
        }));
      }
    } catch (error) {
      console.error('报名参加活动失败:', error);
      throw error;
    }
  }, [activityState.currentActivity]);

  // 取消报名
  const cancelRegistration = useCallback(async (registrationId: string): Promise<void> => {
    try {
      await activityAPI.cancelRegistration(registrationId);
      
      setActivityState(prev => ({
        ...prev,
        userRegistrations: prev.userRegistrations.filter(
          registration => registration.id !== registrationId
        ),
      }));

      // 更新相关活动的报名数
      const registration = activityState.userRegistrations.find(r => r.id === registrationId);
      if (registration) {
        setActivityState(prev => ({
          ...prev,
          activities: prev.activities.map(activity =>
            activity.id === registration.activityId
              ? { ...activity, registeredCount: Math.max(0, activity.registeredCount - 1) }
              : activity
          ),
          currentActivity: prev.currentActivity && prev.currentActivity.id === registration.activityId
            ? { ...prev.currentActivity, registeredCount: Math.max(0, prev.currentActivity.registeredCount - 1) }
            : prev.currentActivity,
        }));
      }
    } catch (error) {
      console.error('取消报名失败:', error);
      throw error;
    }
  }, [activityState.userRegistrations]);

  // 搜索活动
  const searchActivities = useCallback(async (searchTerm: string, filters?: Partial<ActivityState['filters']>): Promise<void> => {
    setActivityState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
      filters: { ...prev.filters, searchTerm, ...filters },
      pagination: { ...prev.pagination, page: 1 },
    }));

    try {
      const response = await activityAPI.searchActivities(searchTerm, {
        ...activityState.filters,
        ...filters,
        page: 1,
        limit: activityState.pagination.limit,
      });

      setActivityState(prev => ({
        ...prev,
        activities: response.activities,
        pagination: {
          ...prev.pagination,
          total: response.total,
          hasMore: response.activities.length >= prev.pagination.limit,
        },
        isLoading: false,
      }));
    } catch (error: any) {
      setActivityState(prev => ({
        ...prev,
        error: error.message || '搜索活动失败',
        isLoading: false,
      }));
    }
  }, [activityState.filters, activityState.pagination.limit]);

  // 加载更多活动
  const loadMoreActivities = useCallback(async (): Promise<void> => {
    if (!activityState.pagination.hasMore || activityState.isLoading) return;

    const nextPage = activityState.pagination.page + 1;
    setActivityState(prev => ({ ...prev, isLoading: true }));

    try {
      const response = await activityAPI.getActivities({
        ...activityState.filters,
        page: nextPage,
        limit: activityState.pagination.limit,
      });

      setActivityState(prev => ({
        ...prev,
        activities: [...prev.activities, ...response.activities],
        pagination: {
          ...prev.pagination,
          page: nextPage,
          hasMore: response.activities.length >= prev.pagination.limit,
        },
        isLoading: false,
      }));
    } catch (error: any) {
      setActivityState(prev => ({
        ...prev,
        error: error.message || '加载更多活动失败',
        isLoading: false,
      }));
    }
  }, [activityState.filters, activityState.pagination, activityState.isLoading]);

  // 清除筛选条件
  const clearFilters = useCallback((): void => {
    setActivityState(prev => ({
      ...prev,
      filters: {},
      pagination: { ...prev.pagination, page: 1 },
    }));
  }, []);

  // 清除错误信息
  const clearError = useCallback((): void => {
    setActivityState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...activityState,
    fetchActivities,
    fetchActivityById,
    fetchUserRegistrations,
    registerForActivity,
    cancelRegistration,
    searchActivities,
    loadMoreActivities,
    clearFilters,
    clearError,
  };
};

export default useActivities;