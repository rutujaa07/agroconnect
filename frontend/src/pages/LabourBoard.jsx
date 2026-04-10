import { useState, useEffect } from "react";
import API from "../api/axios";

export default function LabourBoard() {
  const [labourers, setLabourers] = useState([]);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLabourers();
  }, []);

  const fetchLabourers = async () => {
    setLoading(true);
    try {
      const params = location ? { location } : {};
      const { data } = await API.get("/labour", { params });
      setLabourers(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-1">💪 Hire Farm Labourers</h2>
      <p className="text-muted mb-4">
        Find skilled workers available in your area
      </p>
      <div className="row g-3 mb-4">
        <div className="col-md-8">
          <input
            className="form-control form-control-lg"
            placeholder="🔍 Search by location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <button
            className="btn btn-success btn-lg w-100 fw-bold"
            onClick={fetchLabourers}
          >
            Search
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-success" />
        </div>
      ) : labourers.length === 0 ? (
        <div className="text-center py-5">
          <div style={{ fontSize: "4rem" }}>👨‍🌾</div>
          <h5>No labourers found</h5>
          <p className="text-muted">Try a different location</p>
        </div>
      ) : (
        <div className="row g-4">
          {labourers.map((l) => (
            <div key={l._id} className="col-md-4 col-lg-3">
              <div
                className="card border-0 shadow-sm h-100"
                style={{ borderRadius: 16 }}
              >
                <div className="card-body text-center p-4">
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #1a5c2e, #4caf50)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "2.5rem",
                      margin: "0 auto 1rem",
                    }}
                  >
                    👤
                  </div>
                  <h6 className="fw-bold">{l.user?.name}</h6>
                  <p className="text-muted small mb-2">📍 {l.location}</p>
                  <div className="mb-2">
                    {l.skills?.map((s) => (
                      <span
                        key={s}
                        className="badge bg-success bg-opacity-10 text-success me-1 mb-1"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <p className="small text-muted mb-3">
                    {l.bio?.slice(0, 80)}...
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-success">
                      ₹{l.dailyRate}/day
                    </span>
                    <span
                      className={`badge ${
                        l.available ? "bg-success" : "bg-secondary"
                      }`}
                    >
                      {l.available ? "Available" : "Busy"}
                    </span>
                  </div>
                  <hr />
                  <p className="small mb-0">
                    📞 {l.user?.phone || "Contact via app"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
