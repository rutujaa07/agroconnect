// import { useState, useEffect } from "react";
// import API from "../api/axios";

// // ─────────────────────────────────────────────────────────────────────────────
// // HELPERS
// // ─────────────────────────────────────────────────────────────────────────────

// function filterByPeriod(items = [], period, dateField = "createdAt") {
//   const now = new Date();
//   return items.filter((item) => {
//     const d = new Date(item[dateField]);
//     if (isNaN(d)) return false;
//     if (period === "today")   return d.toDateString() === now.toDateString();
//     if (period === "monthly") return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
//     return d.getFullYear() === now.getFullYear(); // yearly
//   });
// }

// function fmt(num) {
//   return Number(num || 0).toLocaleString("en-IN");
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // SUB-COMPONENTS
// // ─────────────────────────────────────────────────────────────────────────────

// /** Period toggle — Today / This Month / This Year */
// function PeriodToggle({ period, onChange }) {
//   const opts = [
//     { key: "today",   label: "Today" },
//     { key: "monthly", label: "This Month" },
//     { key: "yearly",  label: "This Year" },
//   ];
//   return (
//     <div className="btn-group" role="group">
//       {opts.map(({ key, label }) => (
//         <button
//           key={key}
//           type="button"
//           onClick={() => onChange(key)}
//           className={`btn btn-sm fw-semibold ${
//             period === key ? "btn-success" : "btn-outline-secondary"
//           }`}
//           style={{ fontSize: 13 }}
//         >
//           {label}
//         </button>
//       ))}
//     </div>
//   );
// }

// /** Single KPI card */
// function KpiCard({ icon, title, value, sub, accent = "success" }) {
//   return (
//     <div className="col-sm-6 col-xl-3">
//       <div className="card border-0 shadow-sm h-100" style={{ borderRadius: 14 }}>
//         <div className="card-body p-4">
//           <div
//             className={`bg-${accent} bg-opacity-10 rounded-3 mb-3 d-flex align-items-center justify-content-center`}
//             style={{ width: 44, height: 44, fontSize: 22 }}
//           >
//             {icon}
//           </div>
//           <div className="fs-2 fw-bold text-dark lh-1 mb-1">{value}</div>
//           <div className="fw-semibold" style={{ fontSize: 14 }}>{title}</div>
//           {sub && <div className="text-muted mt-1" style={{ fontSize: 12 }}>{sub}</div>}
//         </div>
//       </div>
//     </div>
//   );
// }

// /** CSS-only mini bar chart */
// function BarChart({ bars = [], label }) {
//   const max = Math.max(...bars.map((b) => b.value), 1);
//   return (
//     <div>
//       {label && (
//         <p className="text-muted mb-2 fw-semibold" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5 }}>
//           {label}
//         </p>
//       )}
//       <div className="d-flex align-items-end gap-1" style={{ height: 60 }}>
//         {bars.map((b, i) => (
//           <div key={i} className="d-flex flex-column align-items-center flex-fill" title={`${b.label}: ${b.value}`}>
//             <div
//               className="bg-success rounded-top w-100"
//               style={{
//                 height: `${Math.max((b.value / max) * 52, b.value > 0 ? 4 : 0)}px`,
//                 opacity: 0.5 + (i / bars.length) * 0.5,
//                 transition: "height 0.5s ease",
//               }}
//             />
//             <div className="text-muted mt-1 text-truncate w-100 text-center" style={{ fontSize: 9 }}>
//               {b.label}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// /** Rental status pill breakdown */
// function StatusRow({ rentals = [] }) {
//   const map = { pending: 0, approved: 0, rejected: 0, completed: 0 };
//   rentals.forEach((r) => { if (r.status in map) map[r.status]++; });
//   const total = rentals.length || 1;
//   const cfg = {
//     pending:   { color: "warning", label: "Pending" },
//     approved:  { color: "success", label: "Approved" },
//     completed: { color: "info",    label: "Completed" },
//     rejected:  { color: "danger",  label: "Rejected" },
//   };
//   return (
//     <div className="d-flex flex-wrap gap-2 mt-2">
//       {Object.entries(cfg).map(([status, { color, label }]) => (
//         <span
//           key={status}
//           className={`badge bg-${color} bg-opacity-15 text-${color} border border-${color} border-opacity-25`}
//           style={{ fontSize: 12 }}
//         >
//           {label}: {map[status]} ({Math.round((map[status] / total) * 100)}%)
//         </span>
//       ))}
//     </div>
//   );
// }

// /** Role progress bars */
// function RoleBreakdown({ users = [] }) {
//   const total = users.length || 1;
//   const roles = [
//     { key: "farmer",   label: "Farmers",         color: "success" },
//     { key: "owner",    label: "Equipment Owners", color: "warning" },
//     { key: "labourer", label: "Labourers",        color: "info"    },
//   ];
//   return (
//     <div className="d-flex flex-column gap-3 mt-1">
//       {roles.map(({ key, label, color }) => {
//         const count = users.filter((u) => u.role === key).length;
//         const pct   = Math.round((count / total) * 100);
//         return (
//           <div key={key}>
//             <div className="d-flex justify-content-between mb-1" style={{ fontSize: 12 }}>
//               <span className="text-muted">{label}</span>
//               <span className="fw-semibold">{count} <span className="text-muted">({pct}%)</span></span>
//             </div>
//             <div className="progress" style={{ height: 6, borderRadius: 4 }}>
//               <div className={`progress-bar bg-${color}`} style={{ width: `${pct}%`, borderRadius: 4 }} />
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // MAIN COMPONENT
// // ─────────────────────────────────────────────────────────────────────────────

