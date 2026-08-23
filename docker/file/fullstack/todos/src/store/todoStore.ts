import { create } from 'zustand';
import {type Todo } from '../types/todo';

interface TodoStore {
  todos: Todo[];
  fetchTodos: () => Promise<void>;
  addTodo: (title: string) => Promise<void>;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  fetchTodos: async () => {
    const res = await fetch('/api/todos'); // 请求通过 Nginx 代理
    const data = await res.json();
    set({ todos: data });
  },
  addTodo: async (title: string) => {
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    const newTodo = await res.json();
    set((state) => ({ todos: [...state.todos, newTodo] }));
  },
}));