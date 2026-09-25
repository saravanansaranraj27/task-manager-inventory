import { Link, useNavigate } from "react-router-dom";

const INTRO_FEATURES = [
  {
    number: "01",
    title: "Task planning",
    description: "Turn priorities into clear next steps.",
    route: "/tasks",
  },
  {
    number: "02",
    title: "Inventory clarity",
    description: "Know what is available when you need it.",
    route: "/inventory",
  },
  {
    number: "03",
    title: "Team access",
    description: "Keep roles and responsibilities organized.",
    route: "/admin",
  },
];

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
          {INTRO_FEATURES.map((feature) => (
            <button
              key={feature.number}
              type="button"
              className="intro-feature-row intro-feature-button"
              onClick={() => navigate(feature.route)}
            >
              <span>{feature.number}</span>
              <div>
                <strong>{feature.title}</strong>
                <p>{feature.description}</p>
              </div>
              <span className="intro-feature-arrow" aria-hidden="true">
                →
              </span>
            </button>
          ))}
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
