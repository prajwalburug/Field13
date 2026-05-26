import OperatorsHero from '../components/sections/operators/OperatorsHero';
import OperatorsDifference from '../components/sections/operators/OperatorsDifference';
import OperatorsHowItWorks from '../components/sections/operators/OperatorsHowItWorks';
import OperatorsWhoFits from '../components/sections/operators/OperatorsWhoFits';
import OperatorsWhatYouGet from '../components/sections/operators/OperatorsWhatYouGet';
import OperatorsDisclosure from '../components/sections/operators/OperatorsDisclosure';
import OperatorsFinalCTA from '../components/sections/operators/OperatorsFinalCTA';
import Footer from '../components/layout/Footer';

const Operators = () => {
  return (
    <>
      <OperatorsHero />
      <OperatorsDifference />
      <OperatorsHowItWorks />
      <OperatorsWhoFits />
      <OperatorsWhatYouGet />
      <OperatorsDisclosure />
      <OperatorsFinalCTA />
      <Footer />
    </>
  );
};

export default Operators;
