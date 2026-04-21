import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const [pixelsScrolled, setPixelsScrolled] = useState(0);
  const [mouseDistance, setMouseDistance] = useState(0);
  const [clicksMade, setClicksMade] = useState(0);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  useEffect(() => {
    // Scroll
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const diff = Math.abs(window.scrollY - lastScrollY);
      setPixelsScrolled(prev => prev + diff);
      lastScrollY = window.scrollY;
      setShowScrollBtn(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);

    // Mouse distance
    let lastMouseX = null;
    let lastMouseY = null;
    const handleMouseMove = (e) => {
      if (lastMouseX !== null && lastMouseY !== null) {
        const dx = e.clientX - lastMouseX;
        const dy = e.clientY - lastMouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        setMouseDistance(prev => prev + dist);
      }
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Global Clicks
    const handleClick = () => {
      setClicksMade(prev => prev + 1);
    };
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatPixels = (px) => {
    if (px >= 1000) return (px / 1000).toFixed(1) + 'K';
    return Math.floor(px).toString();
  };

  const formatMeters = (px) => {
    // standard approx 1px = ~0.000264 meters
    const meters = px * 0.0002645833;
    return meters.toFixed(2) + 'm';
  };

  const calculateCalories = () => {
    // Satirical formula for calorie burn
    const cal = (clicksMade * 0.04) + (pixelsScrolled * 0.00005) + (mouseDistance * 0.00002);
    return cal.toFixed(2);
  };

  return (
    <>
      <div className="bottom-stats-wrapper">
        <div className="bottom-stats">
          <div className="bottom-stat-item">
            <span className="stat-val">{formatPixels(pixelsScrolled)}</span>
            <span className="stat-label">PIXELS SCROLLED</span>
          </div>
          <div className="bottom-stat-item">
            <span className="stat-val">{formatMeters(mouseDistance)}</span>
            <span className="stat-label">MOUSE ODYSSEY</span>
          </div>
          <div className="bottom-stat-item">
            <span className="stat-val">{clicksMade}</span>
            <span className="stat-label">CLICKS MADE</span>
          </div>
          <div className="bottom-stat-item">
            <span className="stat-val">{calculateCalories()}</span>
            <span className="stat-label">CALORIES BURNED</span>
          </div>
        </div>
      </div>

      <footer className="actual-footer">
        Made with <span style={{ color: '#FF1E56' }}>♥</span> by myself!
      </footer>

      {showScrollBtn && (
        <button className="scroll-up-btn" onClick={scrollToTop} aria-label="Back to Top">
          <ChevronUp size={24} strokeWidth={3} />
        </button>
      )}
    </>
  );
};

export default Footer;
