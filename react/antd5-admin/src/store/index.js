// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice'; // 假设 counterSlice 存放在同一级目录下

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export default store;