import { Link } from "react-router-dom";

const features = [
  {
    icon: "🚜",
    title: "Rent Equipment",
    desc: "Find tractors, harvesters & more near you",
  },
  {
    icon: "👨‍🌾",
    title: "Hire Labourers",
    desc: "Connect with skilled farm workers instantly",
  },
  {
    icon: "💰",
    title: "Earn by Listing",
    desc: "Equipment owners can earn daily rental income",
  },
  {
    icon: "📍",
    title: "Location-Based",
    desc: "Search equipment available in your district",
  },
];

const equipTypes = [
  { name: "Tractor", icon: "🚜", count: "240+", cat: "tractor" },
  { name: "Harvester", icon: "🌾", count: "85+", cat: "harvester" },
  { name: "Irrigation", icon: "💧", count: "130+", cat: "irrigation" },
  { name: "Plough", icon: "⛏️", count: "95+", cat: "plough" },
  { name: "Sprayer", icon: "🌿", count: "60+", cat: "sprayer" },
  { name: "Others", icon: "🔧", count: "200+", cat: "other" },
];

const stats = [
  ["5,000+", "Farmers"],
  ["1,200+", "Equipment Listed"],
  ["800+", "Labourers"],
  ["50+", "Districts"],
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(135deg, #2c5f3a 0%, #4a8c5c 100%)",
          minHeight: "88vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="container text-center text-white py-5">
          <div
            className="d-inline-block mb-4 px-4 py-2 rounded-pill fw-semibold"
            style={{
              background: "rgba(255,255,255,0.15)",
              fontSize: "0.85rem",
            }}
          >
            🇮🇳 India's Farm Equipment Platform
          </div>

          <h1
            style={{
              fontSize: "clamp(2.2rem, 5.5vw, 4.5rem)",
              fontWeight: 700,
              lineHeight: 1.15,
            }}
          >
            Farm Smarter.
            <br />
            <span style={{ color: "#ffd166" }}>Rent Equipment</span>
            <br />
            Near You.
          </h1>

          <p
            className="mt-4 mb-5"
            style={{
              maxWidth: 520,
              margin: "1rem auto 2rem",
              opacity: 0.8,
              fontSize: "1rem",
            }}
          >
            Connect with local equipment owners and skilled farm labourers.
            Affordable. Reliable. Just one click away.
          </p>

          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link
              to="/equipment"
              className="btn btn-lg fw-semibold px-5 py-3"
              style={{
                background: "#f0a500",
                color: "#1a1a1a",
                border: "none",
                borderRadius: 8,
              }}
            >
              Browse Equipment →
            </Link>
            <Link
              to="/register"
              className="btn btn-lg px-5 py-3"
              style={{
                border: "1.5px solid rgba(255,255,255,0.55)",
                color: "white",
                background: "transparent",
                borderRadius: 8,
              }}
            >
              Join Free
            </Link>
          </div>

          {/* Stats */}
          <div className="row g-3 mt-5 justify-content-center">
            {stats.map(([num, label]) => (
              <div key={label} className="col-6 col-md-3">
                <div
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: 10,
                    padding: "0.9rem",
                  }}
                >
                  <div
                    style={{
                      fontSize: "1.8rem",
                      fontWeight: 700,
                      color: "#ffd166",
                    }}
                  >
                    {num}
                  </div>
                  <div style={{ fontSize: "0.8rem", opacity: 0.75 }}>
                    {label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
{/* sdfytsfus */}
      {/* Features */}
      <section className="py-5" style={{ background: "#f6f8f5" }}>
        <div className="container">
          <h2 className="text-center fw-bold mb-2">Why Choose AgroConnect?</h2>
          <p className="text-center text-muted mb-5">
            Everything you need for efficient farming
          </p>
          <div className="row g-4">
            {features.map((f) => (
              <div key={f.title} className="col-sm-6 col-lg-3">
                <div
                  className="card border-0 h-100 text-center p-4"
                  style={{
                    borderRadius: 14,
                    boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
                  }}
                >
                  <div style={{ fontSize: "2.5rem" }}>{f.icon}</div>
                  <h6 className="fw-bold mt-3 mb-1">{f.title}</h6>
                  <p className="text-muted small mb-0">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Categories */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-2">Browse by Category</h2>
          <p className="text-center text-muted mb-5">
            Thousands of listings across India
          </p>
          <div className="row g-3">
            {equipTypes.map((e) => (
              <div key={e.name} className="col-6 col-md-4 col-lg-2">
                <Link
                  to={`/equipment?category=${e.cat}`}
                  className="text-decoration-none"
                >
                  <div
                    className="card border text-center p-3 h-100"
                    style={{
                      borderRadius: 12,
                      transition: "all 0.18s",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#edf5ee";
                      e.currentTarget.style.borderColor = "#4a8c5c";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "white";
                      e.currentTarget.style.borderColor = "#dee2e6";
                    }}
                  >
                    <div style={{ fontSize: "2rem" }}>{e.icon}</div>
                    <div className="fw-semibold mt-2 small">{e.name}</div>
                    <small style={{ color: "#4a8c5c" }}>
                      {e.count} listings
                    </small>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-5" style={{ background: "#f6f8f5" }}>
        <div className="container">
          <h2 className="text-center fw-bold mb-2">How It Works</h2>
          <p className="text-center text-muted mb-5">
            Get started in 3 simple steps
          </p>
          <div className="row g-4 text-center">
            {[
              {
                step: "1",
                title: "Register",
                desc: "Create your free account as a Farmer, Owner, or Labourer",
              },
              {
                step: "2",
                title: "Search",
                desc: "Browse equipment or labourers available near your location",
              },
              {
                step: "3",
                title: "Connect & Rent",
                desc: "Send a booking request and start farming smarter",
              },
            ].map((s) => (
              <div key={s.step} className="col-md-4">
                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center fw-bold"
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: "#2c5f3a",
                    color: "white",
                    fontSize: "1.2rem",
                  }}
                >
                  {s.step}
                </div>
                <h6 className="fw-bold">{s.title}</h6>
                <p className="text-muted small">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{ background: "linear-gradient(135deg, #2c5f3a, #4a8c5c)" }}
        className="py-5 text-white text-center"
      >
        <div className="container">
          <h2 className="fw-bold mb-3">Own Farming Equipment?</h2>
          <p style={{ opacity: 0.8 }} className="mb-4">
            List your equipment and earn extra income when you're not using it.
          </p>
          <Link
            to="/register"
            className="btn btn-lg fw-semibold px-5"
            style={{
              background: "#f0a500",
              color: "#1a1a1a",
              border: "none",
              borderRadius: 8,
            }}
          >
            Start Earning Today →
          </Link>
        </div>
      </section>
    </div>
  );
}
