import { Link } from 'react-router-dom';
import { CAL_LINK, calProps } from '../../data/site';
import Logo from '../ui/Logo';

const columns = [
  {
    title: 'Field13',
    links: [
      { label: 'What we build', href: '/#systems' },
      { label: 'How it works', href: '/#how' },
      { label: 'Who runs it', href: '/#run' },
      { label: 'For agencies', href: '/#agencies' },
      { label: 'FAQ', href: '/#faq' }
    ]
  },
  {
    title: 'Get started',
    links: [
      { label: 'Book a call', ext: CAL_LINK }
    ]
  }
];

const Footer = () => {
  return (
    <footer className="f13-footer">
      <div className="f13-wrap">
        <div className="f13-footer-top">
          <div className="f13-footer-brand">
            <Link to="/" className="f13-logo" aria-label="Field13 home">
              <Logo />
            </Link>
            <p>AI marketing systems for UGC, content, ads and outbound. Built around your team and trained on its work.</p>
          </div>
          {columns.map((c) => (
            <div className="f13-footer-col" key={c.title}>
              <div className="f13-footer-title">{c.title}</div>
              <ul>
                {c.links.map((l) => (
                  <li key={l.label}>
                    {l.href && <a href={l.href}>{l.label}</a>}
                    {l.ext && <a {...calProps}>{l.label}</a>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="f13-footer-bottom">
          <span>© {new Date().getFullYear()} Field13</span>
          <span>Built and run by Field13</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
