import { Link } from 'react-router-dom';
import SystemLoop from './SystemLoop';

/*
 * What we build, kept dead simple: one heading, one line, the flywheel.
 * Each card links to its system page, where the detail lives.
 */
const Products = () => {
  return (
    <section className="f13-sheet f13-sheet-bone f13-products wb" id="systems">
      <div className="f13-wrap">
        <div className="wb-head wb-head-center">
          <div className="f13-label">What we build</div>
          <h2 className="f13-h2">
            Four systems, one flywheel.<br /><em>Each one feeds the next.</em>
          </h2>
          <p className="f13-lede">
            Start with Ads and UGC. Add the rest when you are ready.
          </p>
        </div>

        <SystemLoop />

        <p className="wb-agency-line">
          Run an agency? <Link to="/agencies" className="f13-textlink">Offer it to your clients under your brand →</Link>
        </p>
      </div>
    </section>
  );
};

export default Products;
