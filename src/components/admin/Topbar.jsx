import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useNavigate } from "react-router-dom";

function Topbar({ user }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);     // Firebase logout
      navigate("/admin-login"); // redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="topbar">
      <div className="topbar-left">
        <h2>Admin Dashboard ⚡</h2>
      </div>

      <div className="topbar-right">
        <span className="user-email">{user?.email}</span>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Topbar;