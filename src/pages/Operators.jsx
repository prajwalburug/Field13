import OperatorsSimpleHero from '../components/sections/operators/OperatorsSimpleHero';
import OperatorsProblem from '../components/sections/operators/OperatorsProblem';
import OperatorsProcess from '../components/sections/operators/OperatorsProcess';
import OneRuleBand from '../components/sections/OneRuleBand';
import Footer from '../components/layout/Footer';

const Operators = () => {
  return (
    <>
      <OperatorsSimpleHero />
      <OperatorsProblem />
      <OperatorsProcess />
      <OneRuleBand />
      <section className="coming-soon-section">
        <div className="container">
          <div className="section-label">Coming Soon</div>
          <p className="coming-soon-text">
            The Operators network is currently in private beta. We'll open applications when the infrastructure is ready.
          </p>
        </div>
      </section>
      <section id="apply-interest" className="cta-section">
        <div className="container container-narrow">
          <div className="section-label">Apply Interest</div>
          <h2 className="cta-headline">Want to be an early operator?</h2>
          <p className="cta-sub">Drop us a note. We'll reach out when we're ready for you.</p>
          <div className="cta-actions">
            <a href="https://cal.com/field13-r657gn/45min" className="btn-primary" target="_blank" rel="noopener noreferrer">Apply Interest →</a>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Operators;
