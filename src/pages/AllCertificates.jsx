import { useEffect, useState } from "react";
import { getCertificates } from "../services/Certificates";

function AllCertificates() {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCerts();
  }, []);

  const loadCerts = async () => {
    const data = await getCertificates();

    const sorted = data.sort(
      (a, b) =>
        (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
    );

    setCerts(sorted);
    setLoading(false);
  };

  const fallbackImage =
    "https://via.placeholder.com/600x400?text=No+Certificate+Image";

  return (
    <section className="cert-section">
      <h2>All Certificates 🎓</h2>

      {loading && <p className="message">Loading...</p>}

      <div className="cert-grid">
        {certs.map((c) => (
          <div className="cert-card" key={c.id}>

            <div className="cert-image">
              <img
                src={c.image || fallbackImage}
                alt={c.title}
                onError={(e) => {
                  e.target.src = fallbackImage;
                }}
              />

              {c.year && (
                <span className="cert-year-badge">
                  {c.year}
                </span>
              )}
            </div>

            <div className="cert-content">
              <h3>{c.title}</h3>
              <p className="cert-issuer">{c.issuer}</p>

              <div className="cert-tags">
                {c.skills?.map((tag, i) => (
                  <span key={i} className="cert-tag">
                    {tag}
                  </span>
                ))}
              </div>

              {c.link && (
                <a
                  href={c.link}
                  target="_blank"
                  className="btn cert-btn"
                >
                  View Certificate
                </a>
              )}
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}

export default AllCertificates;