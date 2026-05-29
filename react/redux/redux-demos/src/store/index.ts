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
// TypeScript 中定义类型的语句，
// 这个类型是 store.dispatch 函数的类型。在 Redux 应用里，dispatch 函数用于分发 
// action 到 reducer 中，从而更新应用的状态。
export type AppDispatch = typeof store.dispatch;