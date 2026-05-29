import { useReducer } from 'react';
import todosReducer from '../reducers/todosReducer';
export function useTodos(initial = []) {
  const [todos, dispatch] = useReducer(todosReducer, initial);

  const addTodo = text => dispatch({ type: 'ADD_TODO', text });
  const toggleTodo = id => dispatch({ type: 'TOGGLE_TODO', id });
  const removeTodo = id => dispatch({ type: 'REMOVE_TODO', id });

  return { todos, addTodo, toggleTodo, removeTodo };
}


