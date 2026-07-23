import { Draggable } from '@hello-pangea/dnd'
import { useTodoContext } from '../context/TodoContext'

export default function TodoItem({ todo, index }) {
  const { dispatch } = useTodoContext()

  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`group flex items-center gap-3 rounded-lg border px-3 py-3 shadow-sm transition-all hover:shadow-md cursor-grab ${
            snapshot.isDragging
              ? 'border-blue-400 bg-blue-50 shadow-lg opacity-90'
              : 'border-gray-200 bg-white'
          }`}
        >
          {/* Drag handle */}
          <span
            {...provided.dragHandleProps}
            className="flex-shrink-0 cursor-grab text-gray-300 transition-colors hover:text-gray-500 active:cursor-grabbing"
            aria-label="拖拽排序"
          >
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
              <circle cx="5" cy="3" r="1.5" />
              <circle cx="11" cy="3" r="1.5" />
              <circle cx="5" cy="8" r="1.5" />
              <circle cx="11" cy="8" r="1.5" />
              <circle cx="5" cy="13" r="1.5" />
              <circle cx="11" cy="13" r="1.5" />
            </svg>
          </span>

          {/* Toggle checkbox */}
          <button
            className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors cursor-pointer ${todo.completed ? 'border-green-500 bg-green-500' : 'border-gray-300 hover:border-blue-400'}`}
            onClick={() =>
              dispatch({ type: 'TOGGLE_TODO', payload: { id: todo.id } })
            }
            aria-label={todo.completed ? '标记未完成' : '标记完成'}
          >
            {todo.completed && (
              <svg className="h-3 w-3 text-white" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2.5 6L5 8.5L9.5 3.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>

          {/* Text */}
          <span
            className={`flex-1 text-base transition-all ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}
          >
            {todo.text}
          </span>

          {/* Delete button */}
          <button
            className="flex-shrink-0 rounded-md p-1.5 text-gray-400 opacity-0 transition-all hover:bg-red-50 hover:text-red-500 group-hover:opacity-100 cursor-pointer"
            onClick={() =>
              dispatch({ type: 'DELETE_TODO', payload: { id: todo.id } })
            }
            aria-label="删除任务"
          >
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
              <path
                d="M5 2h6M2 4h12M5.333 4v9.333a.667.667 0 00.667.667h4a.667.667 0 00.667-.667V4M6.667 7v4M9.333 7v4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </Draggable>
  )
}
