import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

function Tasks() {
  return (
    <div className="app-container tasks-container">
      <div className="page-heading">
        <div>
          <p className="page-eyebrow">Focus area</p>
          <h1 className="title">Task Management</h1>
        </div>
        <span className="page-hint">Plan. Prioritize. Finish.</span>
      </div>
      <TaskForm />
      <TaskList />
    </div>
  );
}

export default Tasks;
