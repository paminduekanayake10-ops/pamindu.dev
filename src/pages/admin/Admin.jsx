import { useState } from "react";
import useAdmin from "../../hooks/useAdmin";
import Sidebar from "../../components/admin/Sidebar";
import Topbar from "../../components/admin/Topbar";
import Dashboard from "./Dashboard";
import Projects from "./Projects";
import Certificates from "./Certificates";
import Messages from "./Messages";
import useAutoLogout from "../../hooks/useAutoLogout";
import FullPageLoader from "../../components/common/FullPageLoader";

function Admin({ user, logout }) {
  const { isAdmin, loading } = useAdmin();
  const [tab, setTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useAutoLogout();

  if (loading) return <FullPageLoader message="Loading admin panel..." />;
  if (!isAdmin) return <FullPageLoader message="Access Denied" error />;

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const renderPage = () => {
    switch (tab) {
      case "projects": return <Projects />;
      case "certificates": return <Certificates />;
      case "messages": return <Messages />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar setTab={setTab} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="admin-main">
        <Topbar user={user} logout={logout} toggleSidebar={toggleSidebar} />
        <div className="admin-content">{renderPage()}</div>
      </div>
    </div>
  );
}

export default Admin;