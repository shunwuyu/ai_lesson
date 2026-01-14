// components/TodoList.tsx
import { Todo } from '../types/todo'
import { TodoItem } from './TodoItem'
// 确保组件接收正确的数据结构，提升类型安全与代码可维护性。
interface Props {
  todos: Todo[]
  onToggle: (id: number) => void
  onRemove: (id: number) => void
}

export function TodoList({ todos, onToggle, onRemove }: Props) {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onRemove={onRemove}
        />
      ))}
    </ul>
  )
}
