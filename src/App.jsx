import './styles/globals.css';
import Nav from './components/layout/Nav';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import StatBlock from './components/sections/StatBlock';
import MarketSignalTicker from './components/sections/MarketSignalTicker';
import MarketChanged from './components/sections/MarketChanged';
import ManifestoSection from './components/sections/ManifestoSection';
import InsightsSection from './components/sections/InsightsSection';
import PanelsSection from './components/sections/PanelsSection';
import SignalDiagram from './components/sections/SignalDiagram';
import CTASection from './components/sections/CTASection';
import Signal from './pages/Signal';
import Operators from './pages/Operators';
import About from './pages/About';
import Insights from './pages/Insights';
import TheEndOfBrandMarketing from './pages/insights/TheEndOfBrandMarketing';
import WhyCommunitiesBeatCampaigns from './pages/insights/WhyCommunitiesBeatCampaigns';
import FounderMediaIsTheNewABM from './pages/insights/FounderMediaIsTheNewABM';
import SignalInANoisyMarket from './pages/insights/SignalInANoisyMarket';
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
              <Hero />
              <StatBlock />
              <MarketSignalTicker />
              <MarketChanged />
              <ManifestoSection />
              <InsightsSection />
              <PanelsSection />
              <SignalDiagram />
              <CTASection />
              <Footer />
            </div>
          } />
          <Route path="/signal" element={<Signal />} />
          <Route path="/operators" element={<Operators />} />
          <Route path="/about" element={<About />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/insights/the-end-of-brand-marketing" element={<TheEndOfBrandMarketing />} />
          <Route path="/insights/why-communities-beat-campaigns" element={<WhyCommunitiesBeatCampaigns />} />
          <Route path="/insights/founder-media-is-the-new-abm" element={<FounderMediaIsTheNewABM />} />
          <Route path="/insights/signal-in-a-noisy-market" element={<SignalInANoisyMarket />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