// export default function AdminDashboard() {
//   const [period,    setPeriod]    = useState("monthly");
//   const [activeTab, setActiveTab] = useState("rentals");
//   const [loading,   setLoading]   = useState(true);
//   const [error,     setError]     = useState(null);

//   // Raw data — fetched from exact endpoints documented in Section 3.2 of report
//   const [allRentals,   setAllRentals]   = useState([]);
//   const [allEquipment, setAllEquipment] = useState([]);
//   const [allUsers,     setAllUsers]     = useState([]);
//   const [allLabour,    setAllLabour]    = useState([]);

//   useEffect(() => {
//     setLoading(true);
//     setError(null);
//     Promise.all([
//       API.get("/admin/rentals"),  // GET /api/admin/rentals  — all transactions
//       API.get("/equipment"),      // GET /api/equipment      — all listings (public)
//       API.get("/admin/users"),    // GET /api/admin/users    — all users
//       API.get("/labour"),         // GET /api/labour         — all profiles (public)
//     ])
//       .then(([r, e, u, l]) => {
//         setAllRentals  (Array.isArray(r.data) ? r.data : []);
//         setAllEquipment(Array.isArray(e.data) ? e.data : []);
//         setAllUsers    (Array.isArray(u.data) ? u.data : []);
//         setAllLabour   (Array.isArray(l.data) ? l.data : []);
//       })
//       .catch(() => setError("Could not load admin data. Check your API connection."))
//       .finally(() => setLoading(false));
//   }, []);

//   // ── Period-filtered slices ─────────────────────────────────────────────────
//   const rentals    = filterByPeriod(allRentals,   period, "createdAt");
//   const newUsers   = filterByPeriod(allUsers,     period, "createdAt");
//   const newEquip   = filterByPeriod(allEquipment, period, "createdAt");
//   const newLabour  = filterByPeriod(allLabour,    period, "createdAt");

//   const approvedRentals  = rentals.filter((r) => r.status === "approved" || r.status === "completed");
//   const pendingRentals   = rentals.filter((r) => r.status === "pending");
//   const completedRentals = rentals.filter((r) => r.status === "completed");
//   const rejectedRentals  = rentals.filter((r) => r.status === "rejected");
//   const periodRevenue    = approvedRentals.reduce((s, r) => s + (r.totalCost || 0), 0);

//   // ── 6-month trend arrays ───────────────────────────────────────────────────
//   const last6 = Array.from({ length: 6 }, (_, i) => {
//     const d = new Date();
//     d.setMonth(d.getMonth() - (5 - i));
//     return { month: d.getMonth(), year: d.getFullYear(), label: d.toLocaleString("default", { month: "short" }) };
//   });

//   const revenueTrend = last6.map(({ month, year, label }) => ({
//     label,
//     value: allRentals
//       .filter((r) => {
//         const d = new Date(r.createdAt);
//         return d.getMonth() === month && d.getFullYear() === year &&
//           (r.status === "approved" || r.status === "completed");
//       })
//       .reduce((s, r) => s + (r.totalCost || 0), 0),
//   }));

//   const rentalsTrend = last6.map(({ month, year, label }) => ({
//     label,
//     value: allRentals.filter((r) => {
//       const d = new Date(r.createdAt);
//       return d.getMonth() === month && d.getFullYear() === year;
//     }).length,
//   }));

//   // ── Delete handlers ────────────────────────────────────────────────────────
//   // DELETE /api/admin/users/:id  (Section 3.2)
//   const handleDeleteUser = async (id) => {
//     if (!window.confirm("Permanently delete this user and their data?")) return;
//     try {
//       await API.delete(`/admin/users/${id}`);
//       setAllUsers((p) => p.filter((u) => u._id !== id));
//     } catch { alert("Failed to delete user."); }
//   };

//   // DELETE /api/equipment/:id  (Owner/Admin — Section 3.2)
//   const handleDeleteEquipment = async (id) => {
//     if (!window.confirm("Delete this equipment listing?")) return;
//     try {
//       await API.delete(`/equipment/${id}`);
//       setAllEquipment((p) => p.filter((e) => e._id !== id));
//     } catch { alert("Failed to delete equipment."); }
//   };

//   // DELETE /api/labour/:id  (Labourer/Admin — Section 3.2)
//   const handleDeleteLabour = async (id) => {
//     if (!window.confirm("Delete this labour profile?")) return;
//     try {
//       await API.delete(`/labour/${id}`);
//       setAllLabour((p) => p.filter((l) => l._id !== id));
//     } catch { alert("Failed to delete labour profile."); }
//   };

