import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";

// Contexts
import { ThemeProvider } from "./contexts/ThemeContext";

// Components
import CustomAppBar from "./components/AppBar";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import FloatingActionButton from "./components/FloatingActionButton";
import BackgroundArt from "./components/BackgroundArt";
import CalendarView from "./components/CalendarView";
import LoadingSpinner from "./components/LoadingSpinner";

// Mock API for development when electronAPI is not available
const mockAPI = {
  getTasks: async () => [
    {
      id: 1,
      title: "Sample Task 1",
      dueDate: "2024-01-15",
      completed: false,
    },
    { 
      id: 2, 
      title: "Sample Task 2", 
      dueDate: "2024-01-20", 
      completed: true 
    },
  ],
  addTask: async (task) => ({ 
    id: Date.now(), 
    ...task, 
    completed: false 
  }),
  updateTask: async (task) => task,
  deleteTask: async (id) => id,
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
  // State management
  const [tasks, setTasks] = useState([]);
  const [view, setView] = useState("list"); // 'list' or 'calendar'
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load tasks on component mount
  useEffect(() => {
    const loadTasks = async () => {
      try {
        setIsLoading(true);
        const api = getAPI();
        const tasksFromDb = await api.getTasks();
        setTasks(tasksFromDb);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setTasks([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadTasks();
  }, []);

  // Task management handlers
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
    <ThemeProvider>
      <BackgroundArt />
      <CustomAppBar view={view} onViewChange={setView} />
      <Container 
        maxWidth={view === "calendar" ? "lg" : "md"} 
        sx={{ 
          py: { xs: 2, sm: 4 }, 
          px: { xs: 2, sm: 3 },
          position: 'relative', 
          zIndex: 1 
        }}
      >
        {isLoading ? (
          <LoadingSpinner message="Loading your tasks..." />
        ) : view === "list" ? (
          <TaskList
            tasks={tasks}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
          />
        ) : (
          <CalendarView tasks={tasks} />
        )}
      </Container>
      
      {view === "list" && (
        <>
          <FloatingActionButton onClick={() => setIsTaskFormOpen(true)} />
          <TaskForm
            open={isTaskFormOpen}
            onClose={() => setIsTaskFormOpen(false)}
            onAddTask={handleAddTask}
          />
        </>
      )}
    </ThemeProvider>
  );
}

export default App;
