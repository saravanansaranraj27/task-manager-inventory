function CategoryManager({
  categories,
  newCategory,
  setNewCategory,
  addCategory,
  deleteCategory,
}) {
  return (
    <section className="category-management" aria-labelledby="category-heading">
      <div className="category-heading">
        <div>
          <p className="category-eyebrow">Inventory structure</p>
          <h4 id="category-heading">Manage Categories</h4>
        </div>
        <span className="category-count">
          {categories.length}{" "}
          {categories.length === 1 ? "category" : "categories"}
        </span>
      </div>

      <form className="category-form" onSubmit={addCategory}>
        <input
          type="text"
          className="inventory-input"
          placeholder="New Category"
          value={newCategory}
          onChange={(event) => setNewCategory(event.target.value)}
        />
        <button className="inventory-button" type="submit">
          Add Category
        </button>
      </form>

      <ul className="category-list">
        {categories.map((category, index) => (
          <li key={category} className="category-item">
            <span className="bullet">{index + 1}.</span>
            <span className="category-name">{category}</span>
            <button
              type="button"
              className="delete-btn"
              onClick={() => deleteCategory(category)}
              aria-label={`Delete ${category} category`}
              title="Delete category"
            >
              🗑
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default CategoryManager;
