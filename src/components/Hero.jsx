import { useEffect, useState } from "react";

function Hero() {
  const texts = [
    "Full-stack Developer",
    "React Developer",
    "Cybersecurity Enthusiast",
    "UI/UX Learner",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      <div className="hero-content">

        <p className="hero-sub">Hi, I'm</p>
        <h1 className="hero-title">Pamindu</h1>

        <h2 className="hero-role">
          {texts[index]}
        </h2>

        <p className="hero-desc">
          I build modern web applications using React, Firebase and explore cybersecurity concepts.
        </p>

        <div className="hero-buttons">

          <a href="#projects">
            <button className="btn-primary">
              View Projects
            </button>
          </a>

          <a href="#contact">
            <button className="btn-secondary">
              Contact Me
            </button>
          </a>

        </div>

      </div>

      <div className="hero-glow"></div>
    </section>
  );
}

export default Hero;