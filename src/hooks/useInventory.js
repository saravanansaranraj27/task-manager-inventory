import { useEffect, useMemo, useState } from "react";
import {
  loadCategories,
  loadInventory,
  saveCategories,
  saveInventory,
} from "../services/inventoryService";
import { filterInventory, getInventoryQuantity } from "../utils/inventoryUtils";

const EMPTY_ITEM = { name: "", quantity: "", category: "" };

export function useInventory(isAdmin) {
  const [categories, setCategories] = useState(loadCategories);
  const [items, setItems] = useState(loadInventory);
  const [newCategory, setNewCategory] = useState("");
  const [newItem, setNewItem] = useState(EMPTY_ITEM);
  const [editingId, setEditingId] = useState(null);
  const [editingValues, setEditingValues] = useState(EMPTY_ITEM);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    saveInventory(items);
  }, [items]);

  useEffect(() => {
    saveCategories(categories);
  }, [categories]);

  const filteredItems = useMemo(
    () => filterInventory(items, searchTerm, filterCategory),
    [items, searchTerm, filterCategory],
  );

  const totalQuantity = useMemo(() => getInventoryQuantity(items), [items]);

  function addItem(event) {
    event.preventDefault();
    if (!isAdmin || !newItem.name || !newItem.quantity || !newItem.category) {
      return;
    }

    const item = {
      id: Date.now().toString(),
      name: newItem.name.trim(),
      quantity: parseInt(newItem.quantity),
      category: newItem.category.trim(),
    };

    setItems((current) => [...current, item]);
    setNewItem(EMPTY_ITEM);
  }

  function deleteItem(id) {
    if (!isAdmin) return;
    setItems((current) => current.filter((item) => item.id !== id));
  }

  function startEditing(id) {
    if (!isAdmin) return;
    const item = items.find((candidate) => candidate.id === id);
    setEditingId(id);
    setEditingValues({ ...item });
  }

  function cancelEditing() {
    setEditingId(null);
  }

  function updateItem(id) {
    if (!isAdmin) return;

    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, ...editingValues } : item,
      ),
    );
    setEditingId(null);
  }

  function addCategory(event) {
    event.preventDefault();
    const trimmed = newCategory.trim().toLowerCase();
    if (trimmed && !categories.includes(trimmed)) {
      setCategories((current) => [...current, trimmed]);
      setNewCategory("");
    }
  }

  function deleteCategory(category) {
    setCategories((current) => current.filter((item) => item !== category));
    setItems((current) =>
      current.map((item) =>
        item.category === category ? { ...item, category: "" } : item,
      ),
    );
  }

  function clearFilters() {
    setSearchTerm("");
    setFilterCategory("");
  }

  return {
    categories,
    items,
    filteredItems,
    totalQuantity,
    newCategory,
    setNewCategory,
    newItem,
    setNewItem,
    editingId,
    editingValues,
    setEditingValues,
    searchTerm,
    setSearchTerm,
    filterCategory,
    setFilterCategory,
    addItem,
    deleteItem,
    startEditing,
    cancelEditing,
    updateItem,
    addCategory,
    deleteCategory,
    clearFilters,
  };
}
