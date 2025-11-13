import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { appReducer, initialState } from './reducer';
import { AppState, AppAction } from '@/types';

// 创建Context
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// 自定义Hook
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Provider组件
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// 自定义Hooks用于特定功能
export const useAuth = () => {
  const { state, dispatch } = useApp();
  return {
    user: state.auth.user,
    children: state.auth.children,
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading,
    error: state.auth.error,
    setUser: (user: AppState['auth']['user']) => dispatch({ type: 'SET_USER', payload: user }),
    setChildren: (children: AppState['auth']['children']) => dispatch({ type: 'SET_CHILDREN', payload: children }),
    setAuthLoading: (loading: boolean) => dispatch({ type: 'SET_AUTH_LOADING', payload: loading }),
    setAuthError: (error: string | null) => dispatch({ type: 'SET_AUTH_ERROR', payload: error }),
    logout: () => dispatch({ type: 'LOGOUT' }),
  };
};

export const useCart = () => {
  const { state, dispatch } = useApp();
  return {
    cart: state.cart,
    addToCart: (item: any) => dispatch({ type: 'ADD_TO_CART', payload: item }),
    removeFromCart: (id: string) => dispatch({ type: 'REMOVE_FROM_CART', payload: id }),
    updateCartQuantity: (id: string, quantity: number) => 
      dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id, quantity } }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' }),
  };
};

export const useFavorites = () => {
  const { state, dispatch } = useApp();
  return {
    favorites: state.favorites,
    addToFavorites: (item: any) => dispatch({ type: 'ADD_TO_FAVORITES', payload: item }),
    removeFromFavorites: (id: string) => dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: id }),
    setFavorites: (favorites: any[]) => dispatch({ type: 'SET_FAVORITES', payload: favorites }),
  };
};

export const useReadingRecords = () => {
  const { state, dispatch } = useApp();
  return {
    readingRecords: state.readingRecords,
    addReadingRecord: (record: any) => dispatch({ type: 'ADD_READING_RECORD', payload: record }),
    setReadingRecords: (records: any[]) => dispatch({ type: 'SET_READING_RECORDS', payload: records }),
  };
};

export const useUI = () => {
  const { state, dispatch } = useApp();
  return {
    isLoading: state.ui.isLoading,
    error: state.ui.error,
    toast: state.ui.toast,
    setLoading: (loading: boolean) => dispatch({ type: 'SET_LOADING', payload: loading }),
    setError: (error: string | null) => dispatch({ type: 'SET_ERROR', payload: error }),
    showToast: (message: string, type: 'success' | 'error' | 'info' = 'info') => 
      dispatch({ type: 'SHOW_TOAST', payload: { message, type } }),
    hideToast: () => dispatch({ type: 'HIDE_TOAST' }),
  };
};