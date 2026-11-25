import Footer from '../components/layout/Footer';
import RequestSystem from '../components/f13/RequestSystem';
import VoteExplainer from '../components/f13/VoteExplainer';
import BuildWithUs from '../components/f13/BuildWithUs';
import FinalCta from '../components/f13/FinalCta';

const Requests = () => {
  return (
    <>
      <div className="f13-board-page">
        <RequestSystem />
        <VoteExplainer />
        <BuildWithUs />
      </div>
      <FinalCta />
      <Footer />
    </>
  );
};

export default Requests;
