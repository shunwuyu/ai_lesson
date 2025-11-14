import { useState, useCallback, useEffect } from 'react';
import { activityAPI } from '@/services/api';
import { Activity, ActivityRegistration, ActivityFilter, ActivityType } from '@/types';

interface ActivityState {
  activities: Activity[];
  currentActivity: Activity | null;
  registrations: ActivityRegistration[];
  isLoading: boolean;
  error: string | null;
  filters: ActivityFilter;
}

interface ActivityActions {
  fetchActivities: (filters?: ActivityFilter) => Promise<void>;
  fetchActivityById: (id: string) => Promise<void>;
  createActivity: (activity: Omit<Activity, 'id' | 'createdAt' | 'updatedAt' | 'creatorId'>) => Promise<void>;
  updateActivity: (id: string, updates: Partial<Activity>) => Promise<void>;
  deleteActivity: (id: string) => Promise<void>;
  registerForActivity: (activityId: string, registration: Omit<ActivityRegistration, 'id' | 'createdAt' | 'userId'>) => Promise<void>;
  cancelRegistration: (registrationId: string) => Promise<void>;
  fetchUserRegistrations: () => Promise<void>;
  updateFilters: (filters: Partial<ActivityFilter>) => void;
  clearError: () => void;
}

export const useActivity = (): ActivityState & ActivityActions => {
  const [activityState, setActivityState] = useState<ActivityState>({
    activities: [],
    currentActivity: null,
    registrations: [],
    isLoading: false,
    error: null,
    filters: {
      type: 'all',
      ageGroup: 'all',
      status: 'all',
      searchQuery: '',
      startDate: null,
      endDate: null,
      sortBy: 'startTime',
      sortOrder: 'desc',
    },
  });

  // 获取活动列表
  const fetchActivities = useCallback(async (filters?: ActivityFilter): Promise<void> => {
    setActivityState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const finalFilters = filters || activityState.filters;
      const activities = await activityAPI.getActivities(finalFilters);

      setActivityState(prev => ({
        ...prev,
        activities,
        isLoading: false,
      }));
    } catch (error: any) {
      setActivityState(prev => ({
        ...prev,
        error: error.message || '获取活动列表失败',
        isLoading: false,
      }));
    }
  }, [activityState.filters]);

  // 根据ID获取活动详情
  const fetchActivityById = useCallback(async (id: string): Promise<void> => {
    setActivityState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const activity = await activityAPI.getActivityById(id);
      const registrations = await activityAPI.getActivityRegistrations(id);
      
      setActivityState(prev => ({
        ...prev,
        currentActivity: activity,
        registrations,
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

  // 创建活动
  const createActivity = useCallback(async (activity: Omit<Activity, 'id' | 'createdAt' | 'updatedAt' | 'creatorId'>): Promise<void> => {
    setActivityState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const newActivity = await activityAPI.createActivity(activity);
      
      setActivityState(prev => ({
        ...prev,
        activities: [newActivity, ...prev.activities],
        isLoading: false,
      }));
    } catch (error: any) {
      setActivityState(prev => ({
        ...prev,
        error: error.message || '创建活动失败',
        isLoading: false,
      }));
      throw error;
    }
  }, []);

  // 更新活动
  const updateActivity = useCallback(async (id: string, updates: Partial<Activity>): Promise<void> => {
    try {
      const updatedActivity = await activityAPI.updateActivity(id, updates);
      
      setActivityState(prev => ({
        ...prev,
        activities: prev.activities.map(activity => 
          activity.id === id ? updatedActivity : activity
        ),
        currentActivity: prev.currentActivity?.id === id ? updatedActivity : prev.currentActivity,
      }));
    } catch (error) {
      console.error('更新活动失败:', error);
      throw error;
    }
  }, []);

  // 删除活动
  const deleteActivity = useCallback(async (id: string): Promise<void> => {
    try {
      await activityAPI.deleteActivity(id);
      
      setActivityState(prev => ({
        ...prev,
        activities: prev.activities.filter(activity => activity.id !== id),
        currentActivity: prev.currentActivity?.id === id ? null : prev.currentActivity,
      }));
    } catch (error) {
      console.error('删除活动失败:', error);
      throw error;
    }
  }, []);

  // 报名参加活动
  const registerForActivity = useCallback(async (
    activityId: string, 
    registration: Omit<ActivityRegistration, 'id' | 'createdAt' | 'userId'>
  ): Promise<void> => {
    try {
      const newRegistration = await activityAPI.registerForActivity(activityId, registration);
      
      setActivityState(prev => ({
        ...prev,
        registrations: [newRegistration, ...prev.registrations],
        activities: prev.activities.map(activity => 
          activity.id === activityId 
            ? { ...activity, registrationCount: activity.registrationCount + 1 }
            : activity
        ),
        currentActivity: prev.currentActivity?.id === activityId 
          ? { ...prev.currentActivity, registrationCount: prev.currentActivity.registrationCount + 1 }
          : prev.currentActivity,
      }));
    } catch (error) {
      console.error('报名参加活动失败:', error);
      throw error;
    }
  }, []);

  // 取消报名
  const cancelRegistration = useCallback(async (registrationId: string): Promise<void> => {
    try {
      await activityAPI.cancelRegistration(registrationId);
      
      setActivityState(prev => ({
        ...prev,
        registrations: prev.registrations.filter(registration => registration.id !== registrationId),
      }));
    } catch (error) {
      console.error('取消报名失败:', error);
      throw error;
    }
  }, []);

  // 获取用户报名记录
  const fetchUserRegistrations = useCallback(async (): Promise<void> => {
    try {
      const registrations = await activityAPI.getUserRegistrations();
      
      setBookState(prev => ({
        ...prev,
        registrations,
      }));
    } catch (error) {
      console.error('获取用户报名记录失败:', error);
    }
  }, []);

  // 更新筛选条件
  const updateFilters = useCallback((filters: Partial<ActivityFilter>): void => {
    setActivityState(prev => ({
      ...prev,
      filters: { ...prev.filters, ...filters },
    }));
  }, []);

  // 清除错误信息
  const clearError = useCallback((): void => {
    setActivityState(prev => ({ ...prev, error: null }));
  }, []);

  // 获取即将开始的活动
  const fetchUpcomingActivities = useCallback(async (): Promise<void> => {
    try {
      const upcomingActivities = await activityAPI.getUpcomingActivities();
      
      setActivityState(prev => ({
        ...prev,
        activities: upcomingActivities,
      }));
    } catch (error) {
      console.error('获取即将开始的活动失败:', error);
    }
  }, []);

  // 获取推荐活动
  const fetchRecommendedActivities = useCallback(async (): Promise<void> => {
    try {
      const recommendedActivities = await activityAPI.getRecommendedActivities();
      
      setActivityState(prev => ({
        ...prev,
        activities: recommendedActivities,
      }));
    } catch (error) {
      console.error('获取推荐活动失败:', error);
    }
  }, []);

  // 自动刷新活动列表
  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  return {
    ...activityState,
    fetchActivities,
    fetchActivityById,
    createActivity,
    updateActivity,
    deleteActivity,
    registerForActivity,
    cancelRegistration,
    fetchUserRegistrations,
    updateFilters,
    clearError,
  };
};

export default useActivity;