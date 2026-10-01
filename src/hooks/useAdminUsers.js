import { useState } from "react";
import { useAuth } from "./useAuth";
import { registerUser, updateUserPassword } from "../services/authService";
import { getManagers } from "../utils/userUtils";

export function useAdminUsers() {
  const { user, replaceUser, users, replaceUsers } = useAuth();
  const [editingUsername, setEditingUsername] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  function persistUsers(nextUsers) {
    replaceUsers(nextUsers);
  }

  function addManager(username, password) {
    if (!username || !password) return false;

    if (users.some((candidate) => candidate.username === username)) {
      setMessage("That username is already in use.");
      return false;
    }

    const result = registerUser(users, username, password, "manager");
    persistUsers(result.users);
    setMessage("Manager added successfully.");
    return true;
  }

  function deleteManager(username) {
    persistUsers(
      users.filter(
        (candidate) =>
          candidate.username !== username || candidate.role !== "manager",
      ),
    );
  }

  function startEditing(username) {
    setEditingUsername(username);
    setNewPassword("");
  }

  function cancelEditing() {
    setEditingUsername(null);
    setNewPassword("");
  }

  function updateManagerPassword(username) {
    const updatedUsers = updateUserPassword(users, username, newPassword);
    persistUsers(updatedUsers);

    if (user?.username === username) {
      replaceUser({ ...user, password: newPassword });
    }

    cancelEditing();
  }

  return {
    managers: getManagers(users),
    managerCount: getManagers(users).length,
    editingUsername,
    newPassword,
    setNewPassword,
    message,
    addManager,
    deleteManager,
    startEditing,
    cancelEditing,
    updateManagerPassword,
  };
}
