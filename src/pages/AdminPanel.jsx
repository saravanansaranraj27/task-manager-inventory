import { useAdminUsers } from "../hooks/useAdminUsers";
import ManagerForm from "../components/admin/ManagerForm";
import ManagerList from "../components/admin/ManagerList";
import "../styles/admin.css";

function AdminPanel() {
  const admin = useAdminUsers();

  return (
    <section className="admin-panel" aria-labelledby="admin-heading">
      <div className="admin-heading">
        <div>
          <p className="page-eyebrow">Administration</p>
          <h2 id="admin-heading">Manage managers</h2>
        </div>
        <span className="admin-count">{admin.managerCount} active</span>
      </div>

      <ManagerForm onAdd={admin.addManager} />

      {admin.message && (
        <p className="admin-message" role="status">
          {admin.message}
        </p>
      )}

      <ManagerList
        managers={admin.managers}
        editingUsername={admin.editingUsername}
        newPassword={admin.newPassword}
        setNewPassword={admin.setNewPassword}
        onEdit={admin.startEditing}
        onDelete={admin.deleteManager}
        onSave={admin.updateManagerPassword}
        onCancel={admin.cancelEditing}
      />
    </section>
  );
}

export default AdminPanel;
