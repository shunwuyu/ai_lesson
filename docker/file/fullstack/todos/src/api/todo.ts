// src/api/todoApi.ts
import service from './config'; // 导入封装好的 axios 实例
import { type Todo } from '../types/todo'; // 导入数据模型

// 获取所有 Todos
export const fetchTodos = () => {
  // 因为响应拦截器已经处理了 response.data，这里直接返回强类型数据
  return service.get<Todo[]>('/todos');
};

// 新增 Todo
export const createTodo = (title: string) => {
  return service.post<Todo>('/todos', { title });
};

// 更新 Todo 状态
export const updateTodo = (id: number, patch: Partial<Todo>) => {
  return service.patch<Todo>(`/todos/${id}`, patch);
};

// 删除 Todo
export const deleteTodo = (id: number) => {
  return service.delete(`/todos/${id}`);
};