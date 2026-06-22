import './styles/globals.css';
import Nav from './components/layout/Nav';
import Footer from './components/layout/Footer';
import CRMHero from './components/sections/CRMHero';
import RiskReversalBanner from './components/sections/RiskReversalBanner';
import CRMPainPoints from './components/sections/CRMPainPoints';
import CRMHowItWorks from './components/sections/CRMHowItWorks';
import GuaranteeSection from './components/sections/GuaranteeSection';
import AboutTeaser from './components/sections/AboutTeaser';
import InsightsTeaser from './components/sections/InsightsTeaser';
import CRMCTA from './components/sections/CRMCTA';
import About from './pages/About';
import Insights from './pages/Insights';
import TheEndOfBrandMarketing from './pages/insights/TheEndOfBrandMarketing';
import WhyCommunitiesBeatCampaigns from './pages/insights/WhyCommunitiesBeatCampaigns';
import FounderMediaIsTheNewABM from './pages/insights/FounderMediaIsTheNewABM';
import SignalInANoisyMarket from './pages/insights/SignalInANoisyMarket';
import CategoryIntelligenceBrief from './pages/insights/CategoryIntelligenceBrief';
import NarrativeArchitectureFramework from './pages/insights/NarrativeArchitectureFramework';
import DistributionMapTemplate from './pages/insights/DistributionMapTemplate';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <>
        <ScrollToTop />
        <Nav />
        <Routes>
          <Route path="/" element={
            <div>
              <CRMHero />
              <RiskReversalBanner />
              <CRMPainPoints />
              <CRMHowItWorks />
              <GuaranteeSection />
              <section className="teaser-pair">
                <div className="container">
                  <div className="teaser-grid">
                    <AboutTeaser />
                    <InsightsTeaser />
                  </div>
                </div>
              </section>
              <CRMCTA />
              <Footer />
            </div>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/insights/the-end-of-brand-marketing" element={<TheEndOfBrandMarketing />} />
          <Route path="/insights/why-communities-beat-campaigns" element={<WhyCommunitiesBeatCampaigns />} />
          <Route path="/insights/founder-media-is-the-new-abm" element={<FounderMediaIsTheNewABM />} />
          <Route path="/insights/signal-in-a-noisy-market" element={<SignalInANoisyMarket />} />
          <Route path="/insights/category-intelligence-brief" element={<CategoryIntelligenceBrief />} />
          <Route path="/insights/narrative-architecture-framework" element={<NarrativeArchitectureFramework />} />
          <Route path="/insights/distribution-map-template" element={<DistributionMapTemplate />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
