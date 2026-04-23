import React, { useState, useEffect } from 'react';
import './EyeWidget.css';

const EyeWidget = () => {
  const [message, setMessage] = useState(null);
  const [showBookmark, setShowBookmark] = useState(false);
  const [irisPos, setIrisPos] = useState({ x: 0, y: 0 });
  const [isIrritated, setIsIrritated] = useState(false);
  // Read actual bookmark state from localStorage on mount
  const [hasBookmarked, setHasBookmarked] = useState(
    () => localStorage.getItem('hasBookmarked') === 'true'
  );

  // Store latest state in refs to avoid stale closures inside intervals/listeners
  const messageRef = React.useRef(message);
  const showBookmarkRef = React.useRef(showBookmark);
  const hasBookmarkedRef = React.useRef(hasBookmarked);
  useEffect(() => { messageRef.current = message; }, [message]);
  useEffect(() => { showBookmarkRef.current = showBookmark; }, [showBookmark]);
  useEffect(() => { hasBookmarkedRef.current = hasBookmarked; }, [hasBookmarked]);

  // Custom Iris Tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      const eyeX = 60;
      const eyeY = window.innerHeight - 60;
      const dx = e.clientX - eyeX;
      const dy = e.clientY - eyeY;
      const angle = Math.atan2(dy, dx);
      const dist = Math.min(12, Math.sqrt(dx * dx + dy * dy) / 15);
      setIrisPos({ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Global listener for Ctrl+D / Cmd+D
  useEffect(() => {
    const handleKeyDown = (e) => {
      // e.key is the correct modern API; 'd' covers both lowercase
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'd') {
        e.preventDefault(); // prevent default browser bookmark dialog
        localStorage.setItem('hasBookmarked', 'true');
        setHasBookmarked(true);
        setShowBookmark(false);
        setMessage("You bookmarked me! You're awesome.");
        setTimeout(() => setMessage(null), 5000);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Scroll tracking
  useEffect(() => {
    let totalScroll = 0;
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const diff = Math.abs(window.scrollY - lastScrollY);
      totalScroll += diff;
      lastScrollY = window.scrollY;
      if (totalScroll > 6000 && !messageRef.current) {
        setMessage("Whoa, you scroll a LOT. Searching for something?");
        totalScroll = 0;
        setTimeout(() => { if (!showBookmarkRef.current) setMessage(null); }, 5000);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // stable — uses refs, no deps needed

  // Random spontaneous thoughts & bookmark prompt
  useEffect(() => {
    const interval = setInterval(() => {
      if (messageRef.current) return; // already showing something
      const rand = Math.random();
      if (rand > 0.7 && !hasBookmarkedRef.current) {
        // Only prompt bookmark if they haven't already bookmarked
        setMessage("Bookmark me!");
        setShowBookmark(true);
      } else if (rand > 0.4) {
        setMessage("I see you gazing at this design. Don't stare too long.");
        setTimeout(() => { if (!showBookmarkRef.current) setMessage(null); }, 4000);
      }
    }, 25000);
    return () => clearInterval(interval);
  }, []); // stable — uses refs only

  const handleBookmarkYes = () => {
    // Instruct user to press Ctrl+D — don't mark as bookmarked yet
    setShowBookmark(false);
    setMessage("Press Ctrl+D (or Cmd+D) right now! I'm watching.");
    setTimeout(() => setMessage(null), 5000);
  };

  const handleBookmarkNo = () => {
    // User declined — dismiss the prompt this time, but don't permanently suppress
    setShowBookmark(false);
    setMessage("Fine. Come back if you change your mind.");
    setTimeout(() => setMessage(null), 3000);
  };

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
    setTimeout(() => { setIsIrritated(false); setMessage(null); }, 4000);
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
