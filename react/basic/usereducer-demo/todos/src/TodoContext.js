import { createContext, useContext } from 'react';

export const TodoContext = createContext(null);

export function useTodoContext() {
  return useContext(TodoContext);
}
