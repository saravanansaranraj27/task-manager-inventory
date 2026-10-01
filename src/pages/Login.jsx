import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ROUTES, USER_ROLES } from "../constants/app";

function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(USER_ROLES.MANAGER);
  const [error, setError] = useState("");
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    try {
      if (isSignup) {
        signup(username, password, role);
      } else {
        login(username, password);
      }
      navigate(ROUTES.HOME);
    } catch (submitError) {
      setError(submitError.message);
    }
  }

  function toggleMode() {
    setIsSignup((current) => !current);
    setError("");
  }

  return (
    <form onSubmit={handleSubmit} className="task-form auth-form">
      <p className="auth-eyebrow">Task Manager</p>
      <h2>{isSignup ? "Create your workspace" : "Welcome back"}</h2>
      <p className="auth-subtitle">
        {isSignup
          ? "Set up your account and get organized."
          : "Sign in to continue where you left off."}
      </p>

      {error && (
        <p className="auth-error" role="alert">
          {error}
        </p>
      )}

      <input
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="Enter username..."
        required
      />
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Enter password..."
        required
      />

      {isSignup && (
        <div className="signup-role" aria-label="Choose account role">
          <p>Sign up separately as</p>
          <div className="signup-role-options">
            {Object.values(USER_ROLES).map((roleOption) => (
              <button
                key={roleOption}
                type="button"
                className={role === roleOption ? "selected" : ""}
                onClick={() => setRole(roleOption)}
                aria-pressed={role === roleOption}
              >
                {roleOption[0].toUpperCase() + roleOption.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}

      <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>

      <p className="auth-switch">
        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          type="button"
          onClick={toggleMode}
          className="auth-switch-button"
        >
          {isSignup ? "Login" : "Sign Up"}
        </button>
      </p>
    </form>
  );
}

export default Login;
