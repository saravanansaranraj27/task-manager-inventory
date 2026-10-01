import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";

function Tasks() {
  return (
    <section className="app-container tasks-container">
      <div className="page-heading">
        <div>
          <p className="page-eyebrow">Focus area</p>
          <h1 className="title">Task Management</h1>
        </div>
        <span className="page-hint">Plan. Prioritize. Finish.</span>
      </div>
      <TaskForm />
      <TaskList />
    </section>
  );
}

export default Tasks;
