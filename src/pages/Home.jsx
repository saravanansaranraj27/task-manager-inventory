import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useTasks } from "../hooks/useTasks";
import { getTaskSummary } from "../utils/taskUtils";

function Home() {
  const { user } = useAuth();
  const { tasks } = useTasks();
  const { total, open, completed } = getTaskSummary(tasks);

  return (
    <div className="home-container">
      <section className="home-intro">
        <p className="home-eyebrow">Your workspace</p>
        <h1>Good to see you, {user?.username}.</h1>
        <p>
          Keep the important work moving with a clear view of today&apos;s
          priorities.
        </p>
        <Link className="home-primary-action" to="/tasks">
          Open task board
        </Link>
      </section>

      <section className="home-stats" aria-label="Task summary">
        <div className="home-stat">
          <span className="home-stat-label">All tasks</span>
          <strong>{total}</strong>
        </div>
        <div className="home-stat home-stat-accent">
          <span className="home-stat-label">Still open</span>
          <strong>{open}</strong>
        </div>
        <div className="home-stat">
          <span className="home-stat-label">Completed</span>
          <strong>{completed}</strong>
        </div>
      </section>

      <nav className="home-links" aria-label="Workspace shortcuts">
        <Link to="/inventory">
          Browse inventory <span aria-hidden="true">→</span>
        </Link>
        <Link to="/profile">
          Manage your profile <span aria-hidden="true">→</span>
        </Link>
      </nav>
    </div>
  );
}

export default Home;
