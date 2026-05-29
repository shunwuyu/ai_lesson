// src/counterSlice.ts
import { createSlice } from '@reduxjs/toolkit';
// Slice 是 Redux 应用中管理特定功能或领域状态的一组 reducers 和 actions 的集合。
// 在 Redux 中，reducer 是一个纯函数，它接收当前状态和一个动作（action）作为参数，并返回一个新的状态，以此来描述如何更新应用的状态。
interface CounterState {
  value: number;
}

// 初始值
const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;