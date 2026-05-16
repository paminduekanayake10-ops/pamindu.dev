import { useState } from "react";

function Sidebar({ setTab, isOpen, setIsOpen }) {
  const [active, setActive] = useState("dashboard");

  const handleClick = (tab) => {
    setActive(tab);
    setTab(tab);
    setIsOpen(false); // close sidebar after selection on mobile
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />}

      {/* Sidebar panel */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2>Admin Panel⚡</h2>
          <button className="close-btn" onClick={() => setIsOpen(false)}>✕</button>
        </div>
        <nav className="sidebar-links">
          <button className={`sidebar-link ${active === "dashboard" ? "active" : ""}`} onClick={() => handleClick("dashboard")}>📊 Dashboard</button>
          <button className={`sidebar-link ${active === "projects" ? "active" : ""}`} onClick={() => handleClick("projects")}>📁 Projects</button>
          <button className={`sidebar-link ${active === "certificates" ? "active" : ""}`} onClick={() => handleClick("certificates")}>🎓 Certificates</button>
          <button className={`sidebar-link ${active === "messages" ? "active" : ""}`} onClick={() => handleClick("messages")}>✉️ Messages</button>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;