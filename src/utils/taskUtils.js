export function getTaskSummary(tasks) {
  const completed = tasks.filter((task) => task.completed).length;

  return {
    total: tasks.length,
    completed,
    open: tasks.length - completed,
  };
}

export function createTask({
  id,
  text,
  dueDate = null,
  taskType = "develop",
  priority = "normal",
}) {
  return {
    id,
    text,
    completed: false,
    dueDate,
    taskType,
    priority,
  };
}
