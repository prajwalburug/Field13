import './styles/globals.css';
import './styles/premium.css';
import './styles/f13.css';
import './styles/f13-sections.css';
import './styles/f13-pages.css';
import './styles/f13-content.css';
import './styles/f13-requests.css';
import './styles/f13-how.css';
import './styles/f13-systems.css';
import './styles/f13-refine.css';
import './styles/f13-system-pages.css';
import './styles/f13-board.css';
import './styles/f13-polish.css';
import './styles/f13-home.css';
import Nav from './components/layout/Nav';
import Home from './pages/Home';
import Requests from './pages/Requests';
import Brand from './pages/Brand';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { getCalApi } from '@calcom/embed-react';
import { SHOW_VOTE } from './config';
import { CAL_NAMESPACE } from './data/site';

// Cal.com popup: any link carrying calProps opens the booking calendar over the page.
// Brand colours match the site's cobalt button (lighter on Cal's dark background).
function CalEmbed() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal('ui', {
        theme: 'dark',
        cssVarsPerTheme: { light: { 'cal-brand': '#1A3BC0' }, dark: { 'cal-brand': '#3D63FF' } },
        hideEventTypeDetails: false,
        layout: 'month_view'
      });
    })();
  }, []);
  return null;
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      document.querySelector(hash)?.scrollIntoView();
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function App() {
  return (
    <Router>
      <>
        <ScrollToTop />
        <CalEmbed />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/brand" element={<Brand />} />
          <Route path="/requests" element={SHOW_VOTE ? <Requests /> : <Navigate to="/" replace />} />
          {/* The site is one page now. Old links (systems, about, agencies, pricing, insights...) land on it. */}
          <Route path="/agencies" element={<Navigate to="/#agencies" replace />} />
          <Route path="/about" element={<Navigate to="/#founders" replace />} />
          <Route path="/systems/*" element={<Navigate to="/#systems" replace />} />
          <Route path="/ugc" element={<Navigate to="/#systems" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
