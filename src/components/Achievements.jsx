import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, ArrowUpRight } from 'lucide-react';
import './Achievements.css';
import { client } from '../sanityClient';

const achievementsData = [
  {
    id: 1,
    title: 'Smart India Hackathon 2019',
    description: 'Participated in the Grand Finale of the Smart India Hackathon 2019 Competition.',
    link: '#' // Placeholder link
  },
  {
    id: 2,
    title: 'Core2Web Incubator Alpha Build 2020',
    description: 'Secured the Runner-Up position in the Core2Web Incubator Alpha Build 2020 Competition, highlighting proficiency and innovation in project development.',
    link: '#'
  },
  {
    id: 3,
    title: 'Spotlight Award',
    description: 'Acknowledged with the Spotlight Award for demonstrating good requirement analysis skills on the Datahub UI project.',
    link: '#'
  },
  {
    id: 4,
    title: 'Technical Innovation Award',
    description: 'Recognized and awarded the prestigious Technical Innovation Award by Lenze for my work on the OPC UA Mapping Editor project.',
    link: '#'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80 } }
};

const Achievements = () => {
  const [achievements, setAchievements] = useState(achievementsData);

  useEffect(() => {
    client
      .fetch('*[_type == "achievement"] | order(order asc)')
      .then(data => {
        if (data && data.length > 0) setAchievements(data);
      })
      .catch(err => console.warn('Achievements fetch failed, using fallback:', err.message));
  }, []);

  return (
    <section className="achievements-section">
      <motion.div 
        className="achievements-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="achievements-header">
          <div className="achievements-subtitle">
            <Award size={16} strokeWidth={2.5} />
            <span>Achievements & Certifications</span>
          </div>
        </div>

        <div className="achievements-list">
          {achievements.map((item, idx) => (
            <motion.div 
              key={item._id || idx} 
              variants={cardVariants} 
              className="achievement-card"
            >
              <div className="achievement-content">
                <div className="achievement-title-row">
                  <Award size={18} strokeWidth={2.5} />
                  {item.title}
                </div>
                <div className="achievement-desc">
                  {item.description}
                </div>
              </div>
              
              {item.link && (
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="achievement-link"
                >
                  LINK <ArrowUpRight size={14} strokeWidth={3} />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Achievements;
