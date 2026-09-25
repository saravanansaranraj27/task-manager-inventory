function InventoryForm({ categories, newItem, setNewItem, onSubmit }) {
  return (
    <form className="inventory-form" onSubmit={onSubmit}>
      <input
        type="text"
        className="inventory-input"
        placeholder="Name"
        value={newItem.name}
        onChange={(event) =>
          setNewItem({ ...newItem, name: event.target.value })
        }
        required
      />
      <input
        type="number"
        className="inventory-input"
        placeholder="Quantity"
        value={newItem.quantity}
        onChange={(event) =>
          setNewItem({ ...newItem, quantity: event.target.value })
        }
        required
      />
      <select
        className="inventory-input"
        value={newItem.category}
        onChange={(event) =>
          setNewItem({ ...newItem, category: event.target.value })
        }
        required
      >
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <button className="inventory-button" type="submit">
        Add Item
      </button>
    </form>
  );
}

export default InventoryForm;
