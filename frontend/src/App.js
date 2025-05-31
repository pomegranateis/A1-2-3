import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL);
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err.message);
    }
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
    try {
      await axios.post(API_URL, { description: newTask });
      setNewTask("");
      fetchTasks();
    } catch (err) {
      console.error("Error adding task:", err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err.message);
    }
  };

  const updateTask = async (id, currentDescription) => {
    const updated = prompt("Edit task:", currentDescription);
    if (updated && updated.trim()) {
      try {
        await axios.put(`${API_URL}/${id}`, { description: updated });
        fetchTasks();
      } catch (err) {
        console.error("Error updating task:", err.message);
      }
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>To-Do List</h1>
      <input
        type="text"
        placeholder="New task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.description}{" "}
            <button onClick={() => deleteTask(task.id)}>X</button>
            <button onClick={() => updateTask(task.id, task.description)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
