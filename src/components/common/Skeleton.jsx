// components/Skeleton.jsx
export const SkeletonText = ({ lines = 3, className = "" }) => (
  <div className={className}>
    {Array(lines).fill(0).map((_, i) => (
      <div key={i} className="skeleton skeleton-text" style={{ width: i === lines-1 ? "80%" : "100%" }} />
    ))}
  </div>
);

export const SkeletonTitle = () => (
  <div className="skeleton skeleton-title" />
);

export const SkeletonImage = () => (
  <div className="skeleton skeleton-image" />
);

export const SkeletonBadge = ({ count = 3 }) => (
  <div style={{ display: "flex", gap: "8px", margin: "12px 0" }}>
    {Array(count).fill(0).map((_, i) => (
      <div key={i} className="skeleton skeleton-badge" />
    ))}
  </div>
);

export const ProjectCardSkeleton = () => (
  <div className="project-card" style={{ padding: "0", overflow: "hidden" }}>
    <SkeletonImage />
    <div style={{ padding: "16px" }}>
      <SkeletonTitle />
      <SkeletonText lines={2} />
      <SkeletonBadge count={3} />
      <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
        <div className="skeleton" style={{ flex: 1, height: "36px", borderRadius: "10px" }} />
        <div className="skeleton" style={{ flex: 1, height: "36px", borderRadius: "10px" }} />
      </div>
    </div>
  </div>
);

export const CertificateCardSkeleton = () => (
  <div className="cert-card" style={{ padding: "0", overflow: "hidden" }}>
    <SkeletonImage />
    <div style={{ padding: "16px" }}>
      <SkeletonTitle />
      <div className="skeleton skeleton-text" style={{ width: "60%", marginBottom: "12px" }} />
      <SkeletonBadge count={2} />
      <div className="skeleton" style={{ height: "36px", borderRadius: "10px", marginTop: "12px" }} />
    </div>
  </div>
);

export const AboutStatSkeleton = () => (
  <div className="stat">
    <div className="skeleton" style={{ width: "50px", height: "40px", borderRadius: "8px", margin: "0 auto" }} />
    <p>Loading...</p>
  </div>
);

export const StatCardSkeleton = () => (
  <div style={styles.card}>
    <div className="skeleton" style={{ width: "80px", height: "20px", margin: "0 auto 12px" }} />
    <div className="skeleton" style={{ width: "60px", height: "36px", margin: "0 auto" }} />
  </div>
);

const styles = {
  card: {
    background: "#1e293b",
    padding: 20,
    borderRadius: 12,
    textAlign: "center",
  },
};