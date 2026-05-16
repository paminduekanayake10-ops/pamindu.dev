import { useEffect, useState } from "react";
import { FaDownload, FaEnvelope, FaMapMarkerAlt, FaCode, FaReact, FaShieldAlt } from "react-icons/fa";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import useScrollReveal from "../hooks/useScrollReveal";
import { useNavigate } from "react-router-dom";


function About() {
  useScrollReveal();

  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const navigate = useNavigate();

  const handleContact = () => {
    navigate("/");
     setTimeout(() => {
      const contactSection = document.getElementById("contact");
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" });
      }
      }, 100);
  };
  const handleDownloadCV = () => {
    // Replace with your actual CV file path
    const cvUrl = "/Pamindu_Ekanayake_CV.pdf";
    const link = document.createElement("a");
    link.href = cvUrl;
    link.download = "Pamindu_Ekanayake_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Navbar />
      <main className="about-page">
        {/* Hero Section */}
        <section className="about-hero reveal">
          <div className="about-hero-content">
            <div className="about-hero-text">
              <h1>About Me</h1>
              <p className="tagline">Frontend Developer • Cybersecurity Enthusiast • UI/UX Learner</p>
              <div className="hero-buttons">
                <button className="btn-primary" onClick={handleDownloadCV}>
                  <FaDownload /> Download CV
                </button>
                <button className="btn-secondary" onClick={handleContact}>Contact Me</button>
              </div>
            </div>
            <div className="about-hero-image">
              <img src="/profile.jpg" alt="Pamindu Ekanayake" className="profile-img" />
            </div>
          </div>
        </section>

        {/* Biography & Details */}
        <section className="about-bio reveal">
          <div className="container">
            <div className="bio-grid">
              <div className="bio-text">
                <h2>Who Am I?</h2>
                <p>
                  I'm Pamindu, a passionate frontend developer with a strong interest in cybersecurity and AI.
                  I build modern web applications that are not only functional but also secure and user‑friendly.
                </p>
                <p>
                  With 1+ years of hands‑on experience, I've worked on various projects ranging from e‑commerce
                  platforms to admin dashboards, always focusing on clean code and performance.
                </p>
                <p>
                  I believe in continuous learning and enjoy sharing knowledge with the developer community.
                </p>
              </div>
              <div className="bio-details">
                <h2>Personal Info</h2>
                <ul className="details-list">
                  <li><span>Name:</span> Pamindu Ekanayake</li>
                  <li><span>Email:</span> pamindu@example.com</li>
                  <li><span>Location:</span> Colombo, Sri Lanka</li>
                  <li><span>Freelance:</span> Available</li>
                </ul>
                <div className="social-links">
                  <a href="https://github.com/paminduekanayake10-ops" target="_blank" rel="noreferrer">GitHub</a>
                  <a href="https://www.linkedin.com/in/pamindu-ekanayake/" target="_blank" rel="noreferrer">LinkedIn</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Highlights */}
        <section className="about-skills reveal">
          <div className="container">
            <h2>Core Competencies</h2>
            <div className="skills-highlight-grid">
              <div className="skill-highlight">
                <FaCode className="skill-icon" />
                <h3>Frontend</h3>
                <p>React, Tailwind, JavaScript, HTML/CSS</p>
              </div>
              <div className="skill-highlight">
                <FaReact className="skill-icon" />
                <h3>Backend & DB</h3>
                <p>Firebase, Node.js, MongoDB, Firestore</p>
              </div>
              <div className="skill-highlight">
                <FaShieldAlt className="skill-icon" />
                <h3>Cybersecurity</h3>
                <p>Linux, Network Security, Ethical Hacking</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="about-cta reveal">
          <div className="container">
            <h2>Let’s Work Together</h2>
            <p>I'm always open to discussing new projects, creative ideas, or opportunities.</p>
            <button className="btn-secondary" onClick={handleContact}>Get in touch</button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default About;