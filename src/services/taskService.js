import { readStorage, writeStorage } from "./storage";

export function loadTasks(username) {
  return username ? readStorage(`tasks-${username}`, []) : [];
}

export function saveTasks(username, tasks) {
  if (username) {
    writeStorage(`tasks-${username}`, tasks);
  }
}
