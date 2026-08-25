import { useTasks } from "../hooks/useTasks";
import TaskItem from "./TaskItem";

function TaskList() {
  const { tasks } = useTasks();

  if (tasks.length === 0) {
    return <p className="no-tasks">No tasks yet. Add your first task!</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map(function (task) {
        return <TaskItem key={task.id} task={task} />;
      })}
    </ul>
  );
}

export default TaskList;
