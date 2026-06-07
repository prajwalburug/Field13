import Footer from '../components/layout/Footer';

const About = () => {
  return (
    <>
      <section className="hero about-hero">
        <div className="container container-narrow">
          <div className="section-label">About</div>
          <h1 className="hero-headline mission-headline">
            FIELD13 exists because B2B buying changed.
          </h1>
        </div>
      </section>
      <section>
        <div className="container container-narrow">
          <p className="mission-text">
            People trust practitioners more than brands. Communities more than campaigns. Narratives more than ads.
          </p>
          <p className="mission-text">
            We build GTM systems for that future.
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;
