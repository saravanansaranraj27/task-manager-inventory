import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../hooks/useAuth";
import { loadTasks, saveTasks } from "../services/taskService";
import { createTask } from "../utils/taskUtils";

// eslint-disable-next-line react-refresh/only-export-components
export const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loadedUsername, setLoadedUsername] = useState(null);

  useEffect(() => {
    const username = user?.username ?? null;
    setTasks(username ? loadTasks(username) : []);
    setLoadedUsername(username);
  }, [user]);

  useEffect(() => {
    if (user?.username && loadedUsername === user.username) {
      saveTasks(user.username, tasks);
    }
  }, [tasks, user, loadedUsername]);

  function addTask(text, dueDate, taskType, priority) {
    setTasks((current) => [
      ...current,
      createTask({
        id: uuidv4(),
        text,
        dueDate,
        taskType,
        priority,
      }),
    ]);
  }

  function deleteTask(id) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  function toggleTask(id) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function updateTask(id, updatedFields) {
    setTasks((current) =>
      current.map((task) =>
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
