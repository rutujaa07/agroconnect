import { useState, useEffect } from "react";
import API from "../api/axios";

export default function AdminPanel() {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [tab, setTab] = useState("users");

  useEffect(() => {
    API.get("/admin/stats").then(({ data }) => setStats(data));
    API.get("/admin/users").then(({ data }) => setUsers(data));
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    await API.delete(`/admin/users/${id}`);
    setUsers(users.filter((u) => u._id !== id));
  };

  const roleColor = {
    farmer: "success",
    owner: "primary",
    labourer: "warning",
    admin: "danger",
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">🛡️ Admin Control Panel</h2>

      {/* Stats */}
      <div className="row g-3 mb-5">
        {[
          {
            label: "Total Users",
            val: stats.users,
            icon: "👥",
            color: "#1a5c2e",
          },
          {
            label: "Equipment Listed",
            val: stats.equipment,
            icon: "🚜",
            color: "#e65100",
          },
          {
            label: "Total Rentals",
            val: stats.rentals,
            icon: "📋",
            color: "#1565c0",
          },
        ].map((s) => (
          <div key={s.label} className="col-md-4">
            <div
              className="card border-0 shadow-sm p-4 text-white"
              style={{
                borderRadius: 16,
                background: s.color,
              }}
            >
              <div style={{ fontSize: "2.5rem" }}>{s.icon}</div>
              <div style={{ fontSize: "2.5rem", fontWeight: 900 }}>
                {s.val ?? "..."}
              </div>
              <div className="opacity-75">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Users Table */}
      <h4 className="fw-bold mb-3">All Users</h4>
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td className="fw-semibold">{u.name}</td>
                <td className="text-muted">{u.email}</td>
                <td>
                  <span className={`badge bg-${roleColor[u.role]}`}>
                    {u.role}
                  </span>
                </td>
                <td>{u.location || "—"}</td>
                <td>
                  {u.role !== "admin" && (
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => deleteUser(u._id)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
