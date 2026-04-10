import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      style={{ background: "#0f3d1f", color: "#ccc" }}
      className="pt-5 pb-3 mt-5"
    >
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <h5 className="text-white fw-bold">🌾 AgroConnect</h5>
            <p className="small">
              Connecting farmers, equipment owners, and labourers across India
              for a better harvest.
            </p>
          </div>
          <div className="col-md-4">
            <h6 className="text-white">Quick Links</h6>
            <ul className="list-unstyled small">
              <li>
                <Link to="/" className="text-secondary text-decoration-none">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/equipment"
                  className="text-secondary text-decoration-none"
                >
                  Equipment
                </Link>
              </li>
              <li>
                <Link
                  to="/labour"
                  className="text-secondary text-decoration-none"
                >
                  Labourers
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-secondary text-decoration-none"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h6 className="text-white">Contact</h6>
            <p className="small">📧 support@agroconnect.in</p>
            <p className="small">📞 1800-AGRO-123</p>
          </div>
        </div>
        <hr style={{ borderColor: "#2d5a3d" }} />
        <p className="text-center small mb-0">
          © 2024 AgroConnect. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
