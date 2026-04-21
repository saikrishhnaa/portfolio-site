import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';
import './TechStack.css';
import { client, urlFor } from '../sanityClient';

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6, ease: "easeOut"
    }
  }
};

// Removed staggerContainerVariants and iconVariants

const TechIcon = ({ tech }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20, scale: 0.8 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true }}
    transition={{ type: 'spring', stiffness: 100, damping: 12, delay: Math.random() * 0.15 }}
    className="tech-icon-container"
  >
    {tech?.icon?.asset ? (
      <img
        src={urlFor(tech.icon).width(128).url()}
        alt={tech.name}
        className="tech-icon-img"
      />
    ) : (
      // Fallback: show initials if no image uploaded yet
      <div className="tech-icon-placeholder">
        {tech?.name?.slice(0, 2).toUpperCase() || 'TX'}
      </div>
    )}
    <span className="tech-tooltip">{tech.name}</span>
  </motion.div>
);

const fallbackCategories = [
  {
    _id: 'fallback-lang',
    categoryName: 'Languages',
    order: 1,
    technologies: [
      { _key: 'js', name: 'JavaScript' },
      { _key: 'ts', name: 'TypeScript' },
      { _key: 'cs', name: 'C#' },
      { _key: 'java', name: 'Java' },
      { _key: 'cpp', name: 'C++' },
    ],
  },
  {
    _id: 'fallback-fe',
    categoryName: 'Frontend',
    order: 2,
    technologies: [
      { _key: 'react', name: 'React' },
      { _key: 'vue', name: 'Vue.js' },
    ],
  },
  {
    _id: 'fallback-be',
    categoryName: 'Backend & Cloud',
    order: 3,
    technologies: [
      { _key: 'dotnet', name: '.NET / ASP.NET' },
      { _key: 'docker', name: 'Docker' },
      { _key: 'db', name: 'Databases' },
      { _key: 'git', name: 'Git' },
    ],
  },
];

const TechStack = () => {
  const [categories, setCategories] = useState(fallbackCategories);

  useEffect(() => {
    client
      .fetch('*[_type == "techStackCategory"] | order(order asc)')
      .then(data => {
        if (data && data.length > 0) setCategories(data);
      })
      .catch(err => console.warn('TechStack fetch failed, using fallback:', err.message));
  }, []);

  return (
    <section className="techstack-section">
      <motion.div 
        className="techstack-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="techstack-title">
          <Cpu size={16} strokeWidth={2} />
          <span>Tech Stack</span>
        </div>

        <div className="techstack-icons-wrapper">
          {(categories || []).map((cat, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <div className="tech-group-divider" />}
              <div className="tech-group">
                <div className="tech-group-icons">
                  {(cat?.technologies || []).map((tech, techIdx) => (
                    <TechIcon key={tech._key || techIdx} tech={tech} />
                  ))}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default TechStack;
