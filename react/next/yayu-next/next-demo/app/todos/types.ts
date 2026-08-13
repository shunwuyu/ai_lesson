// app/todos/types.ts
// 待办项类型（route.ts 与 page.tsx 共享）
export type Todo = {
  id: number
  content: string
  completed: boolean
}
