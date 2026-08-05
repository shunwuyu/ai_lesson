let todos = [
  { id: 1, title: "学习Next.js", completed: false }
];
let nextId = 2;

export function getTodos() {
  return todos;
}

export function addTodo(title) {
  const newTodo = {
    id: nextId++,
    title,
    completed: false
  };
  todos.push(newTodo);
  return newTodo;
}

export function toggleTodo(id, completed) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = completed;
  }
  return todo;
}

export function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  return { ok: true };
}
