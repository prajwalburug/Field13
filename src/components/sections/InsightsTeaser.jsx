import { Link } from 'react-router-dom';

const InsightsTeaser = () => {
  return (
    <Link to="/insights" className="teaser-card">
      <div className="teaser-eyebrow">Free resources</div>
      <h3 className="teaser-headline">Not ready to book? Start here.</h3>
      <p className="teaser-text">
        Free guides on the exact problems that show up in every Process Check — lead response time, pipeline visibility, data quality, and more.
      </p>
      <span className="teaser-cta">Browse free resources →</span>
    </Link>
  );
};

export default InsightsTeaser;
