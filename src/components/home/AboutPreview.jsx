import { useEffect, useState } from "react";
import { getProjects } from "../../services/projects";
import { AboutStatSkeleton } from "../common/Skeleton";
import { FaProjectDiagram, FaCalendarAlt, FaCode } from "react-icons/fa";

function AboutPreview() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const statItems = [
    {
      id: 1,
      value: projects.length,
      label: "Projects Completed",
      icon: <FaProjectDiagram />,
      color: "#3b82f6",
    },
    {
      id: 2,
      value: "1+",
      label: "Years Experience",
      icon: <FaCalendarAlt />,
      color: "#10b981",
    },
    {
      id: 3,
      value: "3",
      label: "Tech Stacks",
      icon: <FaCode />,
      color: "#8b5cf6",
    },
  ];

  return (
    <section className="about">
      <div className="about-container">
        <div className="about-text">
          <h2>About Me</h2>
          <p>
            I am a passionate web developer focused on building modern React applications,
            exploring cybersecurity concepts, and learning AI technologies.
          </p>
          <p className="highlight">
            I enjoy creating clean, scalable, and user-friendly digital experiences.
          </p>
          <a href="/about">
            <button className="about-btn">More About Me</button>
          </a>
        </div>

        <div className="about-stats-grid">
          {loading ? (
            // Skeleton loaders for stats
            <>
              <AboutStatSkeleton />
              <AboutStatSkeleton />
              <AboutStatSkeleton />
            </>
          ) : error ? (
            <p className="error">Failed to load stats</p>
          ) : (
            statItems.map((stat) => (
              <div className="about-stat-card" key={stat.id}>
                <div className="stat-icon" style={{ backgroundColor: stat.color }}>
                  {stat.icon}
                </div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default AboutPreview;