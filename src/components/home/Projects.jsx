import { useEffect, useState } from "react";
import { getProjects } from "../../services/projects";
import { useNavigate } from "react-router-dom";
import { ProjectCardSkeleton } from "../common/Skeleton";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);

      const data = await getProjects();

      const sorted = data.sort(
        (a, b) =>
          (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
      );

      setProjects(sorted);
    } catch (err) {
      setError("Failed to load projects.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const latestProjects = projects.slice(0, 2);

  const fallbackImage =
    "https://via.placeholder.com/600x400?text=No+Image";

  return (
    <section className="projects-section">
      <div className="projects-header">
        <h2>My Projects</h2>

        <button
          className="view-more-btn"
          onClick={() => navigate("/projects")}
        >
          View All →
        </button>
      </div>

      {loading && (
          <div className="skeleton-wrapper">
            <div className="projects-grid">
              {[1, 2].map(i => <ProjectCardSkeleton key={i} />)}
            </div>
          </div>
        )}
      {error && <p className="error">{error}</p>}
      {!loading && projects.length === 0 && (
        <p className="message">
          No projects found.
        </p>
      )}

      <div className="projects-grid">
        {latestProjects.map((project) => (
          <div className="project-card" key={project.id}>
            
            {/* IMAGE SAFE RENDER */}
            <div className="project-image">
              <img
                src={project.image || fallbackImage}
                alt={project.title || "Project"}
                onError={(e) => {
                  e.target.src = fallbackImage;
                }}
              />
            </div>

            <div className="project-content">
              <h3>{project.title || "Untitled Project"}</h3>
              <p>{project.description || "No description available."}</p>

              <div className="tags">
                {Array.isArray(project.tags) &&
                  project.tags.map((tag, i) => (
                    <span key={i} className="tag">
                      {tag}
                    </span>
                  ))}
              </div>

              <div className="links">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn github-btn"
                  >
                    GitHub
                  </a>
                )}

                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn live-btn"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;