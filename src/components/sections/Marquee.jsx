const Marquee = () => {
  const items = ['GTM tools', 'RevOps platforms', 'AI-native B2B', 'Developer tools', 'Sales tech', 'Workflow SaaS', 'Productivity tools', 'Infrastructure'];
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="marquee-item">
            {item}
            <span className="marquee-sep"> · </span>
          </span>
        ))}
      </div>
    </div>
  );
};
export default Marquee;
