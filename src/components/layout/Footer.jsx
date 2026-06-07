import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div>
        <Link to="/" className="footer-logo">FIELD13</Link>
        <div className="footer-sub">AI-native GTM company</div>
      </div>
      <div className="footer-links">
        <Link to="/signal">Signal</Link>
        <Link to="/about">About</Link>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
    </footer>
  );
};

export default Footer;
