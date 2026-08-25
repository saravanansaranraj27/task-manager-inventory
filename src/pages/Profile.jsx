import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, logout, updatePassword } = useAuth();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  function handlePasswordChange(e) {
    e.preventDefault();
    if (!newPassword.trim()) return;

    updatePassword(newPassword);
    setNewPassword("");
    setMessage("Password updated successfully.");
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar" aria-hidden="true">
          {user?.username?.charAt(0).toUpperCase() || "U"}
        </div>
        <div>
          <p className="profile-eyebrow">Account settings</p>
          <h2>Welcome, {user?.username}</h2>
          <span className="profile-role">{user?.role || "user"}</span>
        </div>
      </div>

      <div className="profile-details">
        <div>
          <span className="profile-label">Username</span>
          <strong>{user?.username}</strong>
        </div>
        <div>
          <span className="profile-label">Access level</span>
          <strong>{user?.role}</strong>
        </div>
      </div>

      <form className="profile-security" onSubmit={handlePasswordChange}>
        <div>
          <h3>Security</h3>
          <p>Keep your account protected with a new password.</p>
        </div>
        <label htmlFor="new-password">New password</label>
        <input
          id="new-password"
          className="profile-input"
          type="password"
          placeholder="Enter a new password"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            setMessage("");
          }}
          minLength="4"
          required
        />
        <button className="profile-button" type="submit">
          Update password
        </button>
        {message && (
          <p className="profile-message" role="status">
            {message}
          </p>
        )}
      </form>

      <div className="profile-footer">
        <span>Finished for today?</span>
        <button className="logout-button" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  );
}

export default Profile;
