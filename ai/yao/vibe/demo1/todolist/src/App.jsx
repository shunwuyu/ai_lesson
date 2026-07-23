import { TodoProvider, useTodoContext } from './context/TodoContext'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'

function Header({ todos }) {
  const completed = todos.filter((t) => t.completed).length
  const total = todos.length

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-800">待办清单</h1>
      {total > 0 && (
        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-500">
          {completed} / {total}
        </span>
      )}
    </div>
  )
}

function AppContent() {
  const { todos } = useTodoContext()
  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col gap-6 px-4 py-10">
      <Header todos={todos} />
      <TodoInput />
      <TodoList />
    </div>
  )
}

export default function App() {
  return (
    <TodoProvider>
      <AppContent />
    </TodoProvider>
  )
}