//   // ── Loading / Error ────────────────────────────────────────────────────────
//   if (loading)
//     return (
//       <div className="d-flex align-items-center justify-content-center py-5 gap-3">
//         <div className="spinner-border text-success" style={{ width: 28, height: 28 }} />
//         <span className="text-muted">Loading admin dashboard…</span>
//       </div>
//     );

//   if (error)
//     return <div className="alert alert-danger mt-2">⚠️ {error}</div>;

//   // ── Render ─────────────────────────────────────────────────────────────────
//   return (
//     <div>

//       {/* HEADER */}
//       <div className="d-flex justify-content-between align-items-start mb-4 flex-wrap gap-3">
//         <div>
//           <h5 className="fw-bold mb-1">🛡️ Admin Dashboard</h5>
//           <span className="text-muted" style={{ fontSize: 13 }}>AgroConnect · Platform Overview</span>
//         </div>
//         <PeriodToggle period={period} onChange={setPeriod} />
//       </div>

//       {/* KPI ROW 1 — Rentals & Revenue */}
//       <div className="row g-3 mb-3">
//         <KpiCard
//           icon="🚜" title="Equipment Rentals"
//           value={rentals.length}
//           sub={`${approvedRentals.length} approved · ${pendingRentals.length} pending`}
//           accent="success"
//         />
//         <KpiCard
//           icon="💰" title="Revenue Generated"
//           value={`₹${fmt(periodRevenue)}`}
//           sub="Approved + Completed bookings"
//           accent="warning"
//         />
//         <KpiCard
//           icon="⏳" title="Pending Approvals"
//           value={pendingRentals.length}
//           sub="Awaiting owner action"
//           accent="danger"
//         />
//         <KpiCard
//           icon="✅" title="Completion Rate"
//           value={rentals.length ? `${Math.round((completedRentals.length / rentals.length) * 100)}%` : "0%"}
//           sub={`${completedRentals.length} completed · ${rejectedRentals.length} rejected`}
//           accent="info"
//         />
//       </div>

//       {/* KPI ROW 2 — Users & Platform */}
//       <div className="row g-3 mb-4">
//         <KpiCard
//           icon="👥" title="New Registrations"
//           value={newUsers.length}
//           sub="Farmers, Owners & Labourers"
//           accent="primary"
//         />
//         <KpiCard
//           icon="🛠️" title="Equipment Listings"
//           value={newEquip.length}
//           sub={`${allEquipment.length} total across platform`}
//           accent="secondary"
//         />
//         <KpiCard
//           icon="👷" title="Labour Profiles"
//           value={newLabour.length}
//           sub={`${allLabour.length} total registered`}
//           accent="info"
//         />
//         <KpiCard
//           icon="👤" title="Total Users"
//           value={allUsers.length}
//           sub={`${allUsers.filter(u => u.role === "farmer").length} farmers · ${allUsers.filter(u => u.role === "owner").length} owners`}
//           accent="success"
//         />
//       </div>

//       {/* CHARTS ROW */}
//       <div className="row g-3 mb-4">

//         <div className="col-md-4">
//           <div className="card border-0 shadow-sm p-4 h-100" style={{ borderRadius: 14 }}>
//             <h6 className="fw-bold mb-1">Revenue Trend</h6>
//             <p className="text-muted mb-3" style={{ fontSize: 12 }}>Last 6 months · Approved & Completed</p>
//             <BarChart bars={revenueTrend} label="₹ Revenue per month" />
//           </div>
//         </div>

//         <div className="col-md-4">
//           <div className="card border-0 shadow-sm p-4 h-100" style={{ borderRadius: 14 }}>
//             <h6 className="fw-bold mb-1">Rental Volume</h6>
//             <p className="text-muted mb-3" style={{ fontSize: 12 }}>Last 6 months · All statuses</p>
//             <BarChart bars={rentalsTrend} label="No. of rental requests" />
//           </div>
//         </div>

//         <div className="col-md-4">
//           <div className="card border-0 shadow-sm p-4 h-100" style={{ borderRadius: 14 }}>
//             <h6 className="fw-bold mb-0">Rental Status Breakdown</h6>
//             <p className="text-muted mb-0" style={{ fontSize: 12 }}>
//               {period === "today" ? "Today" : period === "monthly" ? "This Month" : "This Year"}
//               {" · "}{rentals.length} total
//             </p>
//             <StatusRow rentals={rentals} />
//             <hr className="my-3" />
//             <h6 className="fw-bold mb-0" style={{ fontSize: 13 }}>User Role Split</h6>
//             <p className="text-muted mb-2" style={{ fontSize: 12 }}>All time · {allUsers.length} total</p>
//             <RoleBreakdown users={allUsers} />
//           </div>
//         </div>

//       </div>

//       {/* MANAGEMENT TABLES */}
//       <div className="card border-0 shadow-sm p-4" style={{ borderRadius: 14 }}>

