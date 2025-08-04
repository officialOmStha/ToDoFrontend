import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState('');
  const [newTask, setNewTask] = useState('');

  const token = localStorage.getItem('token');

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/tasks/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setTodos(response.data);
    } catch (err) {
      setError('Failed to fetch tasks. Make sure you are logged in.');
    }
  };

  const toggleComplete = async (taskId, currentStatus) => {
    try {
      await axios.patch(
        `http://127.0.0.1:8000/tasks/${taskId}/`,
        { completed: !currentStatus },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      fetchTodos();
    } catch (err) {
      console.error('Failed to update task:', err);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/tasks/',
        { name: newTask },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setTodos([...todos, response.data]);
      setNewTask('');
    } catch (err) {
      console.error('Failed to add task:', err);
      setError('Could not add task.');
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/tasks/${taskId}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setTodos(todos.filter((todo) => todo.id !== taskId));
    } catch (err) {
      console.error('Failed to delete task:', err);
      setError('Could not delete task.');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="todo-container">
      <h2 className="todo-title">My Todo List</h2>

      <form className="todo-form" onSubmit={addTask}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
          className="todo-input"
        />
        <button type="submit" className="todo-button">Add Task</button>
      </form>

      {error && <p className="todo-error">{error}</p>}

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <div className='todo-item-left'>
              <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id, todo.completed)}
              className="todo-checkbox"
            />
            <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
              {todo.name}
            </span>
            </div>
            <button
              onClick={() => deleteTask(todo.id)}
              className="delete-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
