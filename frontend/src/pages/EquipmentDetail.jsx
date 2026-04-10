import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

export default function EquipmentDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [equip, setEquip] = useState(null);
  const [booking, setBooking] = useState({ startDate: "", endDate: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    API.get(`/equipment/${id}`).then(({ data }) => setEquip(data));
  }, [id]);

  const handleBook = async (e) => {
    e.preventDefault();
    try {
      await API.post("/rentals", { equipmentId: id, ...booking });
      setMessage("✅ Booking request sent! Owner will confirm soon.");
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.message || "Booking failed"));
    }
  };

  if (!equip)
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-success" />
      </div>
    );

  const days =
    booking.startDate && booking.endDate
      ? Math.max(
          1,
          Math.ceil(
            (new Date(booking.endDate) - new Date(booking.startDate)) / 86400000
          )
        )
      : 0;

  return (
    <div className="container py-5">
      <div className="row g-5">
        <div className="col-md-6">
          <div
            style={{
              background: "linear-gradient(135deg, #e8f5e9, #c8e6c9)",
              borderRadius: 20,
              height: 320,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "8rem",
            }}
          >
            🚜
          </div>
          <div className="mt-4 p-4 bg-light rounded-3">
            <h6 className="fw-bold text-muted mb-3">OWNER DETAILS</h6>
            <p className="mb-1">👤 {equip.owner?.name}</p>
            <p className="mb-1">📞 {equip.owner?.phone || "Not provided"}</p>
            <p className="mb-0">📍 {equip.owner?.location}</p>
          </div>
        </div>
        <div className="col-md-6">
          <span className="badge bg-success mb-3 fs-6 px-3">
            {equip.category}
          </span>
          <h2 className="fw-bold">{equip.title}</h2>
          <p className="text-muted mb-3">📍 {equip.location}</p>
          <p className="mb-4">{equip.description}</p>
          <div className="d-flex gap-3 align-items-center mb-4">
            <span className="fs-3 fw-bold text-success">
              ₹{equip.pricePerDay}/day
            </span>
            <span
              className={`badge fs-6 ${
                equip.available ? "bg-success" : "bg-danger"
              }`}
            >
              {equip.available ? "✓ Available" : "✗ Not Available"}
            </span>
          </div>

          {user?.role === "farmer" && equip.available && (
            <div className="card border-success border-2">
              <div className="card-body">
                <h5 className="fw-bold mb-3">📅 Book This Equipment</h5>
                {message && (
                  <div
                    className={`alert ${
                      message.startsWith("✅")
                        ? "alert-success"
                        : "alert-danger"
                    }`}
                  >
                    {message}
                  </div>
                )}
                <form onSubmit={handleBook}>
                  <div className="row g-3">
                    <div className="col-6">
                      <label className="form-label fw-semibold">
                        Start Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        value={booking.startDate}
                        onChange={(e) =>
                          setBooking({ ...booking, startDate: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label fw-semibold">End Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={booking.endDate}
                        onChange={(e) =>
                          setBooking({ ...booking, endDate: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                  {days > 0 && (
                    <div className="alert alert-info mt-3 mb-0">
                      <strong>
                        {days} days × ₹{equip.pricePerDay} = ₹
                        {days * equip.pricePerDay}
                      </strong>
                    </div>
                  )}
                  <button
                    type="submit"
                    className="btn btn-success w-100 fw-bold mt-3"
                  >
                    Send Booking Request
                  </button>
                </form>
              </div>
            </div>
          )}
          {!user && (
            <div className="alert alert-warning">
              Please{" "}
              <a href="/login" className="fw-bold">
                login
              </a>{" "}
              as a Farmer to book this equipment.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
