import { useState } from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav>
      <Link to="/" className="nav-logo" onClick={closeMenu}>
        FIELD13
      </Link>
      <button
        className={`hamburger ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className={`nav-overlay ${menuOpen ? 'open' : ''}`} onClick={closeMenu}></div>
      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <Link to="/signal" className="nav-link" onClick={closeMenu}>Signal</Link>
        <Link to="/insights" className="nav-link" onClick={closeMenu}>Insights</Link>
        <Link to="/about" className="nav-link" onClick={closeMenu}>About</Link>
        <a href="https://cal.com/field13-r657gn/45min" className="nav-cta" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
          Book Strategy Call
        </a>
      </div>
    </nav>
  );
};

export default Nav;
