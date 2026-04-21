import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import './Hero.css';
import fallbackAvatar from '../assets/avatar_lilac2_pixel.png';
import { client, urlFor } from '../sanityClient';

const fallbackHero = {
  subtitle: 'Senior Software Engineer',
  title: 'I build scalable applications and turn complex problems into simple, reliable experiences.',
  description: 'With 5 years of experience across React, Vue.js, C#, ASP.NET, and .NET Core, I focus on clean architecture, high-performance systems, and code that lasts. My work balances frontend precision with solid backend design.\nI lead with ownership from idea to production, ensuring every detail is intentional, efficient, and built to scale.',
  avatarCaption: 'Code, coffee, and a lot of debugging',
  tags: [
    { text: 'System design', colorClass: 'yellow', ribbonClass: 'ribbon-arrow' },
    { text: 'Clean code', colorClass: 'purple', ribbonClass: 'ribbon-double' },
    { text: 'Performance optimization', colorClass: 'blue', ribbonClass: 'ribbon' },
    { text: 'Product-focused engineering', colorClass: 'green', ribbonClass: 'ribbon-slant' },
    { text: 'Customer-focused solutions', colorClass: 'pink', ribbonClass: 'ribbon-notch' },
  ],
};

const Hero = () => {
  const [hero, setHero] = useState(fallbackHero);
  const [avatarUrl, setAvatarUrl] = useState(null); // null = use local fallback

  useEffect(() => {
    client.fetch('*[_type == "hero"][0]').then(data => {
      if (data) {
        setHero(data);
        if (data.avatarImage) {
          setAvatarUrl(urlFor(data.avatarImage).width(400).url());
        }
      }
    }).catch(err => {
      console.warn('Hero fetch failed, using fallback:', err.message);
    });
  }, []);

  return (
    <section className="hero-section">
      <motion.div 
        className="hero-card"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="hero-content">
          <div className="hero-subtitle">
            <Terminal size={16} />
            <span>{hero.subtitle}</span>
          </div>

          <h1 className="hero-title">{hero.title}</h1>

          <p className="hero-description">{hero.description}</p>

          <div className="hero-tags">
            {hero.tags?.map((tag, i) => (
              <span key={i} className={`tag ${tag.colorClass} ${tag.ribbonClass}`}>
                {tag.text}
              </span>
            ))}
          </div>
        </div>

        <div className="hero-avatar-container">
          <div className="avatar-wrapper">
            <img 
              src={avatarUrl || fallbackAvatar}
              alt="Saikrishna" 
              className="avatar-image" 
            />
          </div>
          <p className="avatar-caption">{hero.avatarCaption}</p>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
