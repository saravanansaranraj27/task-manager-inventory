import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("manager");
  const [error, setError] = useState("");

  const { login, signup } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    try {
      if (isSignup) {
        signup(username, password, role);
      } else {
        login(username, password);
      }
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>{isSignup ? "Sign Up" : "Login"}</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username..."
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password..."
        required
      />
      {isSignup && (
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>
      )}
      <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>

      <p style={{ marginTop: "1rem" }}>
        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          type="button"
          onClick={() => {
            setIsSignup(!isSignup);
            setError("");
          }}
          style={{
            background: "none",
            border: "none",
            color: "#2563eb",
            cursor: "pointer",
          }}
        >
          {isSignup ? "Login" : "Sign Up"}
        </button>
      </p>
    </form>
  );
}

export default Login;
