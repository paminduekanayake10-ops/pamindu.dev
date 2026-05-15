import { useEffect, useState } from "react";
import { getProjects } from "../../services/projects";
import { getCertificates } from "../../services/certificates";
import StatCard from "../../components/admin/StatCard";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("dashboard");

  const handleClick = (section) => {
    setActive(section);
  };
  
  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);

    const p = await getProjects();
    const c = await getCertificates();

    setProjects(p);
    setCerts(c);

    setLoading(false);
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        Loading dashboard...
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Dashboard Overview ⚡</h1>

      <div style={styles.grid}>
        <StatCard title="Projects" value={projects.length} />
        <StatCard title="Certificates" value={certs.length} />
        <StatCard title="Status" value="Online 🚀" />
      </div>

      <div style={styles.infoBox}>
        <h3 style={styles.infoTitle}>System Info</h3>
        <p>Total Projects: {projects.length}</p>
        <p>Total Certificates: {certs.length}</p>
        <p>System Status: Active</p>
      </div>
    </div>
  );
}
const styles = {
  container: {
    padding: "25px",
    background: "#0f172a",
    minHeight: "100vh",
    color: "white",
    fontFamily: "Arial",
  },

  title: {
    fontSize: "26px",
    marginBottom: "20px",
    fontWeight: "bold",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
  },

  infoBox: {
    marginTop: "25px",
    background: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #334155",
  },

  infoTitle: {
    marginBottom: "10px",
    fontSize: "18px",
  },

  loading: {
    padding: "40px",
    textAlign: "center",
    color: "#94a3b8",
    fontSize: "16px",
  },
};
export default Dashboard;