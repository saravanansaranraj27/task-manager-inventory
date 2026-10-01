import { useState } from "react";

function ManagerForm({ onAdd }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (onAdd(username, password)) {
      setUsername("");
      setPassword("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />
      <button type="submit">Add Manager</button>
    </form>
  );
}

export default ManagerForm;
