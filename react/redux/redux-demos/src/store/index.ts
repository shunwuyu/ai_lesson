// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice.ts';
import todoReducer from './todoSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todoReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
// ReturnType 是 TypeScript 的一个工具类型，用于提取函数的返回类型。
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;