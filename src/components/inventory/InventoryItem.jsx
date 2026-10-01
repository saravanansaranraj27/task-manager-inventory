function InventoryItem({
  item,
  categories,
  isAdmin,
  editing,
  editingValues,
  setEditingValues,
  onEdit,
  onDelete,
  onSave,
  onCancel,
}) {
  if (editing) {
    return (
      <li className="inventory-item inventory-item-editing">
        <input
          type="text"
          className="inventory-input"
          value={editingValues.name}
          onChange={(event) =>
            setEditingValues({ ...editingValues, name: event.target.value })
          }
        />
        <input
          type="number"
          className="inventory-input"
          value={editingValues.quantity}
          onChange={(event) =>
            setEditingValues({
              ...editingValues,
              quantity: parseInt(event.target.value),
            })
          }
        />
        <select
          className="inventory-input"
          value={editingValues.category}
          onChange={(event) =>
            setEditingValues({
              ...editingValues,
              category: event.target.value,
            })
          }
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button
          className="inventory-button"
          type="button"
          onClick={() => onSave(item.id)}
        >
          Save
        </button>
        <button className="inventory-button" type="button" onClick={onCancel}>
          Cancel
        </button>
      </li>
    );
  }

  return (
    <li className="inventory-item">
      <div className="inventory-item-content">
        <strong>{item.name}</strong>
        <span className="inventory-quantity">
          {item.quantity} {Number(item.quantity) === 1 ? "unit" : "units"}
        </span>
        <span className="inventory-category">
          {item.category || "Uncategorized"}
        </span>
      </div>

      {isAdmin && (
        <div className="item-actions">
          <button
            type="button"
            className="edit-btn"
            onClick={() => onEdit(item.id)}
            aria-label={`Edit ${item.name}`}
          >
            ✏️
          </button>
          <button
            type="button"
            className="delete-btn"
            onClick={() => onDelete(item.id)}
            aria-label={`Delete ${item.name}`}
          >
            🗑
          </button>
        </div>
      )}
    </li>
  );
}

export default InventoryItem;
