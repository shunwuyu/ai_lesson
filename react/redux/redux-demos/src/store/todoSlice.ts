// src/todoSlice.ts
// PayloadAction 是 Redux Toolkit 中的一个类型，用于定义 Redux action 的 payload 类型。
// PayloadAction 是 Redux Toolkit 提供的一个类型工具，用于明确 Redux action 中 payload 的数据类型。
// @reduxjs/toolkit 简化了 Redux 开发流程，
// createSlice 是 Redux Toolkit 提供的一个函数，用来简化 Redux 中 reducer 和 action 的创建。
// 公司
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// reducer是纯函数 
// 接收当前状态和action，返回更新后的状态。
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // 范型类型
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };
      // slice 内置immer 
      // 状态是只读的，并且只能通过纯函数（reducers）来更新
      state.todos.push(newTodo);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
  },
});
// action 返回
// Redux Toolkit 会为每个 reducer 自动生成一个对应的 action 创建函数：
export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;