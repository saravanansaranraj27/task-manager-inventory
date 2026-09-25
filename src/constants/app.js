export const APP_NAME = "Task Manager";

export const USER_ROLES = Object.freeze({
  ADMIN: "admin",
  MANAGER: "manager",
});

export const TASK_TYPES = Object.freeze([
  { value: "develop", label: "Develop" },
  { value: "support", label: "Support" },
  { value: "testing", label: "Testing" },
]);

export const TASK_PRIORITIES = Object.freeze([
  { value: "low", label: "Low" },
  { value: "normal", label: "Normal" },
  { value: "high", label: "High" },
]);

export const STORAGE_KEYS = Object.freeze({
  USER: "user",
  USERS: "users",
  INVENTORY: "inventoryData-shared",
  INVENTORY_CATEGORIES: "inventoryCategories-shared",
});

export const DEFAULT_INVENTORY_CATEGORIES = Object.freeze([
  "laptop",
  "mouse",
  "keyboard",
  "monitor",
]);

export const ROUTES = Object.freeze({
  LOGIN: "/login",
  HOME: "/home",
  INTRO: "/intro",
  TASKS: "/tasks",
  PROFILE: "/profile",
  INVENTORY: "/inventory",
  ADMIN: "/admin",
});
