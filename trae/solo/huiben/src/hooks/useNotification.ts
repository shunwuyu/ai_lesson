import { useState, useCallback, useEffect } from 'react';
import { notificationAPI } from '@/services/api';
import { Notification } from '@/types';

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
}

interface NotificationActions {
  fetchNotifications: () => Promise<void>;
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (notificationId: string) => Promise<void>;
  clearAllNotifications: () => Promise<void>;
  clearError: () => void;
}

export const useNotification = (): NotificationState & NotificationActions => {
  const [notificationState, setNotificationState] = useState<NotificationState>({
    notifications: [],
    unreadCount: 0,
    isLoading: false,
    error: null,
  });

  // 获取通知列表
  const fetchNotifications = useCallback(async (): Promise<void> => {
    setNotificationState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const notifications = await notificationAPI.getNotifications();
      const unreadCount = notifications.filter(n => !n.isRead).length;

      setNotificationState(prev => ({
        ...prev,
        notifications,
        unreadCount,
        isLoading: false,
      }));
    } catch (error: any) {
      setNotificationState(prev => ({
        ...prev,
        error: error.message || '获取通知列表失败',
        isLoading: false,
      }));
    }
  }, []);

  // 标记通知为已读
  const markAsRead = useCallback(async (notificationId: string): Promise<void> => {
    try {
      await notificationAPI.markAsRead(notificationId);
      
      setNotificationState(prev => ({
        ...prev,
        notifications: prev.notifications.map(notification =>
          notification.id === notificationId
            ? { ...notification, isRead: true }
            : notification
        ),
        unreadCount: Math.max(0, prev.unreadCount - 1),
      }));
    } catch (error) {
      console.error('标记通知为已读失败:', error);
      throw error;
    }
  }, []);

  // 标记所有通知为已读
  const markAllAsRead = useCallback(async (): Promise<void> => {
    try {
      await notificationAPI.markAllAsRead();
      
      setNotificationState(prev => ({
        ...prev,
        notifications: prev.notifications.map(notification => ({
          ...notification,
          isRead: true,
        })),
        unreadCount: 0,
      }));
    } catch (error) {
      console.error('标记所有通知为已读失败:', error);
      throw error;
    }
  }, []);

  // 删除通知
  const deleteNotification = useCallback(async (notificationId: string): Promise<void> => {
    try {
      await notificationAPI.deleteNotification(notificationId);
      
      setNotificationState(prev => {
        const notification = prev.notifications.find(n => n.id === notificationId);
        const wasUnread = notification && !notification.isRead;
        
        return {
          ...prev,
          notifications: prev.notifications.filter(n => n.id !== notificationId),
          unreadCount: wasUnread ? Math.max(0, prev.unreadCount - 1) : prev.unreadCount,
        };
      });
    } catch (error) {
      console.error('删除通知失败:', error);
      throw error;
    }
  }, []);

  // 清空所有通知
  const clearAllNotifications = useCallback(async (): Promise<void> => {
    try {
      await notificationAPI.clearAllNotifications();
      
      setNotificationState(prev => ({
        ...prev,
        notifications: [],
        unreadCount: 0,
      }));
    } catch (error) {
      console.error('清空通知失败:', error);
      throw error;
    }
  }, []);

  // 清除错误信息
  const clearError = useCallback((): void => {
    setNotificationState(prev => ({ ...prev, error: null }));
  }, []);

  // 自动刷新通知
  useEffect(() => {
    fetchNotifications();
    
    // 每30秒刷新一次通知
    const interval = setInterval(fetchNotifications, 30000);
    
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  return {
    ...notificationState,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    clearError,
  };
};

export default useNotification;