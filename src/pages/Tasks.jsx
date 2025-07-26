import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

function Tasks() {
  return (
    <div className="app-container">
      <h1 className="title">Task Management</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
}

export default Tasks;
