import { Link, useNavigate } from "react-router-dom";

function Intro() {
  const navigate = useNavigate();

  return (
    <div className="intro-container">
      <section className="intro-content">
        <p className="home-eyebrow">Task Manager workspace</p>
        <h1>Make space for the work that matters.</h1>
        <p>
          Plan priorities, keep shared equipment organized, and move through
          your day with a calmer view of everything on your plate.
        </p>
        <div className="intro-actions">
          <Link className="home-primary-action" to="/home">
            Go to home
          </Link>
          <Link className="intro-secondary-action" to="/tasks">
            View tasks
          </Link>
        </div>
      </section>
      <aside className="intro-note">
        <div className="intro-feature-box">
          <p className="intro-feature-label">Task Manager workspace</p>
          <h2>Everything important, close at hand.</h2>
        </div>
        <div className="intro-feature-list">
          <button
            type="button"
            className="intro-feature-row intro-feature-button"
            onClick={() => navigate("/tasks")}
          >
            <span>01</span>
            <div>
              <strong>Task planning</strong>
              <p>Turn priorities into clear next steps.</p>
            </div>
            <span className="intro-feature-arrow" aria-hidden="true">
              →
            </span>
          </button>
          <button
            type="button"
            className="intro-feature-row intro-feature-button"
            onClick={() => navigate("/inventory")}
          >
            <span>02</span>
            <div>
              <strong>Inventory clarity</strong>
              <p>Know what is available when you need it.</p>
            </div>
            <span className="intro-feature-arrow" aria-hidden="true">
              →
            </span>
          </button>
          <button
            type="button"
            className="intro-feature-row intro-feature-button"
            onClick={() => navigate("/admin")}
          >
            <span>03</span>
            <div>
              <strong>Team access</strong>
              <p>Keep roles and responsibilities organized.</p>
            </div>
            <span className="intro-feature-arrow" aria-hidden="true">
              →
            </span>
          </button>
        </div>
        <div className="intro-note-detail">
          <span className="intro-note-mark">+</span>
          <div>
            <strong>One clear workspace</strong>
            <p>Your tasks, team access, and inventory in one place.</p>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Intro;
