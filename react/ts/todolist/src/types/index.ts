// types/index.ts
export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export type TodoState = {
  todos: Todo[];
};

export type TodoAction =
  | { type: 'ADD_TODO'; payload: { text: string } }
  | { type: 'TOGGLE_TODO'; payload: { id: number } }
  | { type: 'DELETE_TODO'; payload: { id: number } };

export type TodoContextType = {
  state: TodoState;
  dispatch: React.Dispatch<TodoAction>;
};