import { createContext, useContext, useReducer } from 'react'

const initialState = {
  todos: [],
}

let nextOrder = 0

function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO': {
      const trimmed = action.payload.text.trim()
      if (!trimmed) return state
      const todo = {
        id: crypto.randomUUID(),
        text: trimmed,
        completed: false,
        order: nextOrder++,
      }
      return { todos: [...state.todos, todo] }
    }
    case 'TOGGLE_TODO':
      return {
        todos: state.todos.map((t) =>
          t.id === action.payload.id ? { ...t, completed: !t.completed } : t
        ),
      }
    case 'DELETE_TODO':
      return {
        todos: state.todos.filter((t) => t.id !== action.payload.id),
      }
    case 'REORDER_TODOS':
      return { todos: action.payload.todos }
    default:
      return state
  }
}

const TodoContext = createContext(null)

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialState)

  return (
    <TodoContext.Provider value={{ todos: state.todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  )
}

export function useTodoContext() {
  const ctx = useContext(TodoContext)
  if (!ctx) throw new Error('useTodoContext must be used within TodoProvider')
  return ctx
}
