// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api/axios";

// export default function AddEquipment() {
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     category: "tractor",
//     pricePerDay: "",
//     location: "",
//     imageUrl: "",
//   });
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await API.post("/equipment", form);
//       setMessage("✅ Equipment listed successfully!");
//       setTimeout(() => navigate("/dashboard"), 1500);
//     } catch (err) {
//       setMessage("❌ " + (err.response?.data?.message || "Failed"));
//     }
//   };

//   return (
//     <div className="container py-5">
//       <div className="row justify-content-center">
//         <div className="col-md-7">
//           <div
//             className="card border-0 shadow-lg p-4"
//             style={{ borderRadius: 20 }}
//           >
//             <h3 className="fw-bold mb-1">🚜 Add Equipment Listing</h3>
//             <p className="text-muted mb-4">
//               Fill details to list your equipment for rent
//             </p>
//             {message && (
//               <div
//                 className={`alert ${
//                   message.startsWith("✅") ? "alert-success" : "alert-danger"
//                 }`}
//               >
//                 {message}
//               </div>
//             )}
//             <form onSubmit={handleSubmit}>
//               <div className="row g-3">
//                 <div className="col-12">
//                   <label className="form-label fw-semibold">
//                     Equipment Title
//                   </label>
//                   <input
//                     className="form-control"
//                     placeholder="e.g., John Deere Tractor 5050D"
//                     value={form.title}
//                     onChange={(e) =>
//                       setForm({ ...form, title: e.target.value })
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label fw-semibold">Category</label>
//                   <select
//                     className="form-select"
//                     value={form.category}
//                     onChange={(e) =>
//                       setForm({ ...form, category: e.target.value })
//                     }
//                   >
//                     {[
//                       "tractor",
//                       "harvester",
//                       "irrigation",
//                       "plough",
//                       "sprayer",
//                       "other",
//                     ].map((c) => (
//                       <option key={c} value={c}>
//                         {c.charAt(0).toUpperCase() + c.slice(1)}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label fw-semibold">
//                     Price Per Day (₹)
//                   </label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     placeholder="e.g., 2500"
//                     value={form.pricePerDay}
//                     onChange={(e) =>
//                       setForm({ ...form, pricePerDay: e.target.value })
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="col-12">
//                   <label className="form-label fw-semibold">Location</label>
//                   <input
//                     className="form-control"
//                     placeholder="e.g., Pune, Maharashtra"
//                     value={form.location}
//                     onChange={(e) =>
//                       setForm({ ...form, location: e.target.value })
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="col-12">
//                   <label className="form-label fw-semibold">Description</label>
//                   <textarea
//                     className="form-control"
//                     rows={4}
//                     placeholder="Describe condition, features, and any usage instructions..."
//                     value={form.description}
//                     onChange={(e) =>
//                       setForm({ ...form, description: e.target.value })
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="col-12">
//                   <label className="form-label fw-semibold">
//                     Image URL (optional)
//                   </label>
//                   <input
//                     className="form-control"
//                     placeholder="https://..."
//                     value={form.imageUrl}
//                     onChange={(e) =>
//                       setForm({ ...form, imageUrl: e.target.value })
//                     }
//                   />
//                 </div>
//               </div>
//               <button
//                 type="submit"
//                 className="btn btn-success btn-lg w-100 fw-bold mt-4"
//               >
//                 List Equipment →
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function AddEquipment() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "tractor",
    pricePerDay: "",
    location: "",
    imageUrl: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/equipment", form);
      setMessage("✅ Equipment listed successfully!");
      setTimeout(() => navigate("/dashboard"), 1500);
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
            <h3 className="fw-bold mb-1">🚜 Add Equipment Listing</h3>
            <p className="text-muted mb-4">
              Fill details to list your equipment for rent
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
                    Equipment Title
                  </label>
                  <input
                    className="form-control"
                    placeholder="e.g., John Deere Tractor 5050D"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Category</label>
                  <select
                    className="form-select"
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                  >
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
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Price Per Day (₹)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="e.g., 2500"
                    value={form.pricePerDay}
                    onChange={(e) =>
                      setForm({ ...form, pricePerDay: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="form-label fw-semibold">Location</label>
                  <input
                    className="form-control"
                    placeholder="e.g., Pune, Maharashtra"
                    value={form.location}
                    onChange={(e) =>
                      setForm({ ...form, location: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="form-label fw-semibold">Description</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    placeholder="Describe condition, features, and any usage instructions..."
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="form-label fw-semibold">
                    Image URL (optional)
                  </label>
                  <input
                    className="form-control"
                    placeholder="https://..."
                    value={form.imageUrl}
                    onChange={(e) =>
                      setForm({ ...form, imageUrl: e.target.value })
                    }
                  />
                  {form.imageUrl && (
                    <div className="mt-2">
                      <img
                        src={form.imageUrl}
                        alt="Equipment preview"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "block";
                        }}
                        onLoad={(e) => {
                          e.target.style.display = "block";
                          e.target.nextSibling.style.display = "none";
                        }}
                        style={{
                          width: "100%",
                          maxHeight: 220,
                          objectFit: "cover",
                          borderRadius: 10,
                          border: "1px solid #dee2e6",
                          display: "none",
                        }}
                      />
                      <p
                        className="text-danger small mt-1"
                        style={{ display: "none" }}
                      >
                        ⚠️ Could not load image. Please check the URL.
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-success btn-lg w-100 fw-bold mt-4"
              >
                List Equipment →
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}