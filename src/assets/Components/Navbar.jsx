import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  const navigate = useNavigate();

  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  return (
    <header className="site-header" id="home">
      <div className="nav-inner">
        {/* Brand */}
        <div className="brand" onClick={() => navigate("/")}>
          <img src={logo} alt="CamPrint Logo" className="logo-img" />
          <span>CamPrint</span>
        </div>

        {/* Navigation links (desktop) */}
        <nav className="desktop-only">
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>

        {/* Right actions (desktop) */}
        <div className="nav-actions desktop-only">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/auth")}
          >
            Login / Signup
          </button>

          <button
            className="btn btn-ghost"
            onClick={() => navigate("/admin-login")}
          >
            Admin
          </button>

          <button
            className="btn btn-ghost"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="hamburger mobile-only"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
          <a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>

          <button
            className="btn btn-primary"
            onClick={() => {
              navigate("/auth");
              setMenuOpen(false);
            }}
          >
            Login / Signup
          </button>

          <button
            className="btn btn-ghost"
            onClick={() => {
              navigate("/admin-login");
              setMenuOpen(false);
            }}
          >
            Admin
          </button>

          <button
            className="btn btn-ghost"
            onClick={() => {
              toggleTheme();
              setMenuOpen(false);
            }}
          >
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      )}
    </header>
  );
}
