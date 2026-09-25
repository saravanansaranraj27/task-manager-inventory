function InventoryFilters({
  categories,
  searchTerm,
  filterCategory,
  setSearchTerm,
  setFilterCategory,
  clearFilters,
}) {
  const hasFilters = searchTerm || filterCategory;

  return (
    <div className="inventory-filters">
      <input
        type="text"
        className="inventory-input"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <select
        className="inventory-input"
        value={filterCategory}
        onChange={(event) => setFilterCategory(event.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      {hasFilters && (
        <button
          type="button"
          className="inventory-clear"
          onClick={clearFilters}
        >
          Clear filters
        </button>
      )}
    </div>
  );
}

export default InventoryFilters;
