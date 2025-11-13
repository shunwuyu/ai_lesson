export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  childInfo?: {
    name: string;
    age: number;
    interests: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface PictureBook {
  id: string;
  title: string;
  author: string;
  illustrator?: string;
  description: string;
  coverImage: string;
  pages: BookPage[];
  category: string;
  ageGroup: string;
  tags: string[];
  isFavorite: boolean;
  readingCount: number;
  averageRating: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BookPage {
  id: string;
  pageNumber: number;
  imageUrl: string;
  text: string;
  audioUrl?: string;
  interactiveElements?: InteractiveElement[];
}

export interface InteractiveElement {
  id: string;
  type: 'hotspot' | 'animation' | 'sound' | 'question';
  position: { x: number; y: number };
  content: string;
  action?: string;
}

export interface ReadingProgress {
  id: string;
  userId: string;
  bookId: string;
  currentPage: number;
  totalPages: number;
  isCompleted: boolean;
  readingTime: number;
  lastReadAt: Date;
}

export interface ParentChildActivity {
  id: string;
  title: string;
  description: string;
  category: 'reading' | 'game' | 'craft' | 'outdoor' | 'music';
  difficulty: 'easy' | 'medium' | 'hard';
  ageRange: string;
  materials: string[];
  steps: string[];
  duration: number;
  imageUrl: string;
  isCompleted: boolean;
  completedAt?: Date;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  criteria: string;
  points: number;
  isUnlocked: boolean;
  unlockedAt?: Date;
}

export interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  pictureBooks: PictureBook[];
  currentBook: PictureBook | null;
  readingProgress: ReadingProgress[];
  activities: ParentChildActivity[];
  achievements: Achievement[];
  isLoading: boolean;
  error: string | null;
}

export type AppAction = 
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_BOOKS'; payload: PictureBook[] }
  | { type: 'SET_CURRENT_BOOK'; payload: PictureBook | null }
  | { type: 'ADD_TO_FAVORITES'; payload: string }
  | { type: 'REMOVE_FROM_FAVORITES'; payload: string }
  | { type: 'UPDATE_READING_PROGRESS'; payload: ReadingProgress }
  | { type: 'SET_ACTIVITIES'; payload: ParentChildActivity[] }
  | { type: 'UNLOCK_ACHIEVEMENT'; payload: string }
  | { type: 'CLEAR_ERROR' };

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  childName?: string;
  childAge?: number;
}

export interface BookFilter {
  category?: string;
  ageGroup?: string;
  searchTerm?: string;
  sortBy?: 'title' | 'author' | 'rating' | 'readingCount' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}