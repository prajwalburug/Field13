import { Link } from 'react-router-dom';

const AboutTeaser = () => {
  return (
    <Link to="/about" className="teaser-card">
      <div className="teaser-eyebrow">About Field13</div>
      <h3 className="teaser-headline">Senior engineers. Named leads.</h3>
      <p className="teaser-text">
        Prajwal and Subhajit lead every engagement, backed by a team of senior AI, platform and product engineers. We staff to the work, so there is no waitlist and no cap.
      </p>
      <span className="teaser-cta">How we work →</span>
    </Link>
  );
};

export default AboutTeaser;
