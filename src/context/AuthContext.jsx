import { createContext, useEffect, useState } from "react";
import {
  authenticate,
  loadAuthState,
  registerUser,
  saveSession,
  saveUsers,
  updateUserPassword,
} from "../services/authService";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [{ user, users }, setAuthState] = useState(loadAuthState);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    setIsInitializing(false);
  }, []);

  useEffect(() => {
    saveSession(user);
  }, [user]);

  function login(username, password) {
    const authenticatedUser = authenticate(users, username, password);
    setAuthState((current) => ({ ...current, user: authenticatedUser }));
  }

  function signup(username, password, role) {
    const result = registerUser(users, username, password, role);
    saveUsers(result.users);
    setAuthState({ users: result.users, user: result.user });
  }

  function logout() {
    setAuthState((current) => ({ ...current, user: null }));
  }

  function changePassword(newPassword) {
    if (!user) return;

    const updatedUsers = updateUserPassword(users, user.username, newPassword);
    const updatedUser = { ...user, password: newPassword };

    saveUsers(updatedUsers);
    setAuthState({ users: updatedUsers, user: updatedUser });
  }

  function replaceUsers(nextUsers) {
    saveUsers(nextUsers);
    setAuthState((current) => ({ ...current, users: nextUsers }));
  }

  function replaceUser(nextUser) {
    setAuthState((current) => ({ ...current, user: nextUser }));
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        login,
        signup,
        logout,
        updatePassword: changePassword,
        replaceUsers,
        replaceUser,
        isInitializing,
      }}
    >
      {!isInitializing && children}
    </AuthContext.Provider>
  );
}
