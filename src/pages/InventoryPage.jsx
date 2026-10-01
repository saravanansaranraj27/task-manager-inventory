import { useAuth } from "../hooks/useAuth";
import { useInventory } from "../hooks/useInventory";
import InventoryHeader from "../components/inventory/InventoryHeader";
import InventoryFilters from "../components/inventory/InventoryFilters";
import InventoryForm from "../components/inventory/InventoryForm";
import CategoryManager from "../components/inventory/CategoryManager";
import InventoryList from "../components/inventory/InventoryList";
import "../styles/inventory.css";

function InventoryPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const inventory = useInventory(isAdmin);

  return (
    <div className="inventory-container">
      <InventoryHeader
        itemCount={inventory.items.length}
        totalQuantity={inventory.totalQuantity}
      />

      {!isAdmin && (
        <p className="inventory-notice">Only admins can modify inventory.</p>
      )}

      <InventoryFilters
        categories={inventory.categories}
        searchTerm={inventory.searchTerm}
        filterCategory={inventory.filterCategory}
        setSearchTerm={inventory.setSearchTerm}
        setFilterCategory={inventory.setFilterCategory}
        clearFilters={inventory.clearFilters}
      />

      {isAdmin && (
        <>
          <InventoryForm
            categories={inventory.categories}
            newItem={inventory.newItem}
            setNewItem={inventory.setNewItem}
            onSubmit={inventory.addItem}
          />
          <CategoryManager
            categories={inventory.categories}
            newCategory={inventory.newCategory}
            setNewCategory={inventory.setNewCategory}
            addCategory={inventory.addCategory}
            deleteCategory={inventory.deleteCategory}
          />
        </>
      )}

      <p className="inventory-results">
        Showing {inventory.filteredItems.length} of {inventory.items.length}{" "}
        items
      </p>

      <InventoryList
        items={inventory.filteredItems}
        categories={inventory.categories}
        isAdmin={isAdmin}
        editingId={inventory.editingId}
        editingValues={inventory.editingValues}
        setEditingValues={inventory.setEditingValues}
        onEdit={inventory.startEditing}
        onDelete={inventory.deleteItem}
        onSave={inventory.updateItem}
        onCancel={inventory.cancelEditing}
      />
    </div>
  );
}

export default InventoryPage;
