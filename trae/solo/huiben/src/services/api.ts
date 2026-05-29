import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { User, PictureBook, ReadingProgress, ParentChildActivity, Achievement } from '@/types';

// API 基础配置
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// 创建 axios 实例
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // 处理未授权错误
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API 响应类型
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// 用户认证相关 API
export const authAPI = {
  // 用户登录
  login: async (email: string, password: string): Promise<User> => {
    const response = await apiClient.post<ApiResponse<User>>('/auth/login', {
      email,
      password,
    });
    return response.data.data;
  },

  // 用户注册
  register: async (userData: {
    email: string;
    password: string;
    name: string;
    role: 'parent' | 'child';
    avatar?: string;
  }): Promise<User> => {
    const response = await apiClient.post<ApiResponse<User>>('/auth/register', userData);
    return response.data.data;
  },

  // 获取当前用户信息
  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<ApiResponse<User>>('/auth/me');
    return response.data.data;
  },

  // 更新用户信息
  updateProfile: async (userData: Partial<User>): Promise<User> => {
    const response = await apiClient.put<ApiResponse<User>>('/auth/profile', userData);
    return response.data.data;
  },

  // 退出登录
  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
    localStorage.removeItem('auth_token');
  },
};

// 绘本相关 API
export const booksAPI = {
  // 获取绘本列表
  getBooks: async (params?: {
    category?: string;
    ageGroup?: string;
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<PictureBook[]> => {
    const response = await apiClient.get<ApiResponse<PictureBook[]>>('/books', {
      params,
    });
    return response.data.data;
  },

  // 获取单个绘本详情
  getBook: async (id: string): Promise<PictureBook> => {
    const response = await apiClient.get<ApiResponse<PictureBook>>(`/books/${id}`);
    return response.data.data;
  },

  // 获取推荐绘本
  getRecommendedBooks: async (userId: string): Promise<PictureBook[]> => {
    const response = await apiClient.get<ApiResponse<PictureBook[]>>(`/books/recommended/${userId}`);
    return response.data.data;
  },

  // 收藏绘本
  addToFavorites: async (bookId: string): Promise<void> => {
    await apiClient.post(`/books/${bookId}/favorite`);
  },

  // 取消收藏
  removeFromFavorites: async (bookId: string): Promise<void> => {
    await apiClient.delete(`/books/${bookId}/favorite`);
  },

  // 获取用户收藏的绘本
  getFavoriteBooks: async (): Promise<PictureBook[]> => {
    const response = await apiClient.get<ApiResponse<PictureBook[]>>('/books/favorites');
    return response.data.data;
  },
};

// 阅读进度相关 API
export const readingAPI = {
  // 获取阅读进度
  getReadingProgress: async (bookId: string): Promise<ReadingProgress> => {
    const response = await apiClient.get<ApiResponse<ReadingProgress>>(`/reading/${bookId}`);
    return response.data.data;
  },

  // 更新阅读进度
  updateReadingProgress: async (bookId: string, progress: {
    currentPage: number;
    totalPages: number;
    completed: boolean;
  }): Promise<ReadingProgress> => {
    const response = await apiClient.post<ApiResponse<ReadingProgress>>(`/reading/${bookId}`, progress);
    return response.data.data;
  },

  // 获取用户的所有阅读进度
  getAllReadingProgress: async (): Promise<ReadingProgress[]> => {
    const response = await apiClient.get<ApiResponse<ReadingProgress[]>>('/reading');
    return response.data.data;
  },

  // 记录阅读时间
  recordReadingTime: async (bookId: string, duration: number): Promise<void> => {
    await apiClient.post(`/reading/${bookId}/time`, { duration });
  },
};

// 亲子活动相关 API
export const activitiesAPI = {
  // 获取活动列表
  getActivities: async (params?: {
    category?: string;
    ageGroup?: string;
    page?: number;
    limit?: number;
  }): Promise<ParentChildActivity[]> => {
    const response = await apiClient.get<ApiResponse<ParentChildActivity[]>>('/activities', {
      params,
    });
    return response.data.data;
  },

  // 获取单个活动详情
  getActivity: async (id: string): Promise<ParentChildActivity> => {
    const response = await apiClient.get<ApiResponse<ParentChildActivity>>(`/activities/${id}`);
    return response.data.data;
  },

  // 完成活动
  completeActivity: async (activityId: string): Promise<void> => {
    await apiClient.post(`/activities/${activityId}/complete`);
  },

  // 获取已完成的活动
  getCompletedActivities: async (): Promise<ParentChildActivity[]> => {
    const response = await apiClient.get<ApiResponse<ParentChildActivity[]>>('/activities/completed');
    return response.data.data;
  },
};

// 成就相关 API
export const achievementsAPI = {
  // 获取成就列表
  getAchievements: async (): Promise<Achievement[]> => {
    const response = await apiClient.get<ApiResponse<Achievement[]>>('/achievements');
    return response.data.data;
  },

  // 解锁成就
  unlockAchievement: async (achievementId: string): Promise<void> => {
    await apiClient.post(`/achievements/${achievementId}/unlock`);
  },

  // 获取用户已解锁的成就
  getUnlockedAchievements: async (): Promise<Achievement[]> => {
    const response = await apiClient.get<ApiResponse<Achievement[]>>('/achievements/unlocked');
    return response.data.data;
  },
};

// 工具函数
export const setAuthToken = (token: string): void => {
  localStorage.setItem('auth_token', token);
};

export const removeAuthToken = (): void => {
  localStorage.removeItem('auth_token');
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

// 错误处理
export const handleApiError = (error: any): string => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return '操作失败，请稍后重试';
};

export default apiClient;