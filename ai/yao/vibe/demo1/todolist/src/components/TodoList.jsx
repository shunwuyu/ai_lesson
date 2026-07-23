import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { useTodoContext } from '../context/TodoContext'
import TodoItem from './TodoItem'

export default function TodoList() {
  const { todos, dispatch } = useTodoContext()

  const handleDragEnd = (result) => {
    if (!result.destination) return
    const reordered = Array.from(todos)
    const [moved] = reordered.splice(result.source.index, 1)
    reordered.splice(result.destination.index, 0, moved)
    dispatch({ type: 'REORDER_TODOS', payload: { todos: reordered } })
  }

  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center">
        <svg className="h-16 w-16 text-gray-300" viewBox="0 0 64 64" fill="none">
          <rect x="8" y="8" width="48" height="48" rx="8" stroke="currentColor" strokeWidth="2" />
          <line x1="20" y1="24" x2="44" y2="24" stroke="currentColor" strokeWidth="2" />
          <line x1="20" y1="32" x2="38" y2="32" stroke="currentColor" strokeWidth="2" />
          <line x1="20" y1="40" x2="34" y2="40" stroke="currentColor" strokeWidth="2" />
        </svg>
        <p className="text-gray-400 text-base">暂无任务，添加一条开始吧</p>
      </div>
    )
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="todolist">
        {(provided) => (
          <div
            className="flex flex-col gap-2"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {todos.map((todo, index) => (
              <TodoItem key={todo.id} todo={todo} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
