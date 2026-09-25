import { useState } from "react";
import { useTasks } from "../../hooks/useTasks";
import { TASK_PRIORITIES, TASK_TYPES } from "../../constants/app";

function TaskItem({ task }) {
  const { deleteTask, toggleTask, updateTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [editDueDate, setEditDueDate] = useState(task.dueDate || "");
  const [editType, setEditType] = useState(task.taskType || "develop");
  const [editPriority, setEditPriority] = useState(task.priority || "normal");

  function handleUpdate() {
    if (!editText.trim()) return;

    updateTask(task.id, {
      text: editText,
      dueDate: editDueDate,
      taskType: editType,
      priority: editPriority,
    });
    setIsEditing(false);
  }

  return (
    <li className={`task-item${task.completed ? " completed" : ""}`}>
      <div className="task-info">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          aria-label={`Mark ${task.text} as ${task.completed ? "open" : "completed"}`}
        />

        {isEditing ? (
          <>
            <input
              type="text"
              value={editText}
              onChange={(event) => setEditText(event.target.value)}
              placeholder="Description"
            />
            <input
              type="date"
              value={editDueDate}
              onChange={(event) => setEditDueDate(event.target.value)}
            />
            <select
              value={editType}
              onChange={(event) => setEditType(event.target.value)}
            >
              {TASK_TYPES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select
              value={editPriority}
              onChange={(event) => setEditPriority(event.target.value)}
            >
              {TASK_PRIORITIES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </>
        ) : (
          <div className="task-details-inline">
            <span>
              <span aria-hidden="true">✅</span> <strong>{task.text}</strong>
            </span>
            <span>
              <span aria-hidden="true">📅</span> {task.dueDate || "No due date"}
            </span>
            <span className={`task-type ${task.taskType}`}>
              <span aria-hidden="true">🛠</span> {task.taskType}
            </span>
            <span className={`task-priority ${task.priority}`}>
              <span aria-hidden="true">⚠️</span> {task.priority}
            </span>
          </div>
        )}
      </div>

      <div className="task-actions">
        {isEditing ? (
          <>
            <button type="button" onClick={handleUpdate} aria-label="Save task">
              ✔
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              aria-label="Cancel editing"
            >
              ✖
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              aria-label={`Edit ${task.text}`}
            >
              ✎
            </button>
            <button
              type="button"
              onClick={() => deleteTask(task.id)}
              aria-label={`Delete ${task.text}`}
            >
              🗑
            </button>
          </>
        )}
      </div>
    </li>
  );
}

export default TaskItem;
