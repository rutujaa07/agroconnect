import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function LabourProfile() {
  const [form, setForm] = useState({
    skills: "",
    experience: "",
    dailyRate: "",
    location: "",
    bio: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        skills: form.skills.split(",").map((s) => s.trim()),
      };
      await API.post("/labour", payload);
      setMessage("✅ Profile created! You are now visible to farmers.");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.message || "Failed"));
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-7">
          <div
            className="card border-0 shadow-lg p-4"
            style={{ borderRadius: 20 }}
          >
            <h3 className="fw-bold mb-1">💪 Create Labourer Profile</h3>
            <p className="text-muted mb-4">
              Fill your details to be visible to farmers
            </p>
            {message && (
              <div
                className={`alert ${
                  message.startsWith("✅") ? "alert-success" : "alert-danger"
                }`}
              >
                {message}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label fw-semibold">
                    Skills (comma separated)
                  </label>
                  <input
                    className="form-control"
                    placeholder="e.g., Ploughing, Harvesting, Irrigation"
                    value={form.skills}
                    onChange={(e) =>
                      setForm({ ...form, skills: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Experience</label>
                  <input
                    className="form-control"
                    placeholder="e.g., 5 years"
                    value={form.experience}
                    onChange={(e) =>
                      setForm({ ...form, experience: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Daily Rate (₹)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="e.g., 500"
                    value={form.dailyRate}
                    onChange={(e) =>
                      setForm({ ...form, dailyRate: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="form-label fw-semibold">Location</label>
                  <input
                    className="form-control"
                    placeholder="e.g., Nashik, Maharashtra"
                    value={form.location}
                    onChange={(e) =>
                      setForm({ ...form, location: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="form-label fw-semibold">Bio</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    placeholder="Tell farmers about yourself and your work..."
                    value={form.bio}
                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-success btn-lg w-100 fw-bold mt-4"
              >
                Create Profile →
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
