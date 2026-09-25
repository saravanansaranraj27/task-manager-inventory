function InventoryHeader({ itemCount, totalQuantity }) {
  return (
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
          <strong>{itemCount}</strong>
          <span>Items</span>
        </div>
        <div>
          <strong>{totalQuantity}</strong>
          <span>Units</span>
        </div>
      </div>
    </div>
  );
}

export default InventoryHeader;
