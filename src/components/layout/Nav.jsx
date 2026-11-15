import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CAL_LINK } from '../../data/site';
import Logo from '../ui/Logo';

const links = [
  { to: '/#systems', label: 'Systems' },
  { to: '/#how', label: 'How we work' },
  { to: '/ugc', label: 'UGC Studio' },
  { to: '/agencies', label: 'Agencies' },
  { to: '/about', label: 'About' },
  { to: '/requests', label: 'Vote', live: true }
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
            l.to.startsWith('/#')
              ? <a key={l.label} href={l.to} onClick={close}>{l.label}</a>
              : <NavLink key={l.label} to={l.to} onClick={close} className={l.live ? 'f13-nav-vote' : undefined}>
                  {l.live && <span className="f13-nav-live" aria-hidden="true" />}{l.label}
                </NavLink>
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
