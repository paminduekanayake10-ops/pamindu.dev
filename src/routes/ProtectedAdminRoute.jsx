import { Navigate } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import FullPageLoader from "../components/common/FullPageLoader";

function ProtectedAdminRoute({ user, children }) {
  const { isAdmin, loading } = useAdmin();

  // Loading state – use FullPageLoader
  if (loading) {
    return <FullPageLoader message="Verifying access..." />;
  }

  // Not logged in – redirect to login
  if (!user) {
    return <Navigate to="/admin-login" replace />;
  }

  // Logged in but not admin – show access denied
  if (!isAdmin) {
    return (
      <div className="fullpage-loader" style={{ background: "rgba(0,0,0,0.9)" }}>
        <div style={{ color: "#ef4444", fontSize: "24px", marginBottom: "16px" }}>🚫</div>
        <h2>Access Denied</h2>
        <p>You do not have admin privileges.</p>
        <button
          onClick={() => window.location.href = "/"}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            background: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Return to Home
        </button>
      </div>
    );
  }

  // Allowed – render children
  return children;
}

export default ProtectedAdminRoute;