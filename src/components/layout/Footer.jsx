import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div>
        <Link to="/" className="footer-logo">FIELD13</Link>
        <div className="footer-sub">Revenue Architecture</div>
      </div>
      <div className="footer-links">
        <Link to="/about">About</Link>
        <Link to="/insights">Insights</Link>
        <a href="https://cal.com/field13-r657gn/45min" target="_blank" rel="noopener noreferrer">Book a check</a>
      </div>
    </footer>
  );
};

export default Footer;
