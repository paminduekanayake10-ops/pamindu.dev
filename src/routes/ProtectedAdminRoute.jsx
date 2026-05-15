import { Navigate } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";

function ProtectedAdminRoute({ user, children }) {
  const { isAdmin, loading } = useAdmin();

  if (loading) {
    return <h2>Checking access...</h2>;
  }

  // ❌ not logged in
  if (!user) {
    return <Navigate to="/admin-login" replace />;
  }

  // ❌ logged in but not admin
  if (!isAdmin) {
    return <h2>Access Denied 🚫</h2>;
  }

  // ✅ allowed
  return children;
}

export default ProtectedAdminRoute;