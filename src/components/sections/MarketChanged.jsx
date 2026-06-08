import { useEffect, useRef } from 'react';

const sources = [
  'A founder someone follows.',
  'A peer they trust.',
  'A Slack message.',
  'A podcast clip.',
  'A conversation you never see.',
];

const MarketChanged = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const els = sectionRef.current.querySelectorAll('.fade-up');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="market-section" ref={sectionRef}>
      <div className="container">
        <div className="section-label fade-up">The market changed</div>
        <p className="market-text fade-up">
          Your website is no longer where buying begins.
        </p>
        <p className="market-text fade-up">
          It is where buying gets confirmed.
        </p>
        <p className="market-text fade-up">
          The real decision happens earlier.
        </p>
        <ol className="evidence-stack">
          {sources.map((s, i) => (
            <li key={i} className="evidence-item fade-up" style={{ transitionDelay: `${i * 0.15}s` }}>
              {s}
            </li>
          ))}
        </ol>
        <p className="market-text fade-up">
          By the time a prospect books a demo, they already have an opinion.
        </p>
        <p className="market-text fade-up">
          FIELD13 exists to shape that opinion.
        </p>
      </div>
    </section>
  );
};

export default MarketChanged;
