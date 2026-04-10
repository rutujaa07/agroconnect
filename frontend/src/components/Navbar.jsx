import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top"
      style={{
        background: "#2c5f3a",
        boxShadow: "0 1px 8px rgba(0,0,0,0.15)",
      }}
    >
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand fw-semibold text-white fs-5" to="/">
          🌾 AgroConnect
        </Link>

        {/* Hamburger for mobile */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span
            className="navbar-toggler-icon"
            style={{ filter: "invert(1)" }}
          />
        </button>

        {/* Nav links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-1 py-2 py-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link text-white px-3"
                style={{ opacity: 0.85, fontSize: "0.9rem" }}
                to="/equipment"
              >
                Equipment
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-white px-3"
                style={{ opacity: 0.85, fontSize: "0.9rem" }}
                to="/labour"
              >
                Labourers
              </Link>
            </li>

            {user ? (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link text-white px-3"
                    style={{ opacity: 0.85, fontSize: "0.9rem" }}
                    to="/dashboard"
                  >
                    Dashboard
                  </Link>
                </li>

                {/* Owner: Add Equipment shortcut */}
                {user.role === "owner" && (
                  <li className="nav-item">
                    <Link
                      className="nav-link text-white px-3"
                      style={{ opacity: 0.85, fontSize: "0.9rem" }}
                      to="/add-equipment"
                    >
                      + List Equipment
                    </Link>
                  </li>
                )}

                {/* Labourer: Profile shortcut */}
                {user.role === "labourer" && (
                  <li className="nav-item">
                    <Link
                      className="nav-link text-white px-3"
                      style={{ opacity: 0.85, fontSize: "0.9rem" }}
                      to="/labour/create"
                    >
                      My Profile
                    </Link>
                  </li>
                )}

                {/* Admin link */}
                {user.role === "admin" && (
                  <li className="nav-item">
                    <Link
                      className="nav-link px-3 fw-semibold"
                      style={{ color: "#ffd166", fontSize: "0.9rem" }}
                      to="/admin"
                    >
                      Admin Panel
                    </Link>
                  </li>
                )}

                {/* User badge */}
                <li className="nav-item mx-1">
                  <span
                    className="badge px-3 py-2"
                    style={{
                      background: "#f0a500",
                      color: "#1a1a1a",
                      fontWeight: 500,
                      fontSize: "0.8rem",
                      borderRadius: 20,
                    }}
                  >
                    {user.name} · {user.role}
                  </span>
                </li>

                {/* Logout */}
                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="btn btn-sm"
                    style={{
                      border: "1px solid rgba(255,255,255,0.45)",
                      color: "white",
                      background: "transparent",
                      fontSize: "0.85rem",
                      padding: "5px 14px",
                      borderRadius: 6,
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className="btn btn-sm"
                    to="/login"
                    style={{
                      border: "1px solid rgba(255,255,255,0.45)",
                      color: "white",
                      background: "transparent",
                      fontSize: "0.85rem",
                      padding: "5px 14px",
                      borderRadius: 6,
                    }}
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="btn btn-sm fw-semibold"
                    to="/register"
                    style={{
                      background: "#f0a500",
                      color: "#1a1a1a",
                      border: "none",
                      fontSize: "0.85rem",
                      padding: "5px 14px",
                      borderRadius: 6,
                    }}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
