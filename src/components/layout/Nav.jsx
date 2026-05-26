const Nav = () => {
  return (
    <nav>
      <a href="/" className="nav-logo">
        field13
      </a>
      <div className="nav-links">
        <a href="/#how" className="nav-link">
          How it works
        </a>
        <a href="/#who" className="nav-link">
          Who it's for
        </a>
        <a href="/operators" className="nav-link">
          For operators
        </a>
        <a href="/#contact" className="nav-cta">
          Let's talk →
        </a>
      </div>
    </nav>
  );
};

export default Nav;
