import Footer from '../components/layout/Footer';
import Logo, { Mark, LOGO_VARIANT } from '../components/ui/Logo';

/* Internal page (not linked in the nav): both logo directions side by side. */
const VARIANTS = [
  { id: 'serif', name: 'B · Serif footnote', note: 'Serif F with a mono 13 set like a footnote. Same type pairing as the site.', files: ['f13-serif-tile.svg', 'f13-serif-mark-on-dark.svg', 'f13-serif-mark-on-light.svg'] },
  { id: 'grid', name: 'A · Field grid', note: 'F13 built from cells on a 10 × 5 field. The field is literal.', files: ['f13-grid-tile.svg', 'f13-grid-mark-on-dark.svg', 'f13-grid-mark-on-light.svg'] }
];

const Brand = () => (
  <>
    <section className="f13-sheet f13-sheet-black f13-page-hero">
      <div className="f13-wrap">
        <div className="f13-label">Brand</div>
        <h1 className="f13-display">Two F13 marks.<br /><em>Pick one.</em></h1>
        <p className="f13-lede">Live on the site now: <strong style={{ color: '#fff' }}>{LOGO_VARIANT === 'serif' ? 'B · Serif footnote' : 'A · Field grid'}</strong>. Switch with <code>LOGO_VARIANT</code> in <code>src/components/ui/Logo.jsx</code>.</p>
      </div>
    </section>

    {VARIANTS.map((v) => (
      <section className="f13-sheet f13-sheet-graphite br" key={v.id}>
        <div className="f13-wrap">
          <div className="br-head">
            <h2 className="f13-h2">{v.name}</h2>
            <p className="f13-lede">{v.note}</p>
          </div>

          <div className="br-grid">
            <div className="br-cell br-dark">
              <span className="br-cap">Nav, on dark</span>
              <div className="br-nav"><Logo variant={v.id} /></div>
            </div>
            <div className="br-cell br-light">
              <span className="br-cap">Mark, on light</span>
              <img src={`/brand/${v.files[2]}`} alt="" className="br-mark-img" />
            </div>
            <div className="br-cell br-dark">
              <span className="br-cap">Mark, large</span>
              <Mark variant={v.id} size={88} />
            </div>
            <div className="br-cell br-dark">
              <span className="br-cap">Favicon / app icon · 128 · 64 · 32 · 16</span>
              <div className="br-sizes">
                {[128, 64, 32, 16].map((s) => <Mark key={s} variant={v.id} tile size={s} />)}
              </div>
            </div>
          </div>

          <div className="br-files">
            {v.files.map((f) => <a key={f} href={`/brand/${f}`} download className="f13-textlink">{f} ↓</a>)}
          </div>
        </div>
      </section>
    ))}
    <Footer />
  </>
);

export default Brand;
