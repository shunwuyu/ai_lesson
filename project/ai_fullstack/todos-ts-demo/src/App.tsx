// App.tsx
import { useTodos } from './hooks/useTodos'
import { TodoInput } from './components/TodoInput'
import { TodoList } from './components/TodoList'

export default function App() {
  const { todos, addTodo, toggleTodo, removeTodo } = useTodos()

  return (
    <div>
      <h1>Todo List</h1>
      <TodoInput onAdd={addTodo} />
      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onRemove={removeTodo}
      />
    </div>
  )
}
