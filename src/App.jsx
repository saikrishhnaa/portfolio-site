import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TechStack from './components/TechStack';
import Trajectory from './components/Trajectory';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import RendersPage from './components/RendersPage';
import ContactModal from './components/ContactModal';
import EyeWidget from './components/EyeWidget';
import Footer from './components/Footer';

function App() {
  const [activePage, setActivePage] = useState('about');
  const [isContactOpen, setIsContactOpen] = useState(false);
  
  // Custom cursor tracking could be placed here if desired
  
  return (
    <div className="app-container">
      <EyeWidget />
      <Header activePage={activePage} setActivePage={setActivePage} openContact={() => setIsContactOpen(true)} />
      <main>
        {activePage === 'about' && (
          <>
            <Hero />
            <TechStack />
            <Trajectory />
            <Projects />
            <Achievements />
          </>
        )}
        
        {activePage === 'renders' && (
          <RendersPage />
        )}
      </main>

      <Footer />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}

export default App;
