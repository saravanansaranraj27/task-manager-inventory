import { STORAGE_KEYS } from "../constants/app";
import { readStorage, removeStorage, writeStorage } from "./storage";

export function loadAuthState() {
  return {
    user: readStorage(STORAGE_KEYS.USER, null),
    users: readStorage(STORAGE_KEYS.USERS, []),
  };
}

export function authenticate(users, username, password) {
  const foundUser = users.find(
    (candidate) =>
      candidate.username === username && candidate.password === password,
  );

  if (!foundUser) {
    throw new Error("Invalid credentials");
  }

  return {
    username: foundUser.username,
    role: foundUser.role,
  };
}

export function registerUser(users, username, password, role) {
  if (users.some((candidate) => candidate.username === username)) {
    throw new Error("User already exists");
  }

  const newUser = { username, password, role };
  return {
    users: [...users, newUser],
    user: { username, role },
  };
}

export function updateUserPassword(users, username, newPassword) {
  return users.map((candidate) =>
    candidate.username === username
      ? { ...candidate, password: newPassword }
      : candidate,
  );
}

export function saveUsers(users) {
  writeStorage(STORAGE_KEYS.USERS, users);
}

export function saveSession(user) {
  if (user) {
    writeStorage(STORAGE_KEYS.USER, user);
  } else {
    removeStorage(STORAGE_KEYS.USER);
  }
}
