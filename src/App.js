import React, { useState, useEffect } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import { Context } from './components/context';

function App() {
  const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState('');

  const handleClick = () => {
    console.log('click');
  }

  useEffect(() => {
    const whenStart = localStorage.getItem('todos') || []
    setTodos(JSON.parse(whenStart))
  }, [])

  useEffect(() => {
    document.addEventListener('click', handleClick)
    localStorage.setItem('todos', JSON.stringify(todos))
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [todos])


  const addTodo = (e) => {
    if (e.key === "Enter") {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          title: todoTitle,
          completed: false
        }
      ])
      setTodoTitle('')
    }
  }

  const removeTodo = id => {
    setTodos(todos.filter( todo => {
      return todo.id !== id
    }))
  }

  const toggleTodo = id => {
    setTodos(todos.map( todo => {
      if(todo.id === id ) todo.completed = !todo.completed
      return todo
    }))
  }

  return (
    <Context.Provider value={{ toggleTodo, removeTodo}}>
      <div className="app">
        <h1>TODO App</h1>
        <div className="input-field">
          <input
              className="input-task"
              placeholder="Input U task"
              type="text"
              value={todoTitle}
              onChange={event => setTodoTitle(event.target.value)}
              onKeyPress={addTodo}
            />
        </div>
        <TodoList todos={todos} />
      </div>
    </Context.Provider>
  );
}

export default App;
