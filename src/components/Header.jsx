import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Volume2, VolumeX, Flashlight, FlashlightOff } from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import './Header.css';
import { client } from '../sanityClient';

let globalAudioCtx = null;

export const triggerClickSound = () => {
  try {
    if (!globalAudioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      globalAudioCtx = new AudioContext();
    }
    if (globalAudioCtx.state === 'suspended') {
      globalAudioCtx.resume();
    }
    
    const playClick = (freqStart, freqEnd, timeOffset, duration, volume) => {
      const osc = globalAudioCtx.createOscillator();
      const gain = globalAudioCtx.createGain();
      
      osc.type = 'square';
      osc.frequency.setValueAtTime(freqStart, globalAudioCtx.currentTime + timeOffset);
      osc.frequency.exponentialRampToValueAtTime(freqEnd, globalAudioCtx.currentTime + timeOffset + duration);
      
      gain.gain.setValueAtTime(volume, globalAudioCtx.currentTime + timeOffset);
      gain.gain.exponentialRampToValueAtTime(0.001, globalAudioCtx.currentTime + timeOffset + duration);
      
      osc.connect(gain);
      gain.connect(globalAudioCtx.destination);
      
      osc.start(globalAudioCtx.currentTime + timeOffset);
      osc.stop(globalAudioCtx.currentTime + timeOffset + duration);
    };

    playClick(4500, 150, 0, 0.012, 0.08);
    playClick(3500, 100, 0.05, 0.012, 0.06);
  } catch (err) {
    console.log('Audio feedback skipped');
  }
};

const sarcasticMessages = [
  "PRODUCTIVITY DROPPING...",
  "SHOULDN'T YOU BE WORKING?",
  "PROCRASTINATION LEVEL: EXPERT",
  "YOUR COFFEE IS GETTING COLD",
  "AVOIDING RESPONSIBILITIES?",
  "STILL SCROLLING?",
  "TIME IS AN ILLUSION",
  "BOSS IS BEHIND YOU"
];

const Header = ({ activePage = 'about', setActivePage, openContact }) => {
  const [soundOn, setSoundOn] = useState(false);
  const [spotlightMode, setSpotlightMode] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [seconds, setSeconds] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const [siteConfig, setSiteConfig] = useState({
    githubUrl: 'https://github.com/saikrishhnaa',
    linkedinUrl: 'https://www.linkedin.com/in/saikrishna-makam-4260351b3/',
    resumeUrl: null,
  });

  useEffect(() => {
    client.fetch('*[_type == "siteConfig"][0]{..., "resumeUrl": resume.asset->url}').then(data => {
      if (data) setSiteConfig(prev => ({ ...prev, ...data }));
    });
  }, []);

  useEffect(() => {
    if (!spotlightMode) return;
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [spotlightMode]);

  useEffect(() => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      setSeconds(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const msgTimer = setInterval(() => {
      setMsgIndex(Math.floor(Math.random() * sarcasticMessages.length));
    }, 15000);
    return () => clearInterval(msgTimer);
  }, []);

  const formatTime = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const soundOnRef = React.useRef(soundOn);
  useEffect(() => {
    soundOnRef.current = soundOn;
  }, [soundOn]);

  useEffect(() => {
    const handleGlobalClick = (e) => {
      // Allow sound button itself to trigger audio even when currently off
      const isSoundToggle = e.target.closest('.sound-icon-btn');
      if (!soundOnRef.current && !isSoundToggle) return;

      const isClickable = 
        e.target.closest('button, a, input, select, textarea, label, [role="button"]') ||
        window.getComputedStyle(e.target).cursor === 'pointer';

      if (isClickable) {
        triggerClickSound();
      }
    };

    // Use capture: true to intercept clicks before any component calls e.stopPropagation()
    document.addEventListener('click', handleGlobalClick, { capture: true });
    return () => document.removeEventListener('click', handleGlobalClick, { capture: true });
  }, []);

  return (
    <motion.header 
      className="header-container"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <div className="header-inner">

        {/* LEFT — Logo */}
        <div className="header-left">
          <div className="header-logo">
            <span>SAI</span>
            <span>KRISHNA<span className="blinking-cursor">|</span></span>
          </div>
        </div>

        {/* CENTER — Navigation */}
        <nav className="header-nav">
          <button 
            className={`nav-button ${activePage === 'about' ? 'active' : ''}`}
            onClick={() => setActivePage('about')}
          >
            About me
          </button>
          <button 
            className={`nav-button ${activePage === 'renders' ? 'active' : ''}`}
            onClick={() => setActivePage('renders')}
          >
            Renders
          </button>
          <button 
            className="nav-button"
            onClick={openContact}
          >
            Contact
          </button>
          <a
            className="nav-button resume-button"
            href={siteConfig.resumeUrl || '#'}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => {
              if (!siteConfig.resumeUrl) {
                e.preventDefault();
                alert('Resume has not been uploaded to Sanity yet!');
              }
            }}
          >
            Resume
          </a>
        </nav>

        {/* RIGHT — Timer + Icons */}
        <div className="header-right">
          <div className="header-timer">
            <Clock size={14} strokeWidth={2.5} />
            <span className="timer-time">{formatTime(seconds)}</span>
            <span className="timer-separator">|</span>
            <span className="timer-message">{sarcasticMessages[msgIndex]}</span>
          </div>

          <div className="header-actions">
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="social-icon-btn github"
              aria-label="GitHub"
            >
              <FaGithub size={16} />
            </a>
            <a
              href={siteConfig.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="social-icon-btn linkedin"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn size={16} />
            </a>
            <button
              className={`social-icon-btn spotlight-icon-btn ${spotlightMode ? 'spotlight-on' : ''}`}
              onClick={() => setSpotlightMode(prev => !prev)}
              aria-label={spotlightMode ? 'Disable spotlight' : 'Enable spotlight'}
              title={spotlightMode ? 'Spotlight ON' : 'Spotlight OFF'}
            >
              {spotlightMode
                ? <Flashlight size={14} strokeWidth={2.5} />
                : <FlashlightOff size={14} strokeWidth={2.5} />}
            </button>
            <button
              className={`social-icon-btn sound-icon-btn ${soundOn ? 'sound-on' : ''}`}
              onClick={() => setSoundOn(!soundOn)}
              aria-label={soundOn ? 'Mute sounds' : 'Enable sounds'}
              title={soundOn ? 'Sound ON' : 'Sound OFF'}
            >
              {soundOn ? <Volume2 size={14} strokeWidth={2.5} /> : <VolumeX size={14} strokeWidth={2.5} />}
            </button>
          </div>
        </div>

      </div>

      {spotlightMode && (
        <div 
          className="spotlight-overlay"
          style={{
            background: `radial-gradient(circle 300px at ${mousePos.x}px ${mousePos.y}px, transparent 10%, rgba(0, 0, 0, 0.98) 80%)`
          }}
        />
      )}
    </motion.header>
  );
};

export default Header;