//         {/* Tab Nav */}
//         <ul className="nav nav-tabs border-bottom mb-3 flex-nowrap overflow-auto">
//           {[
//             { key: "rentals",   label: "📋 Rentals",   count: allRentals.length   },
//             { key: "equipment", label: "🚜 Equipment",  count: allEquipment.length },
//             { key: "users",     label: "👥 Users",      count: allUsers.length     },
//             { key: "labour",    label: "👷 Labour",     count: allLabour.length    },
//           ].map(({ key, label, count }) => (
//             <li className="nav-item" key={key}>
//               <button
//                 className={`nav-link border-0 fw-semibold text-nowrap ${activeTab === key ? "active text-success" : "text-muted"}`}
//                 style={{ fontSize: 13 }}
//                 onClick={() => setActiveTab(key)}
//               >
//                 {label}
//                 <span
//                   className={`ms-1 badge rounded-pill ${activeTab === key ? "bg-success" : "bg-secondary bg-opacity-25 text-secondary"}`}
//                   style={{ fontSize: 10 }}
//                 >
//                   {count}
//                 </span>
//               </button>
//             </li>
//           ))}
//         </ul>

//         {/* TAB: ALL RENTALS */}
//         {activeTab === "rentals" && (
//           <>
//             <p className="text-muted mb-3" style={{ fontSize: 13 }}>All rental transactions · showing latest 25</p>
//             {allRentals.length === 0 ? (
//               <div className="alert alert-info mb-0">No rental records found.</div>
//             ) : (
//               <>
//                 <div className="table-responsive">
//                   <table className="table table-hover align-middle mb-0" style={{ fontSize: 13 }}>
//                     <thead className="table-light">
//                       <tr>
//                         <th>#</th>
//                         <th>Equipment</th>
//                         <th>Farmer</th>
//                         <th>Phone</th>
//                         <th>Start</th>
//                         <th>End</th>
//                         <th>Days</th>
//                         <th>Total Cost</th>
//                         <th>Status</th>
//                         <th>Booked On</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {allRentals.slice(0, 25).map((r, i) => (
//                         <tr key={r._id}>
//                           <td className="text-muted">{i + 1}</td>
//                           <td className="fw-semibold">{r.equipment?.title || "—"}</td>
//                           <td>{r.farmer?.name || "—"}</td>
//                           <td className="text-muted">{r.farmer?.phone || "—"}</td>
//                           <td>{r.startDate ? new Date(r.startDate).toLocaleDateString("en-IN") : "—"}</td>
//                           <td>{r.endDate   ? new Date(r.endDate).toLocaleDateString("en-IN")   : "—"}</td>
//                           <td>{r.totalDays || "—"}</td>
//                           <td className="text-success fw-bold">₹{fmt(r.totalCost)}</td>
//                           <td>
//                             <span className={`badge bg-${
//                               r.status === "approved"  ? "success" :
//                               r.status === "pending"   ? "warning" :
//                               r.status === "completed" ? "info"    : "danger"
//                             }`}>{r.status}</span>
//                           </td>
//                           <td className="text-muted">
//                             {r.createdAt ? new Date(r.createdAt).toLocaleDateString("en-IN") : "—"}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//                 {allRentals.length > 25 && (
//                   <p className="text-muted small mt-2 mb-0">Showing 25 of {allRentals.length} records.</p>
//                 )}
//               </>
//             )}
//           </>
//         )}

//         {/* TAB: ALL EQUIPMENT */}
//         {activeTab === "equipment" && (
//           <>
//             <p className="text-muted mb-3" style={{ fontSize: 13 }}>
//               All equipment listings. Admin can delete listings that violate platform policies.
//             </p>
//             {allEquipment.length === 0 ? (
//               <div className="alert alert-info mb-0">No equipment listed yet.</div>
//             ) : (
//               <div className="table-responsive">
//                 <table className="table table-hover align-middle mb-0" style={{ fontSize: 13 }}>
//                   <thead className="table-light">
//                     <tr>
//                       <th>#</th>
//                       <th>Title</th>
//                       <th>Category</th>
//                       <th>Owner</th>
//                       <th>Location</th>
//                       <th>Price/Day</th>
//                       <th>Available</th>
//                       <th>Listed On</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {allEquipment.map((e, i) => (
//                       <tr key={e._id}>
//                         <td className="text-muted">{i + 1}</td>
//                         <td className="fw-semibold">{e.title}</td>
//                         <td>{e.category || "—"}</td>
//                         <td>{e.owner?.name || "—"}</td>
//                         <td>📍 {e.location}</td>
//                         <td className="text-success fw-bold">₹{fmt(e.pricePerDay)}</td>
//                         <td>
//                           <span className={`badge ${e.isAvailable !== false ? "bg-success" : "bg-secondary"}`}>
//                             {e.isAvailable !== false ? "Yes" : "No"}
//                           </span>
//                         </td>
//                         <td className="text-muted">
//                           {e.createdAt ? new Date(e.createdAt).toLocaleDateString("en-IN") : "—"}
//                         </td>
//                         <td>
//                           <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteEquipment(e._id)}>
//                             🗑 Delete
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </>
//         )}

