// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import API from "../api/axios";

// export default function Register() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "farmer",
//     phone: "",
//     location: "",
//   });
//   const [error, setError] = useState("");
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const roles = [
//     { value: "farmer", label: "👨‍🌾 Farmer", desc: "Browse & rent equipment" },
//     {
//       value: "owner",
//       label: "🏭 Equipment Owner",
//       desc: "List & rent out equipment",
//     },
//     { value: "labourer", label: "💪 Labourer", desc: "Offer farming services" },
//   ];

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await API.post("/auth/register", form);
//       login(data);
//       navigate("/dashboard");
//     } catch (err) {
//       setError(err.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div
//       style={{ minHeight: "80vh", background: "#f1f8e9", padding: "2rem 0" }}
//     >
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="col-md-7">
//             <div
//               className="card border-0 shadow-lg p-4"
//               style={{ borderRadius: 20 }}
//             >
//               <div className="text-center mb-4">
//                 <div style={{ fontSize: "3rem" }}>🌱</div>
//                 <h3 className="fw-bold">Create Account</h3>
//                 <p className="text-muted">Join the AgroConnect community</p>
//               </div>
//               {error && <div className="alert alert-danger">{error}</div>}

//               {/* Role Selection */}
//               <label className="form-label fw-bold mb-2">I am a...</label>
//               <div className="row g-2 mb-4">
//                 {roles.map((r) => (
//                   <div key={r.value} className="col-md-4">
//                     <div
//                       className={`card cursor-pointer p-3 text-center ${
//                         form.role === r.value
//                           ? "border-success bg-success bg-opacity-10"
//                           : "border"
//                       }`}
//                       style={{ cursor: "pointer", borderRadius: 12 }}
//                       onClick={() => setForm({ ...form, role: r.value })}
//                     >
//                       <div>{r.label}</div>
//                       <small className="text-muted">{r.desc}</small>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <form onSubmit={handleSubmit}>
//                 <div className="row g-3">
//                   <div className="col-md-6">
//                     <label className="form-label fw-semibold">Full Name</label>
//                     <input
//                       className="form-control"
//                       placeholder="Ramesh Kumar"
//                       value={form.name}
//                       onChange={(e) =>
//                         setForm({ ...form, name: e.target.value })
//                       }
//                       required
//                     />
//                   </div>
//                   <div className="col-md-6">
//                     <label className="form-label fw-semibold">Email</label>
//                     <input
//                       type="email"
//                       className="form-control"
//                       placeholder="you@example.com"
//                       value={form.email}
//                       onChange={(e) =>
//                         setForm({ ...form, email: e.target.value })
//                       }
//                       required
//                     />
//                   </div>
//                   <div className="col-md-6">
//                     <label className="form-label fw-semibold">Phone</label>
//                     <input
//                       className="form-control"
//                       placeholder="+91 98765 43210"
//                       value={form.phone}
//                       onChange={(e) =>
//                         setForm({ ...form, phone: e.target.value })
//                       }
//                     />
//                   </div>
//                   <div className="col-md-6">
//                     <label className="form-label fw-semibold">
//                       Location (District)
//                     </label>
//                     <input
//                       className="form-control"
//                       placeholder="Pune, Maharashtra"
//                       value={form.location}
//                       onChange={(e) =>
//                         setForm({ ...form, location: e.target.value })
//                       }
//                     />
//                   </div>
//                   <div className="col-12">
//                     <label className="form-label fw-semibold">Password</label>
//                     <input
//                       type="password"
//                       className="form-control"
//                       placeholder="Min 6 characters"
//                       value={form.password}
//                       onChange={(e) =>
//                         setForm({ ...form, password: e.target.value })
//                       }
//                       required
//                     />
//                   </div>
//                 </div>
//                 <button
//                   type="submit"
//                   className="btn btn-success btn-lg w-100 fw-bold mt-4"
//                 >
//                   Create Account →
//                 </button>
//               </form>
//               <p className="text-center mt-3 text-muted small">
//                 Already have an account?{" "}
//                 <Link to="/login" className="text-success fw-bold">
//                   Login
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "farmer",
    phone: "",
    location: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const roles = [
    { value: "farmer", label: "👨‍🌾 Farmer", desc: "Browse & rent equipment" },
    {
      value: "owner",
      label: "🏭 Equipment Owner",
      desc: "List & rent out equipment",
    },
    { value: "labourer", label: "💪 Labourer", desc: "Offer farming services" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log("Sending data:", form); // 👈 debug

      const res = await API.post("/auth/register", form);

      console.log("Response:", res.data); // 👈 debug

      login(res.data);
      navigate("/dashboard");
    } catch (err) {
      console.log("ERROR:", err); // 👈 IMPORTANT

      setError(
        err.response?.data?.message || err.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ minHeight: "80vh", background: "#f1f8e9", padding: "2rem 0" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7">
            <div
              className="card border-0 shadow-lg p-4"
              style={{ borderRadius: 20 }}
            >
              <div className="text-center mb-4">
                <div style={{ fontSize: "3rem" }}>🌱</div>
                <h3 className="fw-bold">Create Account</h3>
                <p className="text-muted">Join the AgroConnect community</p>
              </div>

              {error && <div className="alert alert-danger">{error}</div>}

              {/* Role Selection */}
              <label className="form-label fw-bold mb-2">I am a...</label>
              <div className="row g-2 mb-4">
                {roles.map((r) => (
                  <div key={r.value} className="col-md-4">
                    <div
                      className={`card p-3 text-center ${
                        form.role === r.value
                          ? "border-success bg-success bg-opacity-10"
                          : "border"
                      }`}
                      style={{ cursor: "pointer", borderRadius: 12 }}
                      onClick={() => setForm({ ...form, role: r.value })}
                    >
                      <div>{r.label}</div>
                      <small className="text-muted">{r.desc}</small>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Full Name</label>
                    <input
                      className="form-control"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Phone</label>
                    <input
                      className="form-control"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Location</label>
                    <input
                      className="form-control"
                      value={form.location}
                      onChange={(e) =>
                        setForm({ ...form, location: e.target.value })
                      }
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={form.password}
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-success btn-lg w-100 fw-bold mt-4"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Account →"}
                </button>
              </form>

              <p className="text-center mt-3 text-muted small">
                Already have an account?{" "}
                <Link to="/login" className="text-success fw-bold">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
