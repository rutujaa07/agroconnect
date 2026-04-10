import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../api/axios";
import EquipmentCard from "../components/EquipmentCard";

export default function EquipmentList() {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setCategory(searchParams.get("category") || "");
  }, [searchParams]);

  useEffect(() => {
    fetchEquipment();
  }, [location, category]);

  const fetchEquipment = async () => {
    setLoading(true);
    try {
      const params = {};
      if (location) params.location = location;
      if (category) params.category = category;
      const { data } = await API.get("/equipment", { params });
      setEquipment(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-1">Find Equipment</h2>
      <p className="text-muted mb-4">
        Search available farming equipment near you
      </p>

      {/* Filters */}
      <div className="row g-3 mb-4">
        <div className="col-md-5">
          <input
            className="form-control form-control-lg"
            placeholder="🔍 Search by location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select form-select-lg"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {[
              "tractor",
              "harvester",
              "irrigation",
              "plough",
              "sprayer",
              "other",
            ].map((c) => (
              <option key={c} value={c}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <button
            className="btn btn-success btn-lg w-100 fw-bold"
            onClick={fetchEquipment}
          >
            Search
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div
            className="spinner-border text-success"
            style={{ width: "3rem", height: "3rem" }}
          />
          <p className="mt-3 text-muted">Loading equipment...</p>
        </div>
      ) : equipment.length === 0 ? (
        <div className="text-center py-5">
          <div style={{ fontSize: "4rem" }}>🔍</div>
          <h5>No equipment found</h5>
          <p className="text-muted">Try a different location or category</p>
        </div>
      ) : (
        <>
          <p className="text-muted mb-3">{equipment.length} results found</p>
          <div className="row g-4">
            {equipment.map((e) => (
              <div key={e._id} className="col-sm-6 col-lg-4 col-xl-3">
                <EquipmentCard equip={e} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