//         {/* TAB: ALL USERS */}
//         {activeTab === "users" && (
//           <>
//             <p className="text-muted mb-3" style={{ fontSize: 13 }}>
//               All registered users. Admin accounts are protected from deletion.
//             </p>
//             {allUsers.length === 0 ? (
//               <div className="alert alert-info mb-0">No users registered yet.</div>
//             ) : (
//               <div className="table-responsive">
//                 <table className="table table-hover align-middle mb-0" style={{ fontSize: 13 }}>
//                   <thead className="table-light">
//                     <tr>
//                       <th>#</th>
//                       <th>Name</th>
//                       <th>Email</th>
//                       <th>Phone</th>
//                       <th>Location</th>
//                       <th>Role</th>
//                       <th>Joined</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {allUsers.map((u, i) => (
//                       <tr key={u._id}>
//                         <td className="text-muted">{i + 1}</td>
//                         <td className="fw-semibold">{u.name}</td>
//                         <td className="text-muted">{u.email}</td>
//                         <td>{u.phone || "—"}</td>
//                         <td>{u.location || "—"}</td>
//                         <td>
//                           <span className={`badge ${
//                             u.role === "farmer"   ? "bg-success" :
//                             u.role === "owner"    ? "bg-warning text-dark" :
//                             u.role === "admin"    ? "bg-danger"  : "bg-info text-dark"
//                           }`}>{u.role}</span>
//                         </td>
//                         <td className="text-muted">
//                           {u.createdAt ? new Date(u.createdAt).toLocaleDateString("en-IN") : "—"}
//                         </td>
//                         <td>
//                           {u.role !== "admin" ? (
//                             <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteUser(u._id)}>
//                               🗑 Delete
//                             </button>
//                           ) : (
//                             <span className="text-muted" style={{ fontSize: 12 }}>Protected</span>
//                           )}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </>
//         )}

//         {/* TAB: ALL LABOUR */}
//         {activeTab === "labour" && (
//           <>
//             <p className="text-muted mb-3" style={{ fontSize: 13 }}>
//               All labourer profiles registered on the platform.
//             </p>
//             {allLabour.length === 0 ? (
//               <div className="alert alert-info mb-0">No labour profiles found.</div>
//             ) : (
//               <div className="table-responsive">
//                 <table className="table table-hover align-middle mb-0" style={{ fontSize: 13 }}>
//                   <thead className="table-light">
//                     <tr>
//                       <th>#</th>
//                       <th>Name</th>
//                       <th>Skills</th>
//                       <th>Experience</th>
//                       <th>Location</th>
//                       <th>Daily Rate</th>
//                       <th>Availability</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {allLabour.map((l, i) => (
//                       <tr key={l._id}>
//                         <td className="text-muted">{i + 1}</td>
//                         <td className="fw-semibold">{l.name || l.user?.name || "—"}</td>
//                         <td>
//                           {Array.isArray(l.skills)
//                             ? l.skills.map((s) => (
//                                 <span key={s} className="badge bg-light text-dark border me-1 mb-1" style={{ fontSize: 11 }}>
//                                   {s}
//                                 </span>
//                               ))
//                             : l.skills || "—"}
//                         </td>
//                         <td>{l.experience ? `${l.experience} yrs` : "—"}</td>
//                         <td>📍 {l.location || "—"}</td>
//                         <td className="text-success fw-bold">
//                           {l.dailyWage ? `₹${fmt(l.dailyWage)}/day` : "—"}
//                         </td>
//                         <td>
//                           <span className={`badge ${l.isAvailable !== false ? "bg-success" : "bg-secondary"}`}>
//                             {l.isAvailable !== false ? "Available" : "Busy"}
//                           </span>
//                         </td>
//                         <td>
//                           <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteLabour(l._id)}>
//                             🗑 Delete
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </>
//         )}

//       </div>
//     </div>
//   );
// }


// Dashboard.jsx — All roles in one file
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

