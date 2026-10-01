export function filterInventory(items, searchTerm, category) {
  const normalizedSearch = searchTerm.toLowerCase();

  return items.filter((item) => {
    const matchesSearch = `${item.name} ${item.category}`
      .toLowerCase()
      .includes(normalizedSearch);

    const matchesCategory = category ? item.category === category : true;

    return matchesSearch && matchesCategory;
  });
}

export function getInventoryQuantity(items) {
  return items.reduce((total, item) => total + (Number(item.quantity) || 0), 0);
}

export function normalizeCategory(value) {
  return value.trim().toLowerCase();
}
