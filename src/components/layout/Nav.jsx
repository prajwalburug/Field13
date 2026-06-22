import { useState } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav>
      <Link to="/" className="nav-logo" onClick={closeMenu}>
        FIELD13
      </Link>
      <div className="nav-right">
        <a href="https://cal.com/field13-r657gn/45min" className="nav-cta nav-cta-desktop" target="_blank" rel="noopener noreferrer">
          Book free check
        </a>
        <ThemeToggle />
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div className={`nav-overlay ${menuOpen ? 'open' : ''}`} onClick={closeMenu}></div>
      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <Link to="/about" className="nav-link" onClick={closeMenu}>About</Link>
        <Link to="/insights" className="nav-link" onClick={closeMenu}>Insights</Link>
        <a href="https://cal.com/field13-r657gn/45min" className="nav-cta nav-cta-mobile" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
          Book free check
        </a>
      </div>
    </nav>
  );
};

export default Nav;
