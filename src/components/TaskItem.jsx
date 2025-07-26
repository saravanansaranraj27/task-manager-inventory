import React, { useState } from "react";
import { useTasks } from "../context/TaskContext";

function TaskItem({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [editDueDate, setEditDueDate] = useState(task.dueDate || "");
  const [editType, setEditType] = useState(task.taskType || "develop");
  const [editPriority, setEditPriority] = useState(task.priority || "normal");

  const { deleteTask, toggleTask, updateTask } = useTasks();

  function handleUpdate() {
    if (editText.trim()) {
      updateTask(task.id, {
        text: editText,
        dueDate: editDueDate,
        taskType: editType,
        priority: editPriority,
      });
      setIsEditing(false);
    }
  }

  return (
    <li className={"task-item" + (task.completed ? " completed" : "")}>
      <div className="task-info">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
        />
        {isEditing ? (
          <>
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              placeholder="Description"
            />
            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
            />
            <select
              value={editType}
              onChange={(e) => setEditType(e.target.value)}
            >
              <option value="develop">Develop</option>
              <option value="support">Support</option>
              <option value="testing">Testing</option>
            </select>
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
            </select>
          </>
        ) : (
          <div className="task-details-inline">
            <span>
              ✅ <strong>{task.text}</strong>
            </span>
            <span>📅 {task.dueDate || "No due date"}</span>
            <span className={`task-type ${task.taskType}`}>
              🛠 {task.taskType}
            </span>
            <span className={`task-priority ${task.priority}`}>
              ⚠️ {task.priority}
            </span>
          </div>
        )}
      </div>

      <div className="task-actions">
        {isEditing ? (
          <>
            <button onClick={handleUpdate}>✔</button>
            <button onClick={() => setIsEditing(false)}>✖</button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)}>✎</button>
            <button onClick={() => deleteTask(task.id)}>🗑</button>
          </>
        )}
      </div>
    </li>
  );
}

export default TaskItem;
