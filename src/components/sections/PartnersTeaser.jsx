import { Link } from 'react-router-dom';

const PartnersTeaser = () => {
  return (
    <Link to="/agencies" className="teaser-card">
      <div className="teaser-eyebrow">For agencies</div>
      <h3 className="teaser-headline">An AI engineering team under your brand.</h3>
      <p className="teaser-text">
        Your clients are asking for AI video, creative at volume and AI search visibility. We engineer and run it behind your name, at wholesale rates, with your branding on every report.
      </p>
      <span className="teaser-cta">See the partner program →</span>
    </Link>
  );
};

export default PartnersTeaser;
