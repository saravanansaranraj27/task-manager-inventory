import React, { createContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  const [users, setUsers] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("users")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  function login(username, password) {
    const found = users.find(
      (u) => u.username === username && u.password === password
    );
    if (!found) throw new Error("Invalid credentials");
    setUser({ username, role: found.role });
  }

  function signup(username, password, role) {
    if (users.some((u) => u.username === username)) {
      throw new Error("User already exists");
    }
    const newUser = { username, password, role };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUser({ username, role });
  }

  function logout() {
    setUser(null);
  }
  function updatePassword(newPassword) {
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, password: newPassword };
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = users.map((u) =>
        u.username === updatedUser.username
          ? { ...u, password: newPassword }
          : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
      return updatedUser;
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        users,
        setUsers,
        login,
        signup,
        logout,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
