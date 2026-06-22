import { Link } from 'react-router-dom';
import Footer from '../components/layout/Footer';

const About = () => {
  return (
    <>
      <section className="hero about-hero">
        <div className="container container-narrow">
          <div className="section-label">About</div>
          <h1 className="hero-headline mission-headline">
            We do one thing. <em>We do it for five clients at a time.</em>
          </h1>
        </div>
      </section>

      <section>
        <div className="container container-narrow">
          <p className="mission-text">
            RevArc exists because HubSpot does not fail at setup. It fails six months later, quietly, when the team stops trusting it.
          </p>
          <p className="mission-text">
            Most agencies sell you a configured portal. We start with a process map: how leads come in, who qualifies them, what happens after a quote, how a closed deal gets handed to delivery, what leadership actually needs to see. Only after that map is drawn do we open HubSpot.
          </p>
        </div>
      </section>

      <section className="about-spec-section">
        <div className="container container-narrow">
          <div className="section-label">Three things that do not change once you sign</div>
          <div className="about-spec-list">
            <div className="about-spec-item">
              <div className="about-spec-label">One person, start to finish</div>
              <p className="about-spec-desc">The person who runs your Health Check builds your system and stays on it. No delegation.</p>
            </div>
            <div className="about-spec-item">
              <div className="about-spec-label">3 to 5 active clients, on purpose</div>
              <p className="about-spec-desc">We cap it so every client gets direct access, not a queue.</p>
            </div>
            <div className="about-spec-item">
              <div className="about-spec-label">Fixed timelines</div>
              <p className="about-spec-desc">You will know the date before you sign.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container container-narrow">
          <p className="mission-text" style={{fontSize: '15px', color: 'var(--ink)'}}>
            If you want to see what we would find in your portal, it starts with one free call.
          </p>
          <div className="about-actions">
          <a href="https://cal.com/field13-r657gn/45min" className="btn-primary" target="_blank" rel="noopener noreferrer">
            Book your free Process Check →
          </a>
          <Link to="/process-check" className="btn-secondary" style={{marginTop: '0.75rem'}}>
            Take the self-assessment →
          </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;
