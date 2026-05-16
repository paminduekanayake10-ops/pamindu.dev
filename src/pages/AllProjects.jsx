import { useEffect, useState } from "react";
import { getProjects } from "../services/projects";
import { ProjectCardSkeleton } from "../components/common/Skeleton";

function AllProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const data = await getProjects();

    const sorted = data.sort(
      (a, b) =>
        (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
    );

    setProjects(sorted);
    setLoading(false);
  };

  const fallbackImage =
    "https://via.placeholder.com/600x400?text=No+Image";

  return (
    <section className="projects-section">
      <h2>All Projects</h2>

      {loading ? (
        <div className="projects-grid loading-skeleton">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <div className="project-card" key={project.id}>
              {/* SAFE IMAGE */}
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
                  {project.tags?.map((tag, i) => (
                    <span key={i} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="links">
                  {project.github && (
                    <a className="btn github-btn" href={project.github}>
                      GitHub
                    </a>
                  )}

                  {project.live && (
                    <a className="btn live-btn" href={project.live}>
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default AllProjects;