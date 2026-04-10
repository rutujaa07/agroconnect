import { Link } from "react-router-dom";

export default function EquipmentCard({ equip }) {
  const categoryIcons = {
    tractor: "🚜",
    harvester: "🌾",
    irrigation: "💧",
    plough: "⛏️",
    sprayer: "🌿",
    other: "🔧",
  };

  return (
    <div
      className="card h-100 border-0 shadow-sm"
      style={{
        borderRadius: "12px",
        overflow: "hidden",
        transition: "transform 0.2s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-5px)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #e8f5e9, #c8e6c9)",
          height: "180px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "4rem",
        }}
      >
        {categoryIcons[equip.category] || "🔧"}
      </div>
      <div className="card-body">
        <span className="badge bg-success mb-2">{equip.category}</span>
        <h6 className="card-title fw-bold">{equip.title}</h6>
        <p className="text-muted small mb-1">📍 {equip.location}</p>
        <p className="text-muted small mb-2">
          {equip.description?.slice(0, 60)}...
        </p>
        <div className="d-flex justify-content-between align-items-center">
          <span className="fw-bold text-success fs-5">
            ₹{equip.pricePerDay}/day
          </span>
          <span
            className={`badge ${equip.available ? "bg-success" : "bg-danger"}`}
          >
            {equip.available ? "Available" : "Rented"}
          </span>
        </div>
      </div>
      <div className="card-footer bg-white border-0">
        <Link
          to={`/equipment/${equip._id}`}
          className="btn btn-outline-success w-100 btn-sm fw-bold"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
