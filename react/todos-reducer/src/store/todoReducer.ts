// store/todoReducer.ts

export interface Todo {
    id: number;
    text: string;
    completed: boolean;
  }
  
  export interface TodoState {
    todos: Todo[];
  }
  
  export type TodoAction =
    | { type: 'ADD_TODO'; payload: string }
    | { type: 'TOGGLE_TODO'; payload: number }
    | { type: 'REMOVE_TODO'; payload: number };
  
  export const initialState: TodoState = {
    todos: [],
  };
  
  export const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
    switch (action.type) {
      case 'ADD_TODO':
        return {
          ...state,
          todos: [
            ...state.todos,
            { id: Date.now(), text: action.payload, completed: false },
          ],
        };
      case 'TOGGLE_TODO':
        return {
          ...state,
          todos: state.todos.map((todo) =>
            todo.id === action.payload
              ? { ...todo, completed: !todo.completed }
              : todo
          ),
        };
      case 'REMOVE_TODO':
        return {
          ...state,
          todos: state.todos.filter((todo) => todo.id !== action.payload),
        };
      default:
        return state;
    }
  };
  