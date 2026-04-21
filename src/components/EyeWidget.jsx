import React, { useState, useEffect } from 'react';
import './EyeWidget.css';

const EyeWidget = () => {
  const [message, setMessage] = useState(null);
  const [showBookmark, setShowBookmark] = useState(false);
  const [irisPos, setIrisPos] = useState({ x: 0, y: 0 });

  // Custom Iris Tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Estimated anchor of the eye on screen (bottom left)
      const eyeX = 60; 
      const eyeY = window.innerHeight - 60;
      const dx = e.clientX - eyeX;
      const dy = e.clientY - eyeY;
      
      const angle = Math.atan2(dy, dx);
      // Max pixel radius the iris can move within the eye
      const dist = Math.min(12, Math.sqrt(dx * dx + dy * dy) / 15);
      
      setIrisPos({
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Global listener for Ctrl+D / Cmd+D to verify they actually pressed the bookmark keys!
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check for Ctrl/Cmd + D (event.key == 'd' ensures cross browser reliability)
      if ((e.ctrlKey || e.metaKey) && String.fromCharCode(e.which).toLowerCase() === 'd') {
        localStorage.setItem('hasBookmarked', 'true');
        setMessage("You bookmarked me! You're awesome.");
        setShowBookmark(false);
        setTimeout(() => setMessage(null), 5000);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Scrolling behavior tracking
  useEffect(() => {
    let totalScroll = 0;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      let diff = Math.abs(window.scrollY - lastScrollY);
      totalScroll += diff;
      lastScrollY = window.scrollY;

      if (totalScroll > 6000 && !message) {
        setMessage("Whoa, you scroll a LOT. Searching for something?");
        totalScroll = 0; // reset
        setTimeout(() => {
          if (!showBookmark) setMessage(null);
        }, 5000);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [message, showBookmark]);

  // Random spontaneous thoughts & bookmark prompt
  useEffect(() => {
    const interval = setInterval(() => {
      if (!message) {
        const rand = Math.random();
        
        if (rand > 0.7) {
          const hasBookmarked = localStorage.getItem('hasBookmarked') === 'true';
          if (!hasBookmarked) {
            setMessage("Bookmark me!");
            setShowBookmark(true);
          }
        } else if (rand > 0.4) {
          setMessage("I see you gazing at this design. Don't stare too long.");
          setTimeout(() => {
            if (!showBookmark) setMessage(null);
          }, 4000);
        }
      }
    }, 25000); // Evaluate every 25s
    
    return () => clearInterval(interval);
  }, [message, showBookmark]);

  const handleBookmarkYes = () => {
    // DO NOT set localStorage yet! We wait for them to actually press Ctrl+D.
    setMessage("Press Ctrl+D (or Cmd+D) right now! I'm watching you.");
    setShowBookmark(false);
    setTimeout(() => setMessage(null), 5000);
  };

  const handleBookmarkNo = () => {
    localStorage.setItem('hasBookmarked', 'true');
    setMessage("Wow. Fine. Break my heart.");
    setShowBookmark(false);
    setTimeout(() => setMessage(null), 3000);
  };

  const [isIrritated, setIsIrritated] = useState(false);

  const pokeEye = () => {
    setIsIrritated(true);
    setShowBookmark(false);
    
    const pokeMsgs = [
      "Stop poking me!",
      "You've been scrolling a ton. Take a break and drink some water.",
      "Are you looking for a hidden easter egg? There isn't one.",
      "Ouch! I'm just an innocent blob of CSS.",
      "Do your fingers hurt from scrolling so much? Go drink water."
    ];
    
    setMessage(pokeMsgs[Math.floor(Math.random() * pokeMsgs.length)]);
    
    setTimeout(() => {
      setIsIrritated(false);
      setMessage(null);
    }, 4000);
  };

  return (
    <div className="eye-widget-container">
      {message && (
        <div className="eye-bubble-container">
          <p className="eye-bubble-text">{message}</p>
          
          {showBookmark && (
            <div className="eye-bookmark-actions">
              <button className="eye-btn yes" onClick={handleBookmarkYes}>Yes</button>
              <button className="eye-btn no" onClick={handleBookmarkNo}>Hell no</button>
            </div>
          )}
        </div>
      )}

      <div className={`css-eye ${isIrritated ? 'irritated' : ''}`} onClick={pokeEye} style={{ cursor: 'pointer' }}>
        <div className="css-eye-lid"></div>
        <div 
          className="css-iris"
          style={{ transform: `translate(${irisPos.x}px, ${irisPos.y}px)` }}
        >
          <div className="css-pupil"></div>
        </div>
      </div>
    </div>
  );
};

export default EyeWidget;
