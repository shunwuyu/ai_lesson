import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { AppState, User, PictureBook, ReadingProgress, ParentChildActivity, Achievement } from '@/types';

interface AppStore extends AppState {
  // Actions
  login: (user: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  setBooks: (books: PictureBook[]) => void;
  setCurrentBook: (book: PictureBook | null) => void;
  addToFavorites: (bookId: string) => void;
  removeFromFavorites: (bookId: string) => void;
  updateReadingProgress: (progress: ReadingProgress) => void;
  setActivities: (activities: ParentChildActivity[]) => void;
  completeActivity: (activityId: string) => void;
  unlockAchievement: (achievementId: string) => void;
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

export const useStore = create<AppStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        // Authentication actions
        login: (user) => set({ user, isAuthenticated: true, error: null }),
        logout: () => set({ ...initialState }),

        // UI state actions
        setLoading: (loading) => set({ isLoading: loading }),
        setError: (error) => set({ error }),
        clearError: () => set({ error: null }),

        // Books actions
        setBooks: (books) => set({ pictureBooks: books }),
        setCurrentBook: (book) => set({ currentBook: book }),
        
        addToFavorites: (bookId) => {
          const { pictureBooks } = get();
          const updatedBooks = pictureBooks.map(book =>
            book.id === bookId ? { ...book, isFavorite: true } : book
          );
          set({ pictureBooks: updatedBooks });
        },

        removeFromFavorites: (bookId) => {
          const { pictureBooks } = get();
          const updatedBooks = pictureBooks.map(book =>
            book.id === bookId ? { ...book, isFavorite: false } : book
          );
          set({ pictureBooks: updatedBooks });
        },

        // Reading progress actions
        updateReadingProgress: (progress) => {
          const { readingProgress } = get();
          const existingIndex = readingProgress.findIndex(p => p.id === progress.id);
          
          if (existingIndex >= 0) {
            const updatedProgress = [...readingProgress];
            updatedProgress[existingIndex] = progress;
            set({ readingProgress: updatedProgress });
          } else {
            set({ readingProgress: [...readingProgress, progress] });
          }
        },

        // Activities actions
        setActivities: (activities) => set({ activities }),
        completeActivity: (activityId) => {
          const { activities } = get();
          const updatedActivities = activities.map(activity =>
            activity.id === activityId 
              ? { ...activity, isCompleted: true, completedAt: new Date() }
              : activity
          );
          set({ activities: updatedActivities });
        },

        // Achievements actions
        unlockAchievement: (achievementId) => {
          const { achievements } = get();
          const updatedAchievements = achievements.map(achievement =>
            achievement.id === achievementId
              ? { ...achievement, isUnlocked: true, unlockedAt: new Date() }
              : achievement
          );
          set({ achievements: updatedAchievements });
        },
      }),
      {
        name: 'huiben-store',
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
          pictureBooks: state.pictureBooks,
          readingProgress: state.readingProgress,
          activities: state.activities,
          achievements: state.achievements,
        }),
      }
    )
  )
);

// Selectors
export const useAuth = () => {
  const { user, isAuthenticated } = useStore();
  return { user, isAuthenticated };
};

export const useBooks = () => {
  const { pictureBooks, currentBook } = useStore();
  return { pictureBooks, currentBook };
};

export const useReadingProgress = () => {
  const { readingProgress } = useStore();
  return { readingProgress };
};

export const useActivities = () => {
  const { activities } = useStore();
  return { activities };
};

export const useAchievements = () => {
  const { achievements } = useStore();
  return { achievements };
};

export const useUI = () => {
  const { isLoading, error } = useStore();
  return { isLoading, error };
};