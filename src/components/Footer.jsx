import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">

        {/* LEFT */}
        <div className="footer-brand">
          <h2>Pamindu.dev</h2>

          <p>
            Frontend Developer focused on modern web
            applications, cybersecurity, and scalable
            user experiences.
          </p>
        </div>

        {/* CENTER */}
        <div className="footer-nav">
          <h4>Quick Links</h4>

          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>

        {/* RIGHT */}
        <div className="footer-socials">
          <a
            href="https://github.com/paminduekanayake10-ops"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/pamindu-ekanayake/"
            target="_blank"
            rel="noreferrer"
            aria-label="Linkedn"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://www.facebook.com/pamindu.ekanayake"
            target="_blank"
            rel="noreferrer"
            aria-label="Linkedn"
          >
            <FaFacebook />
          </a>       
          <a
            href="https://www.instagram.com/pmbekanayake/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instergram"
          >
            <FaInstagram />
          </a> 

        </div>
      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Pamindu.dev.
          All rights reserved.
        </p>

        <button
          className="scroll-top-btn"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
        >
          ↑ Top
        </button>
      </div>
    </footer>
  );
}

export default Footer;