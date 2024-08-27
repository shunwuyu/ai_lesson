import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter', // 片段的名字，用来区分不同的状态片段
  initialState: { value: 0 }, // 初始状态
  reducers: { // 定义可以改变状态的动作
    increment: (state) => { // 自定义动作函数
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = 0;
    }
  }
});

// 从 slice 对象中导出 action 创建函数
export const { increment, decrement, reset } = counterSlice.actions;

// 导出 reducer 函数，以便在 store 中使用
export default counterSlice.reducer;