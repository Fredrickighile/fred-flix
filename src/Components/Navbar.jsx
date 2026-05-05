import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMovieContext } from '../context/MovieContext';
import "../css/Navbar.css";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { favorites } = useMovieContext();
  const location = useLocation();

  useEffect(() => { setOpen(false); }, [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-inner">

        <Link to="/" className="navbar-logo">
          <span className="logo-fred">Fred</span>
          <span className="logo-flix">flix</span>
          <div className="logo-dot" />
        </Link>

        <div className="navbar-links">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            Home
          </Link>
          <Link to="/favourites" className={`nav-link ${isActive('/favourites') ? 'active' : ''}`}>
            Favourites
            {favorites.length > 0 && (
              <span className="fav-count">{favorites.length}</span>
            )}
          </Link>
        </div>

        <button
          className={`hamburger ${open ? 'open' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {open && (
        <div className="mobile-nav">
          <Link to="/" className="mobile-nav-link">Home</Link>
          <Link to="/favourites" className="mobile-nav-link">
            Favourites {favorites.length > 0 && `(${favorites.length})`}
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
