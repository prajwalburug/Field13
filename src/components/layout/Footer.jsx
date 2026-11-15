import { Link } from 'react-router-dom';
import { CAL_LINK } from '../../data/site';
import Logo from '../ui/Logo';

const columns = [
  {
    title: 'Systems',
    links: [
      { label: 'What we build', href: '/#systems' },
      { label: 'How we work', href: '/#how' },
      { label: 'AI UGC Studio', to: '/ugc' },
      { label: 'White-label client platform', to: '/agencies' }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Agencies', to: '/agencies' }
    ]
  },
  {
    title: 'Get started',
    links: [
      { label: 'Book a discovery call', ext: CAL_LINK },
      { label: 'Vote on what we build next', to: '/requests' },
      { label: 'Score your AI readiness', to: '/process-check' }
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
            <p>AI systems that ship your content, ads, outreach and reports. Built in your accounts, run by us, owned by you.</p>
          </div>
          {columns.map((c) => (
            <div className="f13-footer-col" key={c.title}>
              <div className="f13-footer-title">{c.title}</div>
              <ul>
                {c.links.map((l) => (
                  <li key={l.label}>
                    {l.to && <Link to={l.to}>{l.label}</Link>}
                    {l.href && <a href={l.href}>{l.label}</a>}
                    {l.ext && <a href={l.ext} target="_blank" rel="noopener noreferrer">{l.label}</a>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="f13-footer-bottom">
          <span>© {new Date().getFullYear()} Field13</span>
          <span>Engineered and run by Field13</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
