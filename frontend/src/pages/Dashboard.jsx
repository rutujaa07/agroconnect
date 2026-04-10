import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

export default function Dashboard() {
  const { user } = useAuth();
  const [rentals, setRentals] = useState([]);
  const [myEquipment, setMyEquipment] = useState([]);
  const [incomingRentals, setIncomingRentals] = useState([]);

  useEffect(() => {
    if (user?.role === "farmer") {
      API.get("/rentals/my").then(({ data }) => setRentals(data));
    }
    if (user?.role === "owner") {
      API.get("/equipment").then(({ data }) =>
        setMyEquipment(
          data.filter((e) => e.owner?._id === user._id || e.owner === user._id)
        )
      );
      API.get("/rentals/owner").then(({ data }) => setIncomingRentals(data));
    }
  }, [user]);

  const updateRentalStatus = async (id, status) => {
    await API.put(`/rentals/${id}/status`, { status });
    const { data } = await API.get("/rentals/owner");
    setIncomingRentals(data);
  };

  const statusColor = {
    pending: "warning",
    approved: "success",
    rejected: "danger",
    completed: "info",
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-0">Welcome, {user?.name}! 👋</h2>
          <span className="badge bg-success fs-6 mt-1">
            {user?.role?.toUpperCase()}
          </span>
        </div>
        {user?.role === "owner" && (
          <Link to="/add-equipment" className="btn btn-success fw-bold">
            + Add Equipment
          </Link>
        )}
        {user?.role === "labourer" && (
          <Link to="/labour/create" className="btn btn-success fw-bold">
            + Create Profile
          </Link>
        )}
      </div>

      {/* Farmer: My Bookings */}
      {user?.role === "farmer" && (
        <div>
          <h4 className="fw-bold mb-3">My Rental Bookings</h4>
          {rentals.length === 0 ? (
            <div className="alert alert-info">
              No bookings yet. <Link to="/equipment">Browse equipment →</Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-success">
                  <tr>
                    <th>Equipment</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Days</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rentals.map((r) => (
                    <tr key={r._id}>
                      <td className="fw-semibold">{r.equipment?.title}</td>
                      <td>{new Date(r.startDate).toLocaleDateString()}</td>
                      <td>{new Date(r.endDate).toLocaleDateString()}</td>
                      <td>{r.totalDays}</td>
                      <td className="text-success fw-bold">₹{r.totalCost}</td>
                      <td>
                        <span className={`badge bg-${statusColor[r.status]}`}>
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Owner: My Equipment + Rental Requests */}
      {user?.role === "owner" && (
        <div>
          <h4 className="fw-bold mb-3">My Equipment ({myEquipment.length})</h4>
          <div className="row g-3 mb-5">
            {myEquipment.map((e) => (
              <div key={e._id} className="col-md-4">
                <div
                  className="card border-0 shadow-sm p-3"
                  style={{ borderRadius: 12 }}
                >
                  <h6 className="fw-bold">{e.title}</h6>
                  <p className="text-muted small mb-1">📍 {e.location}</p>
                  <p className="text-success fw-bold mb-0">
                    ₹{e.pricePerDay}/day
                  </p>
                </div>
              </div>
            ))}
          </div>

          <h4 className="fw-bold mb-3">Incoming Rental Requests</h4>
          {incomingRentals.length === 0 ? (
            <div className="alert alert-info">No rental requests yet.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-success">
                  <tr>
                    <th>Equipment</th>
                    <th>Farmer</th>
                    <th>Dates</th>
                    <th>Cost</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {incomingRentals.map((r) => (
                    <tr key={r._id}>
                      <td>{r.equipment?.title}</td>
                      <td>
                        {r.farmer?.name}
                        <br />
                        <small className="text-muted">{r.farmer?.phone}</small>
                      </td>
                      <td>
                        {new Date(r.startDate).toLocaleDateString()} –{" "}
                        {new Date(r.endDate).toLocaleDateString()}
                      </td>
                      <td className="text-success fw-bold">₹{r.totalCost}</td>
                      <td>
                        <span className={`badge bg-${statusColor[r.status]}`}>
                          {r.status}
                        </span>
                      </td>
                      <td>
                        {r.status === "pending" && (
                          <div className="d-flex gap-1">
                            <button
                              className="btn btn-success btn-sm"
                              onClick={() =>
                                updateRentalStatus(r._id, "approved")
                              }
                            >
                              ✓
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                updateRentalStatus(r._id, "rejected")
                              }
                            >
                              ✗
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Labourer */}
      {user?.role === "labourer" && (
        <div className="alert alert-success">
          <h5>Your Profile</h5>
          <p>
            Create or update your labourer profile to be visible to farmers
            looking to hire.
          </p>
          <Link to="/labour/create" className="btn btn-success">
            Manage Profile
          </Link>
        </div>
      )}
    </div>
  );
}
