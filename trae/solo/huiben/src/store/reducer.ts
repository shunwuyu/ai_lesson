import { AppState, AppAction } from '@/types';

// 初始状态
export const initialState: AppState = {
  user: null,
  books: [],
  activities: [],
  currentBook: null,
  currentActivity: null,
  isLoading: false,
  error: null,
};

// Reducer函数
export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    
    case 'SET_USER':
      return { ...state, user: action.payload, error: null };
    
    case 'SET_BOOKS':
      return { ...state, books: action.payload, isLoading: false };
    
    case 'SET_ACTIVITIES':
      return { ...state, activities: action.payload, isLoading: false };
    
    case 'SET_CURRENT_BOOK':
      return { ...state, currentBook: action.payload };
    
    case 'SET_CURRENT_ACTIVITY':
      return { ...state, currentActivity: action.payload };
    
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    
    case 'RESET_STATE':
      return initialState;
    
    default:
      return state;
  }
}