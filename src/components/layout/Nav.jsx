import { useState } from 'react';

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav>
      <a href="/" className="nav-logo">
        field13
      </a>
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
        <a href="/#how" className="nav-link" onClick={closeMenu}>
          How it works
        </a>
        <a href="/#who" className="nav-link" onClick={closeMenu}>
          Who it's for
        </a>
        <a href="/operators" className="nav-link" onClick={closeMenu}>
          For operators
        </a>
        <a href="/#contact" className="nav-cta" onClick={closeMenu}>
          Let's talk →
        </a>
      </div>
    </nav>
  );
};

export default Nav;
