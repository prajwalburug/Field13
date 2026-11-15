import Footer from '../components/layout/Footer';
import PageHero from '../components/f13/PageHero';
import Ugc from '../components/f13/Ugc';
import FinalCta from '../components/f13/FinalCta';
import { CAL_LINK } from '../data/site';

const UgcStudio = () => {
  return (
    <>
      <PageHero
        tag="UGC Studio"
        eyebrow="AI UGC for brands and agencies"
        title={<>Four hooks to test the same day.<br /><em>Not one video a week later.</em></>}
        lede="An AI UGC pipeline built in your own ad accounts, under your brand. For teams that need creative volume without a creator queue."
      >
        <div className="f13-actions">
          <a href={CAL_LINK} className="f13-btn f13-btn-blue" target="_blank" rel="noopener noreferrer">Book a discovery call</a>
          <a href="#ugc-studio" className="f13-btn f13-btn-ghost">See the pipeline</a>
        </div>
      </PageHero>
      <Ugc />
      <FinalCta />
      <Footer />
    </>
  );
};

export default UgcStudio;
