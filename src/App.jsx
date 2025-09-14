import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

// Mock API for development when electronAPI is not available
const mockAPI = {
  getTasks: async () => {
    // Return mock data for development
    return [
      { id: 1, title: "Sample Task 1", dueDate: "2024-01-15", completed: false },
      { id: 2, title: "Sample Task 2", dueDate: "2024-01-20", completed: true },
    ];
  },
  addTask: async (task) => {
    // Simulate adding a task
    return { id: Date.now(), ...task, completed: false };
  },
  updateTask: async (task) => {
    // Simulate updating a task
    return task;
  },
  deleteTask: async (id) => {
    // Simulate deleting a task
    return id;
  },
};

// Get the appropriate API (electronAPI if available, mockAPI otherwise)
const getAPI = () => {
  if (window.electronAPI) {
    return window.electronAPI;
  }
  console.warn("electronAPI not available, using mock API for development");
  return mockAPI;
};

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const api = getAPI();
        const tasksFromDb = await api.getTasks();
        setTasks(tasksFromDb);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setTasks([]);
      }
    };
    getTasks();
  }, []);

  const handleAddTask = async (task) => {
    try {
      const api = getAPI();
      const newTask = await api.addTask(task);
      setTasks([newTask, ...tasks]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleUpdateTask = async (task) => {
    try {
      const api = getAPI();
      const updatedTask = await api.updateTask(task);
      setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const api = getAPI();
      await api.deleteTask(id);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Zenith To-Do</Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: "2rem" }}>
        <TaskForm onAddTask={handleAddTask} />
        <TaskList
          tasks={tasks}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
        />
      </Container>
    </>
  );
}

export default App;
