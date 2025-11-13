import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, AppAction, User, PictureBook, ReadingProgress, ParentChildActivity, Achievement } from '../types';

interface AppStore extends AppState {
  dispatch: (action: AppAction) => void;
  login: (user: User) => void;
  logout: () => void;
  setBooks: (books: PictureBook[]) => void;
  setCurrentBook: (book: PictureBook | null) => void;
  toggleFavorite: (bookId: string) => void;
  updateReadingProgress: (progress: ReadingProgress) => void;
  setActivities: (activities: ParentChildActivity[]) => void;
  unlockAchievement: (achievementId: string) => void;
  clearError: () => void;
}

const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  pictureBooks: [],
  currentBook: null,
  readingProgress: [],
  activities: [],
  achievements: [],
  isLoading: false,
  error: null,
};

const reducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'LOGIN_SUCCESS':
      return { 
        ...state, 
        user: action.payload, 
        isAuthenticated: true,
        error: null 
      };
    case 'LOGOUT':
      return { 
        ...state, 
        user: null, 
        isAuthenticated: false,
        currentBook: null,
        readingProgress: []
      };
    case 'SET_BOOKS':
      return { ...state, pictureBooks: action.payload };
    case 'SET_CURRENT_BOOK':
      return { ...state, currentBook: action.payload };
    case 'ADD_TO_FAVORITES':
      return {
        ...state,
        pictureBooks: state.pictureBooks.map(book =>
          book.id === action.payload ? { ...book, isFavorite: true } : book
        ),
        currentBook: state.currentBook?.id === action.payload 
          ? { ...state.currentBook, isFavorite: true }
          : state.currentBook
      };
    case 'REMOVE_FROM_FAVORITES':
      return {
        ...state,
        pictureBooks: state.pictureBooks.map(book =>
          book.id === action.payload ? { ...book, isFavorite: false } : book
        ),
        currentBook: state.currentBook?.id === action.payload 
          ? { ...state.currentBook, isFavorite: false }
          : state.currentBook
      };
    case 'UPDATE_READING_PROGRESS':
      return {
        ...state,
        readingProgress: state.readingProgress.some(p => p.id === action.payload.id)
          ? state.readingProgress.map(p => 
              p.id === action.payload.id ? action.payload : p
            )
          : [...state.readingProgress, action.payload]
      };
    case 'SET_ACTIVITIES':
      return { ...state, activities: action.payload };
    case 'UNLOCK_ACHIEVEMENT':
      return {
        ...state,
        achievements: state.achievements.map(achievement =>
          achievement.id === action.payload
            ? { ...achievement, isUnlocked: true, unlockedAt: new Date() }
            : achievement
        )
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      dispatch: (action) => set((state) => reducer(state, action)),
      
      login: (user) => {
        set({ user, isAuthenticated: true, error: null });
      },
      
      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false, 
          currentBook: null,
          readingProgress: []
        });
      },
      
      setBooks: (books) => {
        set({ pictureBooks: books });
      },
      
      setCurrentBook: (book) => {
        set({ currentBook: book });
      },
      
      toggleFavorite: (bookId) => {
        const state = get();
        const book = state.pictureBooks.find(b => b.id === bookId);
        if (book) {
          const action = book.isFavorite ? 'REMOVE_FROM_FAVORITES' : 'ADD_TO_FAVORITES';
          set(reducer(state, { type: action, payload: bookId }));
        }
      },
      
      updateReadingProgress: (progress) => {
        set((state) => reducer(state, { type: 'UPDATE_READING_PROGRESS', payload: progress }));
      },
      
      setActivities: (activities) => {
        set({ activities });
      },
      
      unlockAchievement: (achievementId) => {
        set((state) => reducer(state, { type: 'UNLOCK_ACHIEVEMENT', payload: achievementId }));
      },
      
      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'huiben-store',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        readingProgress: state.readingProgress,
        achievements: state.achievements,
      }),
    }
  )
);