const terms = [
  'Founder Media', 'Community GTM', 'Operator Trust', 'Dark Funnel',
  'Narrative', 'Distribution', 'Category Leadership', 'Research',
  'Signal', 'Trust', 'Demand', 'Founder Media', 'Community GTM',
  'Operator Trust', 'Dark Funnel', 'Narrative', 'Distribution',
  'Category Leadership', 'Research', 'Signal', 'Trust', 'Demand',
];

const MarketSignalTicker = () => {
  return (
    <div className="ticker-wrap">
      <div className="ticker-track">
        {terms.map((term, i) => (
          <span className="ticker-item" key={i}>{term}</span>
        ))}
      </div>
    </div>
  );
};

export default MarketSignalTicker;
