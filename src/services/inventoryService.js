import { DEFAULT_INVENTORY_CATEGORIES, STORAGE_KEYS } from "../constants/app";
import { readStorage, writeStorage } from "./storage";

export function loadInventory() {
  return readStorage(STORAGE_KEYS.INVENTORY, []);
}

export function saveInventory(items) {
  writeStorage(STORAGE_KEYS.INVENTORY, items);
}

export function loadCategories() {
  const categories = readStorage(
    STORAGE_KEYS.INVENTORY_CATEGORIES,
    DEFAULT_INVENTORY_CATEGORIES,
  );

  if (localStorage.getItem(STORAGE_KEYS.INVENTORY_CATEGORIES) === null) {
    saveCategories(DEFAULT_INVENTORY_CATEGORIES);
  }

  return categories;
}

export function saveCategories(categories) {
  writeStorage(STORAGE_KEYS.INVENTORY_CATEGORIES, categories);
}
