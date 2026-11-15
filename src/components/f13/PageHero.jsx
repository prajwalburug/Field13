const PageHero = ({ tag, eyebrow, title, lede, children }) => {
  return (
    <section className="f13-sheet f13-sheet-black f13-page-hero">
      <div className="f13-wrap">
        <div className="f13-badge">
          <span className="f13-badge-tag">{tag}</span>
          <span className="f13-badge-text">{eyebrow}</span>
        </div>
        <h1 className="f13-display">{title}</h1>
        {lede && <p className="f13-lede">{lede}</p>}
        {children}
      </div>
    </section>
  );
};

export default PageHero;
