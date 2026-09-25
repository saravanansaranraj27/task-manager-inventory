import { useState } from "react";
import { useTasks } from "../../hooks/useTasks";
import { TASK_PRIORITIES, TASK_TYPES } from "../../constants/app";

function TaskForm() {
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [taskType, setTaskType] = useState(TASK_TYPES[0].value);
  const [priority, setPriority] = useState("normal");
  const { addTask } = useTasks();

  function handleSubmit(event) {
    event.preventDefault();

    if (!text.trim()) return;

    addTask(text, dueDate, taskType, priority);
    setText("");
    setDueDate("");
    setPriority("normal");
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Task description"
        required
      />
      <input
        type="date"
        value={dueDate}
        onChange={(event) => setDueDate(event.target.value)}
      />
      <select
        value={taskType}
        onChange={(event) => setTaskType(event.target.value)}
      >
        {TASK_TYPES.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <select
        value={priority}
        onChange={(event) => setPriority(event.target.value)}
      >
        {TASK_PRIORITIES.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
