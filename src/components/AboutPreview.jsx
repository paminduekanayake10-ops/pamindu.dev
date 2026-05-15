import { useEffect, useState } from "react";
import { getProjects } from "../services/projects"; // adjust path if needed
function AboutPreview() {
  const [projects, setProjects] = useState([]);

    useEffect(() => {
      loadProjects();
    }, []);

    const loadProjects = async () => {
      const data = await getProjects();
      setProjects(data);
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

          <button className="about-btn">
            More About Me
          </button>
        </div>

        <div className="about-card">
          <div className="stat">
            <h3>{projects.length}</h3>
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
