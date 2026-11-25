import { Link } from 'react-router-dom';
import { systems, loop } from '../../data/systems';

/*
 * The four systems as one flywheel: creator outbound brings footage, content tests
 * hooks for free, ads scale the winners, reports brief the next turn.
 * `current` highlights the page you are on.
 */
const SystemLoop = ({ current, tone = 'bone' }) => {
  const ordered = loop.map((slug) => systems.find((s) => s.slug === slug));
  return (
    <div className={`sl sl-${tone}`}>
      <ol className="sl-row">
        {ordered.map((s, i) => {
          const here = s.slug === current;
          return (
            <li key={s.slug} className={`sl-node${here ? ' is-here' : ''}`}>
              <Link to={`/systems/${s.slug}`} className="sl-card" aria-current={here ? 'page' : undefined}>
                <span className="sl-role">{s.role}</span>
                <span className="sl-name">{s.name}</span>
                <span className="sl-foot">
                  {here ? 'You are here' : s.start ? 'Where most teams start →' : 'See the system →'}
                </span>
              </Link>
              {i < ordered.length - 1 && <span className="sl-arrow" aria-hidden="true">→</span>}
            </li>
          );
        })}
      </ol>
      <div className="sl-return" aria-hidden="true">
        <span className="sl-return-label">Next brief goes back to your creators and the engine</span>
      </div>
      <p className="sl-caption">
        <span aria-hidden="true">↺</span> A flywheel, not four tools: Reports send the next brief back to your creators and the engine, so every turn starts from what already won.
      </p>
    </div>
  );
};

export default SystemLoop;
