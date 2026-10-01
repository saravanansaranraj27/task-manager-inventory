function ManagerList({
  managers,
  editingUsername,
  newPassword,
  setNewPassword,
  onEdit,
  onDelete,
  onSave,
  onCancel,
}) {
  return (
    <ul className="manager-list">
      {managers.map((manager) => (
        <li key={manager.username} className="manager-item">
          <span>{manager.username}</span>

          {editingUsername === manager.username ? (
            <>
              <input
                type="text"
                placeholder="New password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
              />
              <button type="button" onClick={() => onSave(manager.username)}>
                Save
              </button>
              <button type="button" onClick={onCancel}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <button type="button" onClick={() => onEdit(manager.username)}>
                Edit
              </button>
              <button
                type="button"
                className="delete-button"
                onClick={() => onDelete(manager.username)}
              >
                Delete
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default ManagerList;
