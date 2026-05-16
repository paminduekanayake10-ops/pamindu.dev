import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

function Topbar({ user, toggleSidebar }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/admin-login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="topbar">
      <div className="topbar-left">
        {/* Hamburger button (mobile only) */}
        <button className="sidebar-hamburger" onClick={toggleSidebar}>
          ☰
        </button>
        <h2>Admin Dashboard ⚡</h2>
        {/* Email and Logout now on the left side */}
        <div className="user-info">
          <span className="user-email">{user?.email}</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      {/* Right side can be empty or used for future items */}
      <div className="topbar-right"></div>
    </div>
  );
}

export default Topbar;