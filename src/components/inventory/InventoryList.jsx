import InventoryItem from "./InventoryItem";

function InventoryList({
  items,
  categories,
  isAdmin,
  editingId,
  editingValues,
  setEditingValues,
  onEdit,
  onDelete,
  onSave,
  onCancel,
}) {
  if (items.length === 0) {
    return <p className="no-items">No items found.</p>;
  }

  return (
    <ul className="inventory-list">
      {items.map((item) => (
        <InventoryItem
          key={item.id}
          item={item}
          categories={categories}
          isAdmin={isAdmin}
          editing={editingId === item.id}
          editingValues={editingValues}
          setEditingValues={setEditingValues}
          onEdit={onEdit}
          onDelete={onDelete}
          onSave={onSave}
          onCancel={onCancel}
        />
      ))}
    </ul>
  );
}

export default InventoryList;
