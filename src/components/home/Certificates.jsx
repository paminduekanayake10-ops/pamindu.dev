import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

function Certificates() {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    loadCerts();
  }, []);

  const loadCerts = async () => {
    try {
      console.log("Fetching certificates from Firestore...");
      const querySnapshot = await getDocs(collection(db, "certificates"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Certificates fetched:", data);

      // Sort by date (newest first)
      const sorted = data.sort((a, b) => {
        const aTime = a.createdAt?.seconds || a.createdAt || 0;
        const bTime = b.createdAt?.seconds || b.createdAt || 0;
        return bTime - aTime;
      });

      setCerts(sorted);
    } catch (err) {
      console.error("Firestore error:", err);
      setError("Failed to load certificates. Check console.");
    } finally {
      setLoading(false);
    }
  };

  // Show only the latest 2 certificates
  const latestCerts = certs.slice(0, 2);

  const fallbackImage =
    "https://via.placeholder.com/600x400?text=Certificate";

  return (
    <section className="cert-section">
      {/* HEADER */}
      <div className="cert-header">
        <h2>Certificates 🎓</h2>
        <button className="view-more-btn" onClick={() => navigate("/certificates")}>
          View All →
        </button>
      </div>

      {/* LOADING */}
      {loading && <p className="message">Loading certificates...</p>}

      {/* ERROR */}
      {error && <p className="error">{error}</p>}

      {/* EMPTY */}
      {!loading && latestCerts.length === 0 && !error && (
        <p className="message">No certificates found.</p>
      )}

      {/* GRID */}
      {!loading && latestCerts.length > 0 && (
        <div className="cert-grid">
          {latestCerts.map((c) => (
            <div className="cert-card" key={c.id}>
              {/* IMAGE */}
              <div className="cert-image">
                <img
                  src={c.image || fallbackImage}
                  alt={c.title || "Certificate"}
                  onError={(e) => {
                    e.target.src = fallbackImage;
                  }}
                />
                {c.year && <span className="cert-year-badge">{c.year}</span>}
              </div>

              {/* CONTENT */}
              <div className="cert-content">
                <h3>{c.title || "Untitled Certificate"}</h3>
                <p className="cert-issuer">{c.issuer || "Unknown Issuer"}</p>

                {c.description && <p className="cert-description">{c.description}</p>}

                {/* SKILLS */}
                <div className="cert-tags">
                  {Array.isArray(c.skills) &&
                    c.skills.map((skill, i) => (
                      <span key={i} className="cert-tag">
                        {skill}
                      </span>
                    ))}
                </div>

                {/* BUTTON */}
                {(c.credentialUrl || c.link) && (
                  <a
                    href={c.credentialUrl || c.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-btn"
                  >
                    View Certificate
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Certificates;