// ─── Farmer Dashboard ────────────────────────────────────────────────────────
function FarmerDashboard({ user }) {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/rentals/my")
      .then(({ data }) => setRentals(data))
      .finally(() => setLoading(false));
  }, []);

  const statusColor = { pending: "warning", approved: "success", rejected: "danger", completed: "info" };

  const stats = {
    total: rentals.length,
    approved: rentals.filter((r) => r.status === "approved").length,
    pending: rentals.filter((r) => r.status === "pending").length,
    spent: rentals.filter((r) => r.status !== "rejected").reduce((sum, r) => sum + (r.totalCost || 0), 0),
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-0">Welcome, {user?.name}! 👋</h2>
          <span className="badge bg-success fs-6 mt-1">FARMER</span>
        </div>
        <Link to="/equipment" className="btn btn-success fw-bold">🔍 Browse Equipment</Link>
      </div>

      {/* Stats */}
      <div className="row g-3 mb-4">
        {[
          { label: "Total Bookings", value: stats.total, color: "success" },
          { label: "Approved", value: stats.approved, color: "primary" },
          { label: "Pending", value: stats.pending, color: "warning" },
          { label: "Total Spent", value: `₹${stats.spent}`, color: "success" },
        ].map((s) => (
          <div key={s.label} className="col-6 col-md-3">
            <div className="card border-0 shadow-sm text-center p-3" style={{ borderRadius: 12 }}>
              <h3 className={`fw-bold text-${s.color} mb-0`}>{s.value}</h3>
              <small className="text-muted">{s.label}</small>
            </div>
          </div>
        ))}
      </div>

      <h4 className="fw-bold mb-3">My Rental Bookings</h4>
      {loading ? (
        <div className="text-center py-4"><div className="spinner-border text-success" /></div>
      ) : rentals.length === 0 ? (
        <div className="alert alert-info">No bookings yet. <Link to="/equipment">Browse equipment →</Link></div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-success">
              <tr><th>Equipment</th><th>Start</th><th>End</th><th>Days</th><th>Total</th><th>Status</th></tr>
            </thead>
            <tbody>
              {rentals.map((r) => (
                <tr key={r._id}>
                  <td className="fw-semibold">{r.equipment?.title}</td>
                  <td>{new Date(r.startDate).toLocaleDateString()}</td>
                  <td>{new Date(r.endDate).toLocaleDateString()}</td>
                  <td>{r.totalDays}</td>
                  <td className="text-success fw-bold">₹{r.totalCost}</td>
                  <td><span className={`badge bg-${statusColor[r.status]}`}>{r.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── Owner Dashboard ──────────────────────────────────────────────────────────
function OwnerDashboard({ user }) {
  const [myEquipment, setMyEquipment] = useState([]);
  const [incomingRentals, setIncomingRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([API.get("/equipment"), API.get("/rentals/owner")])
      .then(([eqRes, rentalRes]) => {
        setMyEquipment(eqRes.data.filter((e) => e.owner?._id === user._id || e.owner === user._id));
        setIncomingRentals(rentalRes.data);
      })
      .finally(() => setLoading(false));
  }, [user]);

  const updateRentalStatus = async (id, status) => {
    await API.put(`/rentals/${id}/status`, { status });
    const { data } = await API.get("/rentals/owner");
    setIncomingRentals(data);
  };

  const statusColor = { pending: "warning", approved: "success", rejected: "danger", completed: "info" };
  const totalEarnings = incomingRentals
    .filter((r) => r.status === "approved" || r.status === "completed")
    .reduce((sum, r) => sum + (r.totalCost || 0), 0);

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-0">Welcome, {user?.name}! 👋</h2>
          <span className="badge bg-success fs-6 mt-1">OWNER</span>
        </div>
        <Link to="/add-equipment" className="btn btn-success fw-bold">+ Add Equipment</Link>
      </div>

      {/* Stats */}
      <div className="row g-3 mb-4">
        {[
          { label: "My Equipment", value: myEquipment.length, color: "success" },
          { label: "Pending Requests", value: incomingRentals.filter((r) => r.status === "pending").length, color: "warning" },
          { label: "Total Requests", value: incomingRentals.length, color: "primary" },
          { label: "Total Earnings", value: `₹${totalEarnings}`, color: "success" },
        ].map((s) => (
          <div key={s.label} className="col-6 col-md-3">
            <div className="card border-0 shadow-sm text-center p-3" style={{ borderRadius: 12 }}>
              <h3 className={`fw-bold text-${s.color} mb-0`}>{s.value}</h3>
              <small className="text-muted">{s.label}</small>
            </div>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-4"><div className="spinner-border text-success" /></div>
      ) : (
        <>
          <h4 className="fw-bold mb-3">My Equipment ({myEquipment.length})</h4>
          {myEquipment.length === 0 ? (
            <div className="alert alert-info mb-4">No equipment yet. <Link to="/add-equipment">Add now →</Link></div>
          ) : (
            <div className="row g-3 mb-5">
              {myEquipment.map((e) => (
                <div key={e._id} className="col-md-4">
                  <div className="card border-0 shadow-sm p-3" style={{ borderRadius: 12 }}>
                    <h6 className="fw-bold">{e.title}</h6>
                    <p className="text-muted small mb-1">📍 {e.location}</p>
                    <p className="text-success fw-bold mb-0">₹{e.pricePerDay}/day</p>
                    <span className={`badge bg-${e.available ? "success" : "secondary"} mt-2`}>
                      {e.available ? "Available" : "Unavailable"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <h4 className="fw-bold mb-3">Incoming Rental Requests</h4>
          {incomingRentals.length === 0 ? (
            <div className="alert alert-info">No rental requests yet.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-success">
                  <tr><th>Equipment</th><th>Farmer</th><th>Dates</th><th>Cost</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {incomingRentals.map((r) => (
                    <tr key={r._id}>
                      <td>{r.equipment?.title}</td>
                      <td>{r.farmer?.name}<br /><small className="text-muted">{r.farmer?.phone}</small></td>
                      <td>{new Date(r.startDate).toLocaleDateString()} – {new Date(r.endDate).toLocaleDateString()}</td>
                      <td className="text-success fw-bold">₹{r.totalCost}</td>
                      <td><span className={`badge bg-${statusColor[r.status]}`}>{r.status}</span></td>
                      <td>
                        {r.status === "pending" && (
                          <div className="d-flex gap-1">
                            <button className="btn btn-success btn-sm" onClick={() => updateRentalStatus(r._id, "approved")}>✓ Approve</button>
                            <button className="btn btn-danger btn-sm" onClick={() => updateRentalStatus(r._id, "rejected")}>✗ Reject</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─── Labourer Dashboard ───────────────────────────────────────────────────────
function LabourerDashboard({ user }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/labour/my-profile")
      .then(({ data }) => setProfile(data))
      .catch(() => setProfile(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-0">Welcome, {user?.name}! 👋</h2>
          <span className="badge bg-success fs-6 mt-1">LABOURER</span>
        </div>
        <Link to="/labour/create" className="btn btn-success fw-bold">
          {profile ? "✏️ Edit Profile" : "+ Create Profile"}
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-4"><div className="spinner-border text-success" /></div>
      ) : profile ? (
        <>
          <div className="card border-0 shadow-sm p-4 mb-4" style={{ borderRadius: 14 }}>
            <div className="row align-items-center">
              <div className="col-auto">
                <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center fw-bold fs-3"
                  style={{ width: 64, height: 64 }}>
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="col">
                <h5 className="fw-bold mb-0">{user?.name}</h5>
                <p className="text-muted mb-0">📍 {profile.location}</p>
                <p className="text-muted mb-0">📞 {user?.phone}</p>
              </div>
              <div className="col-auto">
                <span className={`badge fs-6 bg-${profile.available ? "success" : "secondary"}`}>
                  {profile.available ? "✅ Available" : "🔴 Unavailable"}
                </span>
              </div>
            </div>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <div className="card border-0 shadow-sm p-3 h-100" style={{ borderRadius: 12 }}>
                <h6 className="fw-bold mb-2">🛠 Skills</h6>
                <div className="d-flex flex-wrap gap-2">
                  {(profile.skills || []).map((skill, i) => (
                    <span key={i} className="badge bg-success-subtle text-success border border-success px-3 py-2">{skill}</span>
                  ))}
                  {(!profile.skills || profile.skills.length === 0) && <span className="text-muted small">No skills listed.</span>}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card border-0 shadow-sm p-3 h-100" style={{ borderRadius: 12 }}>
                <h6 className="fw-bold mb-2">💼 Work Details</h6>
                <p className="mb-1"><strong>Daily Rate:</strong> <span className="text-success fw-bold">₹{profile.dailyRate}/day</span></p>
                <p className="mb-1"><strong>Experience:</strong> {profile.experience || "Not specified"}</p>
                <p className="mb-0"><strong>Languages:</strong> {(profile.languages || []).join(", ") || "Not specified"}</p>
              </div>
            </div>
          </div>

          {profile.bio && (
            <div className="card border-0 shadow-sm p-3" style={{ borderRadius: 12 }}>
              <h6 className="fw-bold mb-2">📝 About Me</h6>
              <p className="text-muted mb-0">{profile.bio}</p>
            </div>
          )}
        </>
      ) : (
        <div className="alert alert-warning d-flex align-items-center gap-3" style={{ borderRadius: 12 }}>
          <span style={{ fontSize: 40 }}>👷</span>
          <div>
            <h5 className="mb-1">No profile yet!</h5>
            <p className="mb-2">Create your labourer profile so farmers can find and hire you.</p>
            <Link to="/labour/create" className="btn btn-success">+ Create Profile Now</Link>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Admin Dashboard ──────────────────────────────────────────────────────────
function AdminDashboard({ user }) {
  const [stats, setStats] = useState({ totalUsers: 0, totalEquipment: 0, totalRentals: 0, totalRevenue: 0, farmers: 0, owners: 0, labourers: 0 });
  const [users, setUsers] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([API.get("/admin/users"), API.get("/equipment"), API.get("/admin/rentals")])
      .then(([usersRes, eqRes, rentalsRes]) => {
        const allUsers = usersRes.data;
        const allRentals = rentalsRes.data;
        const allEquipment = eqRes.data;
        setUsers(allUsers);
        setRentals(allRentals);
        setEquipment(allEquipment);
        setStats({
          totalUsers: allUsers.length,
          totalEquipment: allEquipment.length,
          totalRentals: allRentals.length,
          totalRevenue: allRentals.filter((r) => ["approved", "completed"].includes(r.status)).reduce((sum, r) => sum + (r.totalCost || 0), 0),
          farmers: allUsers.filter((u) => u.role === "farmer").length,
          owners: allUsers.filter((u) => u.role === "owner").length,
          labourers: allUsers.filter((u) => u.role === "labourer").length,
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    await API.delete(`/admin/users/${id}`);
    setUsers((prev) => prev.filter((u) => u._id !== id));
  };

  const deleteEquipment = async (id) => {
    if (!window.confirm("Delete this equipment?")) return;
    await API.delete(`/equipment/${id}`);
    setEquipment((prev) => prev.filter((e) => e._id !== id));
  };

  const statusColor = { pending: "warning", approved: "success", rejected: "danger", completed: "info" };
  const roleColor = { farmer: "success", owner: "primary", labourer: "warning", admin: "danger" };

  return (
    <div className="container-fluid py-4 px-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-0">Admin Dashboard 🛡️</h2>
          <span className="badge bg-danger fs-6 mt-1">ADMINISTRATOR</span>
          <span className="text-muted ms-2 small">Logged in as {user?.name}</span>
        </div>
      </div>

      <div className="row g-3 mb-4">
        {[
          { label: "Total Users", value: stats.totalUsers, color: "primary", icon: "👥" },
          { label: "Equipment Listed", value: stats.totalEquipment, color: "success", icon: "🚜" },
          { label: "Total Rentals", value: stats.totalRentals, color: "info", icon: "📋" },
          { label: "Platform Revenue", value: `₹${stats.totalRevenue}`, color: "warning", icon: "💰" },
        ].map((s) => (
          <div key={s.label} className="col-6 col-md-3">
            <div className="card border-0 shadow-sm p-3 text-center" style={{ borderRadius: 14 }}>
              <div style={{ fontSize: 32 }}>{s.icon}</div>
              <h3 className={`fw-bold text-${s.color} mb-0`}>{s.value}</h3>
              <small className="text-muted">{s.label}</small>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-3 mb-4">
        {[
          { label: "Farmers", value: stats.farmers, color: "success", icon: "🌾" },
          { label: "Equipment Owners", value: stats.owners, color: "primary", icon: "🏭" },
          { label: "Labourers", value: stats.labourers, color: "warning", icon: "👷" },
        ].map((s) => (
          <div key={s.label} className="col-md-4">
            <div className="card border-0 shadow-sm p-3 d-flex flex-row align-items-center gap-3" style={{ borderRadius: 14 }}>
              <span style={{ fontSize: 36 }}>{s.icon}</span>
              <div>
                <h4 className={`fw-bold text-${s.color} mb-0`}>{s.value}</h4>
                <small className="text-muted">{s.label}</small>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ul className="nav nav-tabs mb-3">
        {["overview", "users", "equipment", "rentals"].map((tab) => (
          <li key={tab} className="nav-item">
            <button className={`nav-link text-capitalize fw-semibold ${activeTab === tab ? "active" : ""}`} onClick={() => setActiveTab(tab)}>
              {tab}
            </button>
          </li>
        ))}
      </ul>

      {loading ? (
        <div className="text-center py-5"><div className="spinner-border text-success" /></div>
      ) : (
        <>
          {activeTab === "overview" && (
            <div className="alert alert-success" style={{ borderRadius: 12 }}>
              <h5>📊 Platform Summary</h5>
              <p className="mb-1"><strong>{stats.totalUsers}</strong> registered users — {stats.farmers} farmers, {stats.owners} owners, {stats.labourers} labourers.</p>
              <p className="mb-1"><strong>{stats.totalEquipment}</strong> equipment listings on the platform.</p>
              <p className="mb-0"><strong>{stats.totalRentals}</strong> rental transactions worth <strong>₹{stats.totalRevenue}</strong> in approved/completed bookings.</p>
            </div>
          )}

          {activeTab === "users" && (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-dark">
                  <tr><th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Joined</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id}>
                      <td className="fw-semibold">{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.phone || "—"}</td>
                      <td><span className={`badge bg-${roleColor[u.role] || "secondary"}`}>{u.role}</span></td>
                      <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                      <td>{u.role !== "admin" && <button className="btn btn-danger btn-sm" onClick={() => deleteUser(u._id)}>🗑 Delete</button>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "equipment" && (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-dark">
                  <tr><th>Title</th><th>Owner</th><th>Location</th><th>Price/Day</th><th>Available</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {equipment.map((e) => (
                    <tr key={e._id}>
                      <td className="fw-semibold">{e.title}</td>
                      <td>{e.owner?.name || "—"}</td>
                      <td>📍 {e.location}</td>
                      <td className="text-success fw-bold">₹{e.pricePerDay}</td>
                      <td><span className={`badge bg-${e.available ? "success" : "secondary"}`}>{e.available ? "Yes" : "No"}</span></td>
                      <td><button className="btn btn-danger btn-sm" onClick={() => deleteEquipment(e._id)}>🗑 Delete</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "rentals" && (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-dark">
                  <tr><th>Equipment</th><th>Farmer</th><th>Owner</th><th>Dates</th><th>Cost</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {rentals.map((r) => (
                    <tr key={r._id}>
                      <td>{r.equipment?.title}</td>
                      <td>{r.farmer?.name}</td>
                      <td>{r.equipment?.owner?.name || "—"}</td>
                      <td>{new Date(r.startDate).toLocaleDateString()} – {new Date(r.endDate).toLocaleDateString()}</td>
                      <td className="text-success fw-bold">₹{r.totalCost}</td>
                      <td><span className={`badge bg-${statusColor[r.status]}`}>{r.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─── Main Export: Role Router ─────────────────────────────────────────────────
export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return <div className="container py-5 text-center"><div className="spinner-border text-success" /></div>;

  if (user.role === "farmer")   return <FarmerDashboard user={user} />;
  if (user.role === "owner")    return <OwnerDashboard user={user} />;
  if (user.role === "labourer") return <LabourerDashboard user={user} />;
  if (user.role === "admin")    return <AdminDashboard user={user} />;

  return <div className="container py-5 text-center"><h4>Unknown role: {user.role}</h4></div>;
}