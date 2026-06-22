import { Link } from 'react-router-dom';

const AboutTeaser = () => {
  return (
    <Link to="/about" className="teaser-card">
      <div className="teaser-eyebrow">About RevArc</div>
      <h3 className="teaser-headline">One person. Every client.</h3>
      <p className="teaser-text">
        RevArc is run by one person, end to end — the same person who maps your process builds it and stays on it. No account managers, no handoff.
      </p>
      <span className="teaser-cta">Read more about how we work →</span>
    </Link>
  );
};

export default AboutTeaser;
