import Footer from '../components/layout/Footer';
import RequestSystem from '../components/f13/RequestSystem';
import FinalCta from '../components/f13/FinalCta';

const Requests = () => {
  return (
    <>
      <div className="f13-board-page">
        <RequestSystem />
      </div>
      <FinalCta />
      <Footer />
    </>
  );
};

export default Requests;
