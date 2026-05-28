import './styles/globals.css';
import Nav from './components/layout/Nav';
import Hero from './components/sections/Hero';
import ProblemSection from './components/sections/ProblemSection';
import HowWeWork from './components/sections/HowWeWork';
import UseCasesSection from './components/sections/UseCasesSection';
import DifferenceSection from './components/sections/DifferenceSection';
import WhoSection from './components/sections/WhoSection';
import OperatorTeaser from './components/sections/OperatorTeaser';
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
              <ProblemSection />
              <HowWeWork />
              <UseCasesSection />
              <DifferenceSection />
              <WhoSection />
              <OperatorTeaser />
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
