import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CAL_LINK } from '../../data/site';
import Logo from '../ui/Logo';

// One page, so the links are anchors. The only action is booking a call.
const links = [
  { href: '/#systems', label: 'What we build' },
  { href: '/#how', label: 'How it works' },
  { href: '/#run', label: 'Who runs it' },
  { href: '/#need', label: 'What we need' }
];

const Nav = () => {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="f13-nav">
      <div className="f13-nav-inner">
        <Link to="/" className="f13-logo" onClick={close} aria-label="Field13 home">
          <Logo />
        </Link>

        <nav className={`f13-nav-links${open ? ' is-open' : ''}`} aria-label="Main">
          {links.map((l) => (
            <a key={l.label} href={l.href} onClick={close}>{l.label}</a>
          ))}
          <a href={CAL_LINK} className="f13-btn f13-btn-light f13-nav-cta-mobile" target="_blank" rel="noopener noreferrer" onClick={close}>
            Book a call
          </a>
        </nav>

        <div className="f13-nav-right">
          <a href={CAL_LINK} className="f13-btn f13-btn-light f13-btn-sm" target="_blank" rel="noopener noreferrer">
            Book a call
          </a>
          <button
            type="button"
            className={`f13-burger${open ? ' is-open' : ''}`}
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span /><span />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Nav;
