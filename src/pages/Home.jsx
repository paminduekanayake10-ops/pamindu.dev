// src/pages/Home.jsx

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AboutPreview from "../components/AboutPreview";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Certificates from "../components/Certificates";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

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