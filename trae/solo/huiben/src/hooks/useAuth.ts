import { useState, useEffect, useCallback } from 'react';
import { User, AuthResponse, LoginCredentials, RegisterCredentials } from '@/types';
import { authAPI } from '@/services/api';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  register: (credentials: RegisterCredentials) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<User | null>;
  refreshUser: () => Promise<void>;
  clearError: () => void;
}

export const useAuth = (): AuthState & AuthActions => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
    isAuthenticated: false,
  });

  // 检查本地存储的token
  const checkStoredAuth = useCallback(async (): Promise<void> => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        setAuthState({
          user,
          isLoading: false,
          error: null,
          isAuthenticated: true,
        });
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuthState({
          user: null,
          isLoading: false,
          error: null,
          isAuthenticated: false,
        });
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = useCallback(async (credentials: LoginCredentials): Promise<AuthResponse> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await authAPI.login(credentials);
      
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      setAuthState({
        user: response.user,
        isLoading: false,
        error: null,
        isAuthenticated: true,
      });

      return response;
    } catch (error: any) {
      const errorMessage = error.message || '登录失败，请检查用户名和密码';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  const register = useCallback(async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await authAPI.register(credentials);
      
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      setAuthState({
        user: response.user,
        isLoading: false,
        error: null,
        isAuthenticated: true,
      });

      return response;
    } catch (error: any) {
      const errorMessage = error.message || '注册失败，请重试';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));

    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setAuthState({
        user: null,
        isLoading: false,
        error: null,
        isAuthenticated: false,
      });
    }
  }, []);

  const updateProfile = useCallback(async (userData: Partial<User>): Promise<User | null> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const updatedUser = await authAPI.updateProfile(userData);
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      setAuthState(prev => ({
        ...prev,
        user: updatedUser,
        isLoading: false,
        error: null,
      }));

      return updatedUser;
    } catch (error: any) {
      const errorMessage = error.message || '更新个人信息失败';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  const refreshUser = useCallback(async (): Promise<void> => {
    try {
      const user = await authAPI.getCurrentUser();
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        setAuthState(prev => ({
          ...prev,
          user,
          isAuthenticated: true,
        }));
      }
    } catch (error) {
      console.error('Refresh user error:', error);
    }
  }, []);

  const clearError = useCallback((): void => {
    setAuthState(prev => ({ ...prev, error: null }));
  }, []);

  // 初始化检查
  useEffect(() => {
    checkStoredAuth();
  }, [checkStoredAuth]);

  return {
    ...authState,
    login,
    register,
    logout,
    updateProfile,
    refreshUser,
    clearError,
  };
};

export default useAuth;