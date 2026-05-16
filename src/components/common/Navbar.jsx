import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const closeMenu = () => setMenuOpen(false);

  const handleNavClick = (sectionId) => (e) => {
    if (isHomePage) {
      // On home page, smooth scroll to section
      e.preventDefault();
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    closeMenu();
  };

  const handleHomeClick = () => {
    if (!isHomePage) {
      // Navigate to home page first, then after navigation scroll to top or target
      window.location.href = "/";
    }
    closeMenu();
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo-link" onClick={closeMenu}>
          <img src="/logo.png" alt="Pamindu Dev Logo" className="logo" />
        </Link>
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li>
          {isHomePage ? (
            <a href="#home" onClick={handleNavClick("home")}>Home</a>
          ) : (
            <Link to="/" onClick={closeMenu}>Home</Link>
          )}
        </li>
        <li>
          {isHomePage ? (
            <a href="#about" onClick={handleNavClick("about")}>About</a>
          ) : (
            <Link to="/about" onClick={closeMenu}>About</Link>
          )}
        </li>
        <li>
          {isHomePage ? (
            <a href="#skills" onClick={handleNavClick("skills")}>Skills</a>
          ) : (
            <Link to="/#skills" onClick={() => { closeMenu(); window.location.href = "/#skills"; }}>Skills</Link>
          )}
        </li>
        <li>
          {isHomePage ? (
            <a href="#projects" onClick={handleNavClick("projects")}>Projects</a>
          ) : (
            <Link to="/#projects" onClick={() => { closeMenu(); window.location.href = "/#projects"; }}>Projects</Link>
          )}
        </li>
        <li>
          {isHomePage ? (
            <a href="#certificates" onClick={handleNavClick("certificates")}>Certificates</a>
          ) : (
            <Link to="/#certificates" onClick={() => { closeMenu(); window.location.href = "/#certificates"; }}>Certificates</Link>
          )}
        </li>
        <li>
          {isHomePage ? (
            <a href="#contact" onClick={handleNavClick("contact")}>Contact</a>
          ) : (
            <Link to="/#contact" onClick={() => { closeMenu(); window.location.href = "/#contact"; }}>Contact</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;