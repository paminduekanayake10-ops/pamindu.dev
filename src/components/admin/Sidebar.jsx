import { useState } from "react";

function Sidebar({ setTab }) {
  const [active, setActive] = useState("dashboard");

  const handleClick = (tab) => {
    setActive(tab);
    setTab(tab);
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Admin Panel ⚡</h2>

      <button
        className={`sidebar-btn ${active === "dashboard" ? "active" : ""}`}
        onClick={() => handleClick("dashboard")}
      >
        📊 Dashboard
      </button>

      <button
        className={`sidebar-btn ${active === "projects" ? "active" : ""}`}
        onClick={() => handleClick("projects")}
      >
        📁 Projects
      </button>

      <button
        className={`sidebar-btn ${active === "certificates" ? "active" : ""}`}
        onClick={() => handleClick("certificates")}
      >
        🎓 Certificates
      </button>
      <button
        className={`sidebar-btn ${active === "messages" ? "active" : ""}`}
        onClick={() => handleClick("messages")}
      >
        ✉️ Messages
      </button>
           
    </div>
  );
}

export default Sidebar;