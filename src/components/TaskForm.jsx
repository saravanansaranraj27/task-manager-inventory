import React, { useState } from "react";
import { useTasks } from "../hooks/useTasks";

function TaskForm() {
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [taskType, setTaskType] = useState("develop");
  const [priority, setPriority] = useState("normal");
  const { addTask } = useTasks();

  function handleSubmit(e) {
    e.preventDefault();
    if (text.trim()) {
      addTask(text, dueDate, taskType, priority);
      setText("");
      setDueDate("");
      setPriority("normal");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Task description"
        required
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <select value={taskType} onChange={(e) => setTaskType(e.target.value)}>
        <option value="develop">Develop</option>
        <option value="support">Support</option>
        <option value="testing">Testing</option>
      </select>
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="normal">Normal</option>
        <option value="high">High</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
