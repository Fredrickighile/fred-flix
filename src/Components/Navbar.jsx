import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../css/Navbar.css";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo/Brand */}
        <div className="navbar-brand">
          <Link to="/">
            <span className="navbar-logo">🎬</span>
            <span>FredFlix</span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/favourites" className="nav-link">Favourites</Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <div className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-links">
            <Link to="/" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/favourites" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>
              Favourites
            </Link>
            {/* <Link to="/nsfw" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>NSFW</Link> */}

          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;