export function getInitial(value, fallback = "?") {
  return value?.charAt(0)?.toUpperCase() || fallback;
}

export function getManagers(users) {
  return users.filter((user) => user.role === "manager");
}
