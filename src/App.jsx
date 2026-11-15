import './styles/globals.css';
import './styles/premium.css';
import './styles/f13.css';
import './styles/f13-sections.css';
import './styles/f13-pages.css';
import './styles/f13-content.css';
import './styles/f13-requests.css';
import './styles/f13-how.css';
import './styles/f13-systems.css';
import Nav from './components/layout/Nav';
import Footer from './components/layout/Footer';
import Hero from './components/f13/Hero';
import Products from './components/f13/Products';
import HowItWorks from './components/f13/HowItWorks';
import Team from './components/f13/Team';
import Guarantees from './components/f13/Guarantees';
import FinalCta from './components/f13/FinalCta';
import Requests from './pages/Requests';
import Agencies from './pages/Agencies';
import UgcStudio from './pages/UgcStudio';
import Brand from './pages/Brand';
import About from './pages/About';
import ProcessCheck from './pages/ProcessCheck';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
              <Products />
              <HowItWorks />
              <Team />
              <Guarantees />
              <FinalCta />
              <Footer />
            </div>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/agencies" element={<Agencies />} />
          <Route path="/ugc" element={<UgcStudio />} />
          <Route path="/brand" element={<Brand />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/process-check" element={<ProcessCheck />} />
          {/* Retired pages: send old links home instead of to a blank page */}
          <Route path="/pricing" element={<Navigate to="/" replace />} />
          <Route path="/insights/*" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
