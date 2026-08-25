import React, { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../hooks/useAuth";

// eslint-disable-next-line react-refresh/only-export-components
export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`tasks-${user.username}`);
      setTasks(saved ? JSON.parse(saved) : []);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`tasks-${user.username}`, JSON.stringify(tasks));
    }
  }, [tasks, user]);

  function addTask(
    text,
    dueDate = null,
    taskType = "develop",
    priority = "normal",
  ) {
    setTasks([
      ...tasks,
      {
        id: uuidv4(),
        text,
        completed: false,
        dueDate,
        taskType, // ✅ Correctly included now
        priority,
      },
    ]);
  }

  function deleteTask(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }

  function updateTask(id, updatedFields) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, ...updatedFields } : task,
      ),
    );
  }

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, deleteTask, toggleTask, updateTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}
