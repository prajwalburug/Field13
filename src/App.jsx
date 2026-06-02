import './styles/globals.css';
import Nav from './components/layout/Nav';
import Hero from './components/sections/Hero';
import ProblemSection from './components/sections/ProblemSection';
import Marquee from './components/sections/Marquee';
import WhoSection from './components/sections/WhoSection';
import FunnelSection from './components/sections/FunnelSection';
import ProgramPhases from './components/sections/ProgramPhases';
import ComparisonSection from './components/sections/ComparisonSection';
import OneRuleBand from './components/sections/OneRuleBand';
import PricingSection from './components/sections/PricingSection';
import CTASection from './components/sections/CTASection';
import Footer from './components/layout/Footer';
import Operators from './pages/Operators';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <>
        <Nav />
        <Routes>
          <Route path="/" element={
            <div>
              <Hero />
              <Marquee />
              <ProblemSection />
              <WhoSection />
              <FunnelSection />
              <ProgramPhases />
              <ComparisonSection />
              <OneRuleBand />
              <PricingSection />
              <CTASection />
              <Footer />
            </div>
          } />
          <Route path="/operators" element={<Operators />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
