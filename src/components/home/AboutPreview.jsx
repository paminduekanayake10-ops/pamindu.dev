import { useEffect, useState } from "react";
import { getProjects } from "../../services/projects";
import { AboutStatSkeleton } from "../common/Skeleton";


function AboutPreview() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);  // ✅ add loading state
  const [error, setError] = useState("");        // optional error handling

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
      setLoading(false);  // ✅ always stop loading
    }
  };

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
          <button className="about-btn">
            More About Me
          </button>
          </a>
        </div>

        <div className="about-card">
          <div className="stat">
            {loading ? (
              <AboutStatSkeleton />
            ) : error ? (
              <h3 style={{ color: "#ef4444", fontSize: "1rem" }}>Error</h3>
            ) : (
              <h3>{projects.length}</h3>
            )}
            <p>Projects</p>
          </div>

          <div className="stat">
            <h3>1+</h3>
            <p>Years Learning</p>
          </div>

          <div className="stat">
            <h3>3</h3>
            <p>Technologies Focus</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutPreview;