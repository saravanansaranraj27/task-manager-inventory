import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import "../styles/InventoryPage.css";

function InventoryPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const defaultCategories = ["laptop", "mouse", "keyboard", "monitor"];

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("inventoryCategories-shared");
    if (saved) return JSON.parse(saved);

    localStorage.setItem(
      "inventoryCategories-shared",
      JSON.stringify(defaultCategories),
    );
    return defaultCategories;
  });

  const [inventoryItems, setInventoryItems] = useState(() => {
    const saved = localStorage.getItem("inventoryData-shared");
    return saved ? JSON.parse(saved) : [];
  });

  const [newCategory, setNewCategory] = useState("");
  const [newItem, setNewItem] = useState({
    name: "",
    quantity: "",
    category: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [editingValues, setEditingValues] = useState({
    name: "",
    quantity: "",
    category: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "inventoryData-shared",
      JSON.stringify(inventoryItems),
    );
  }, [inventoryItems]);

  useEffect(() => {
    localStorage.setItem(
      "inventoryCategories-shared",
      JSON.stringify(categories),
    );
  }, [categories]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!isAdmin || !newItem.name || !newItem.quantity || !newItem.category)
      return;

    const id = Date.now().toString();
    const item = {
      id,
      name: newItem.name.trim(),
      quantity: parseInt(newItem.quantity),
      category: newItem.category.trim(),
    };

    setInventoryItems((prev) => [...prev, item]);
    setNewItem({ name: "", quantity: "", category: "" });
  };

  const handleDelete = (id) => {
    if (!isAdmin) return;
    setInventoryItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEdit = (id) => {
    if (!isAdmin) return;
    setEditingId(id);
    const item = inventoryItems.find((i) => i.id === id);
    setEditingValues({ ...item });
  };

  const handleUpdate = (id) => {
    if (!isAdmin) return;
    setInventoryItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, ...editingValues } : item,
      ),
    );
    setEditingId(null);
  };

  const filteredItems = inventoryItems.filter(
    (item) =>
      `${item.name} ${item.category}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) &&
      (filterCategory ? item.category === filterCategory : true),
  );
  const totalQuantity = inventoryItems.reduce(
    (total, item) => total + (Number(item.quantity) || 0),
    0,
  );
  const hasFilters = searchTerm || filterCategory;

  return (
    <div className="inventory-container">
      <div className="inventory-heading">
        <div>
          <p className="inventory-eyebrow">Shared resources</p>
          <h2>Inventory management</h2>
          <p className="inventory-subtitle">
            Keep equipment visible, organized, and ready to use.
          </p>
        </div>
        <div className="inventory-summary" aria-label="Inventory summary">
          <div>
            <strong>{inventoryItems.length}</strong>
            <span>Items</span>
          </div>
          <div>
            <strong>{totalQuantity}</strong>
            <span>Units</span>
          </div>
        </div>
      </div>

      {!isAdmin && (
        <p className="inventory-notice">Only admins can modify inventory.</p>
      )}

      <div className="inventory-filters">
        <input
          type="text"
          className="inventory-input"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="inventory-input"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {hasFilters && (
          <button
            type="button"
            className="inventory-clear"
            onClick={() => {
              setSearchTerm("");
              setFilterCategory("");
            }}
          >
            Clear filters
          </button>
        )}
      </div>

      {isAdmin && (
        <form className="inventory-form" onSubmit={handleAdd}>
          <input
            type="text"
            className="inventory-input"
            placeholder="Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            required
          />
          <input
            type="number"
            className="inventory-input"
            placeholder="Quantity"
            value={newItem.quantity}
            onChange={(e) =>
              setNewItem({ ...newItem, quantity: e.target.value })
            }
            required
          />
          <select
            className="inventory-input"
            value={newItem.category}
            onChange={(e) =>
              setNewItem({ ...newItem, category: e.target.value })
            }
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button className="inventory-button" type="submit">
            Add Item
          </button>
        </form>
      )}

      {isAdmin && (
        <div className="category-management">
          <div className="category-heading">
            <div>
              <p className="category-eyebrow">Inventory structure</p>
              <h4>Manage Categories</h4>
            </div>
            <span className="category-count">
              {categories.length}{" "}
              {categories.length === 1 ? "category" : "categories"}
            </span>
          </div>
          <form
            className="category-form"
            onSubmit={(e) => {
              e.preventDefault();
              const trimmed = newCategory.trim().toLowerCase();
              if (trimmed && !categories.includes(trimmed)) {
                setCategories((prev) => [...prev, trimmed]);
                setNewCategory("");
              }
            }}
          >
            <input
              type="text"
              className="inventory-input"
              placeholder="New Category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <button className="inventory-button" type="submit">
              Add Category
            </button>
          </form>

          <ul className="category-list">
            {categories.map((cat, index) => (
              <li key={cat} className="category-item">
                <span className="bullet">{index + 1}.</span>
                <span className="category-name">{cat}</span>
                <button
                  className="delete-btn"
                  onClick={() => {
                    setCategories((prev) => prev.filter((c) => c !== cat));
                    setInventoryItems((prev) =>
                      prev.map((item) =>
                        item.category === cat
                          ? { ...item, category: "" }
                          : item,
                      ),
                    );
                  }}
                  aria-label={`Delete ${cat} category`}
                  title="Delete category"
                >
                  🗑
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="inventory-results">
        Showing {filteredItems.length} of {inventoryItems.length} items
      </p>

      <ul className="inventory-list">
        {filteredItems.length === 0 ? (
          <p className="no-items">No items found.</p>
        ) : (
          filteredItems.map((item) => (
            <li key={item.id} className="inventory-item">
              {editingId === item.id ? (
                <>
                  <input
                    type="text"
                    className="inventory-input"
                    value={editingValues.name}
                    onChange={(e) =>
                      setEditingValues({
                        ...editingValues,
                        name: e.target.value,
                      })
                    }
                  />
                  <input
                    type="number"
                    className="inventory-input"
                    value={editingValues.quantity}
                    onChange={(e) =>
                      setEditingValues({
                        ...editingValues,
                        quantity: parseInt(e.target.value),
                      })
                    }
                  />
                  <select
                    className="inventory-input"
                    value={editingValues.category}
                    onChange={(e) =>
                      setEditingValues({
                        ...editingValues,
                        category: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <button
                    className="inventory-button"
                    onClick={() => handleUpdate(item.id)}
                  >
                    Save
                  </button>
                  <button
                    className="inventory-button"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <div className="inventory-item-content">
                    <strong>{item.name}</strong>
                    <span className="inventory-quantity">
                      {item.quantity}{" "}
                      {Number(item.quantity) === 1 ? "unit" : "units"}
                    </span>
                    <span className="inventory-category">
                      {item.category || "Uncategorized"}
                    </span>
                  </div>
                  {isAdmin && (
                    <div className="item-actions">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(item.id)}
                      >
                        ✏️
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(item.id)}
                      >
                        🗑
                      </button>
                    </div>
                  )}
                </>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default InventoryPage;
