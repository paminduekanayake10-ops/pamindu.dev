import { useState } from "react";
import useAdmin from "../hooks/useAdmin";

import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";

import Dashboard from "./admin/Dashboard";
import Projects from "./admin/Projects";
import Certificates from "./admin/Certificates";
import Messages from "./admin/Messages";

import useAutoLogout from "../hooks/useAutoLogout";

function Admin({ user, logout }) {
  const { isAdmin, loading } = useAdmin();
  const [tab, setTab] = useState("dashboard");
  useAutoLogout();
  if (loading) return <h2>Loading...</h2>;
  if (!isAdmin) return <h2>Access Denied 🚫</h2>;

  const renderPage = () => {
    switch (tab) {
      case "projects":
        return <Projects />;
      case "certificates":
        return <Certificates />;
      case "messages":
        return <Messages />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar setTab={setTab} />

      <div className="admin-main">
        <Topbar user={user} logout={logout} />

        <div className="admin-content">
          {renderPage()}
        </div>
      </div>
    </div>
  );
}

export default Admin;