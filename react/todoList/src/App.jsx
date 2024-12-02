import React, { Component } from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    this.state = {
      todos: savedTodos,
    };
  }

  componentDidUpdate() {
    localStorage.setItem('todos', JSON.stringify(this.state.todos));
  }

  addTodo = (text) => {
    this.setState((prevState) => ({
      todos: [...prevState.todos, { text, completed: false }],
    }));
  };

  toggleTodo = (index) => {
    const newTodos = [...this.state.todos];
    newTodos[index].completed = !newTodos[index].completed;
    this.setState({ todos: newTodos });
  };

  deleteTodo = (index) => {
    const newTodos = [...this.state.todos];
    newTodos.splice(index, 1);
    this.setState({ todos: newTodos });
  };

  editTodo = (index, newText) => {
    const newTodos = [...this.state.todos];
    newTodos[index].text = newText;
    this.setState({ todos: newTodos });
  };

  render() {
    return (
      <div className="todo-app">
        <h1 className="todo-app__title">Todo List</h1>
        <TodoForm addTodo={this.addTodo} />
        <TodoList
          todos={this.state.todos}
          toggleTodo={this.toggleTodo}
          deleteTodo={this.deleteTodo}
          editTodo={this.editTodo}
        />
      </div>
    );
  }
}

export default App;
