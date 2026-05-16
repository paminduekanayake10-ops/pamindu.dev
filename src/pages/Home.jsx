// src/pages/Home.jsx

import Navbar from "../components/common/Navbar";
import Hero from "../components/home/Hero";
import AboutPreview from "../components/home/AboutPreview";
import Skills from "../components/home/Skills";
import Projects from "../components/home/Projects";
import Certificates from "../components/home/Certificates";
import Contact from "../components/home/Contact";
import Footer from "../components/common/Footer";
import "../styles/app.css";
import FullPageLoader from "../components/common/FullPageLoader";
import useScrollReveal from "../hooks/useScrollReveal";

function Home({ user, logout, darkMode, toggleTheme }) {
  useScrollReveal();
  return (
    <>
      <Navbar
        user={user}
        logout={logout}
      />

      <section id="home" className="section hero-section reveal">
        <Hero />
      </section>

      <section id="about" className="section about-section reveal">
        <AboutPreview />
      </section>

      <section id="skills" className="section skills-section reveal">
        <Skills />
      </section>

      <section id="projects" className="section projects-section reveal">
        <Projects />
      </section>

      <section id="certificates" className="section cert-section reveal">
        <Certificates />
      </section>

      <section id="contact" className="section contact-section reveal">
        <Contact />
      </section>

      <Footer />
    </>
  );
}

export default Home;