import { makeAutoObservable } from "mobx";

class TodoStore {
  todos: { id: number; text: string; completed: boolean }[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addTodo(text: string) {
    const todo = { id: Date.now(), text, completed: false };
    this.todos.push(todo);
  }

  toggleTodo(id: number) {
    const todo = this.todos.find(todo => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }

  removeTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }
}

export default new TodoStore();