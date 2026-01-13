// hooks/useTodos.ts
import { useState } from 'react'
import { Todo } from '../types/todo'
import { getStorage, setStorage } from '../utils/storage'

const STORAGE_KEY = 'todos'

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(
    () => getStorage<Todo[]>(STORAGE_KEY, [])
  )

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false
    }
    const newTodos = [...todos, newTodo]
    setTodos(newTodos)
    setStorage(STORAGE_KEY, newTodos)
  }

  const toggleTodo = (id: number) => {
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
    setTodos(newTodos)
    setStorage(STORAGE_KEY, newTodos)
  }

  const removeTodo = (id: number) => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
    setStorage(STORAGE_KEY, newTodos)
  }

  return {
    todos,
    addTodo,
    toggleTodo,
    removeTodo
  }
}
