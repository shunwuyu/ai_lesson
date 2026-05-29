import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, AppAction } from '@/types';
import { initialState, appReducer } from '@/store/reducer';

// 创建上下文
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

// 自定义hook使用上下文
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp必须在AppProvider中使用');
  }
  return context;
};

// 提供者组件
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