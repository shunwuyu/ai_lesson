import { useState, useCallback, useEffect } from 'react';
import { notificationAPI } from '@/services/api';
import { Notification, NotificationSettings } from '@/types';

interface NotificationsState {
  notifications: Notification[];
  unreadCount: number;
  settings: NotificationSettings;
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  page: number;
  totalPages: number;
  totalNotifications: number;
  isSubscribed: boolean;
  subscription: PushSubscription | null;
}

interface NotificationsActions {
  fetchNotifications: (reset?: boolean) => Promise<void>;
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (notificationId: string) => Promise<void>;
  updateSettings: (settings: Partial<NotificationSettings>) => Promise<void>;
  subscribeToPush: () => Promise<void>;
  unsubscribeFromPush: () => Promise<void>;
  loadMoreNotifications: () => Promise<void>;
  clearError: () => void;
}

const NOTIFICATIONS_PER_PAGE = 20;

export const useNotifications = (userId: string): NotificationsState & NotificationsActions => {
  const [notificationsState, setNotificationsState] = useState<NotificationsState>({
    notifications: [],
    unreadCount: 0,
    settings: {
      email: true,
      push: true,
      sms: false,
      weeklyDigest: true,
      newBookNotifications: true,
      activityReminders: true,
      readingReminders: true,
      marketingEmails: false,
    },
    isLoading: false,
    error: null,
    hasMore: true,
    page: 1,
    totalPages: 1,
    totalNotifications: 0,
    isSubscribed: false,
    subscription: null,
  });

  // 初始化推送订阅状态
  useEffect(() => {
    const initializePushSubscription = async () => {
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        try {
          const registration = await navigator.serviceWorker.ready;
          const subscription = await registration.pushManager.getSubscription();
          setNotificationsState(prev => ({
            ...prev,
            isSubscribed: !!subscription,
            subscription,
          }));
        } catch (error) {
          console.error('初始化推送订阅失败:', error);
        }
      }
    };

    initializePushSubscription();
  }, []);

  const fetchNotifications = useCallback(async (reset = false): Promise<void> => {
    setNotificationsState(prev => ({ 
      ...prev, 
      isLoading: true, 
      error: null,
      page: reset ? 1 : prev.page
    }));

    try {
      const response = await notificationAPI.getNotifications({
        userId,
        page: reset ? 1 : notificationsState.page,
        limit: NOTIFICATIONS_PER_PAGE,
      });

      setNotificationsState(prev => ({
        ...prev,
        notifications: reset ? response.notifications : [...prev.notifications, ...response.notifications],
        unreadCount: response.unreadCount,
        hasMore: response.page < response.totalPages,
        page: reset ? 2 : prev.page + 1,
        totalPages: response.totalPages,
        totalNotifications: response.totalNotifications,
        isLoading: false,
      }));
    } catch (error: any) {
      setNotificationsState(prev => ({
        ...prev,
        error: error.message || '获取通知列表失败',
        isLoading: false,
      }));
    }
  }, [userId, notificationsState.page]);

  const markAsRead = useCallback(async (notificationId: string): Promise<void> => {
    try {
      await notificationAPI.markAsRead(notificationId);
      
      setNotificationsState(prev => ({
        ...prev,
        notifications: prev.notifications.map(n =>
          n.id === notificationId ? { ...n, isRead: true } : n
        ),
        unreadCount: Math.max(0, prev.unreadCount - 1),
      }));
    } catch (error) {
      console.error('标记通知已读失败:', error);
    }
  }, []);

  const markAllAsRead = useCallback(async (): Promise<void> => {
    try {
      await notificationAPI.markAllAsRead(userId);
      
      setNotificationsState(prev => ({
        ...prev,
        notifications: prev.notifications.map(n => ({ ...n, isRead: true })),
        unreadCount: 0,
      }));
    } catch (error) {
      console.error('标记所有通知已读失败:', error);
    }
  }, [userId]);

  const deleteNotification = useCallback(async (notificationId: string): Promise<void> => {
    try {
      await notificationAPI.deleteNotification(notificationId);
      
      setNotificationsState(prev => ({
        ...prev,
        notifications: prev.notifications.filter(n => n.id !== notificationId),
        totalNotifications: prev.totalNotifications - 1,
        unreadCount: prev.notifications.find(n => n.id === notificationId)?.isRead 
          ? prev.unreadCount 
          : Math.max(0, prev.unreadCount - 1),
      }));
    } catch (error) {
      console.error('删除通知失败:', error);
    }
  }, []);

  const updateSettings = useCallback(async (settings: Partial<NotificationSettings>): Promise<void> => {
    try {
      const updatedSettings = await notificationAPI.updateSettings(userId, settings);
      
      setNotificationsState(prev => ({
        ...prev,
        settings: updatedSettings,
      }));
    } catch (error) {
      console.error('更新通知设置失败:', error);
    }
  }, [userId]);

  const subscribeToPush = useCallback(async (): Promise<void> => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      setNotificationsState(prev => ({ 
        ...prev, 
        error: '您的浏览器不支持推送通知' 
      }));
      return;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      const existingSubscription = await registration.pushManager.getSubscription();
      
      if (existingSubscription) {
        setNotificationsState(prev => ({
          ...prev,
          isSubscribed: true,
          subscription: existingSubscription,
        }));
        return;
      }

      // 请求用户权限
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        setNotificationsState(prev => ({ 
          ...prev, 
          error: '需要用户授权才能接收推送通知' 
        }));
        return;
      }

      // 创建新的推送订阅
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.VITE_VAPID_PUBLIC_KEY,
      });

      // 将订阅信息发送到服务器
      await notificationAPI.subscribeToPush(userId, subscription);

      setNotificationsState(prev => ({
        ...prev,
        isSubscribed: true,
        subscription,
      }));
    } catch (error) {
      console.error('订阅推送通知失败:', error);
      setNotificationsState(prev => ({ 
        ...prev, 
        error: '订阅推送通知失败，请重试' 
      }));
    }
  }, [userId]);

  const unsubscribeFromPush = useCallback(async (): Promise<void> => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      
      if (subscription) {
        await subscription.unsubscribe();
        await notificationAPI.unsubscribeFromPush(userId);
      }

      setNotificationsState(prev => ({
        ...prev,
        isSubscribed: false,
        subscription: null,
      }));
    } catch (error) {
      console.error('取消推送订阅失败:', error);
      setNotificationsState(prev => ({ 
        ...prev, 
        error: '取消推送订阅失败' 
      }));
    }
  }, [userId]);

  const loadMoreNotifications = useCallback(async (): Promise<void> => {
    if (!notificationsState.hasMore || notificationsState.isLoading) return;
    await fetchNotifications();
  }, [notificationsState.hasMore, notificationsState.isLoading, fetchNotifications]);

  const clearError = useCallback((): void => {
    setNotificationsState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...notificationsState,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    updateSettings,
    subscribeToPush,
    unsubscribeFromPush,
    loadMoreNotifications,
    clearError,
  };
};

export default useNotifications;