import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState('');
  const [newTask, setNewTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

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

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditingText(todo.name);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingText('');
  };

  const saveEdit = async (taskId) => {
    if (!editingText.trim()) {
      setError('Task name cannot be empty.');
      return;
    }
    try {
      await axios.patch(
        `http://127.0.0.1:8000/tasks/${taskId}/`,
        { name: editingText },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setEditingId(null);
      setEditingText('');
      fetchTodos();
    } catch (err) {
      console.error('Failed to update task name:', err);
      setError('Could not update task.');
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
          <li key={todo.id} className="todo-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div className="todo-item-left" style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id, todo.completed)}
                className="todo-checkbox"
              />

              {editingId === todo.id ? (
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="todo-edit-input"
                  autoFocus
                  style={{ flex: 1, padding: '4px' }}
                />
              ) : (
                <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                  {todo.name}
                </span>
              )}
            </div>

            {editingId === todo.id ? (
              <div style={{ display: 'flex', gap: '8px', marginLeft: '10px' }}>
                <button
                  onClick={() => saveEdit(todo.id)}
                  className="save-button"
                >
                  Save
                </button>
                <button
                  onClick={cancelEditing}
                  className="cancel-button"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '8px', marginLeft: '10px' }}>
                <button
                  onClick={() => startEditing(todo)}
                  className="edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(todo.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
