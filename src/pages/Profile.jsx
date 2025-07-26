import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";

function Profile() {
  const { user, logout, updatePassword } = useAuth();
  const [newPassword, setNewPassword] = useState("");

  const handlePasswordChange = () => {
    if (newPassword.trim()) {
      updatePassword(newPassword);
      alert("Password updated!");
      setNewPassword("");
    }
  };

  return (
    <div>
      <h2>👤 Profile</h2>
      <p>
        <strong>Username: </strong>
        {user?.username}
      </p>
      <input
        className="profile-input"
        type="password"
        placeholder="New password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button className="profile-button" onClick={handlePasswordChange}>
        Change Password
      </button>

      <button className="logout-button" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Profile;
