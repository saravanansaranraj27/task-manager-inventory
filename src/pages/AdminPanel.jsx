import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import "../styles/AdminPanel.css";

function AdminPanel() {
  const { user, setUser, users, setUsers } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [newPassword, setNewPassword] = useState("");

  function saveUsers(newUsers) {
    localStorage.setItem("users", JSON.stringify(newUsers));
    setUsers(newUsers);
  }

  function handleAdd(e) {
    e.preventDefault();
    if (!username || !password) return;
    if (users.some((u) => u.username === username)) {
      alert("User already exists");
      return;
    }
    const newUser = { username, password, role: "manager" };
    saveUsers([...users, newUser]);
    setUsername("");
    setPassword("");
  }

  function handleDelete(username) {
    const updated = users.filter(
      (u) => u.username !== username || u.role !== "manager"
    );
    saveUsers(updated);
  }

  function handleEdit(username) {
    setEditingUser(username);
    setNewPassword("");
  }

  function handleUpdate(username) {
    const updated = users.map((u) =>
      u.username === username ? { ...u, password: newPassword } : u
    );

    saveUsers(updated);
    if (user.username === username) {
      setUser({ ...user, password: newPassword });
    }
    setEditingUser(null);
    setNewPassword("");
  }

  return (
    <div className="admin-panel">
      <h2>Manage Managers</h2>

      <form onSubmit={handleAdd} className="admin-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Add Manager</button>
      </form>

      <ul className="manager-list">
        {users
          .filter((u) => u.role === "manager")
          .map((u) => (
            <li key={u.username} className="manager-item">
              <span>{u.username}</span>
              {editingUser === u.username ? (
                <>
                  <input
                    type="text"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button onClick={() => handleUpdate(u.username)}>Save</button>
                  <button onClick={() => setEditingUser(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => handleEdit(u.username)}>Edit</button>
                  <button onClick={() => handleDelete(u.username)}>
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default AdminPanel;
