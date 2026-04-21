import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import './Projects.css';

import { client, urlFor } from '../sanityClient';

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } }
};

const ProjectCard = ({ project }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const summary = project.summary || '';
  const mightTruncate = summary.length > 80;

  return (
    <motion.div variants={cardVariants} className="project-feature-card">
      <div className="project-image-wrapper">
        <img src={project.image && typeof project.image === 'object' && project.image.asset ? urlFor(project.image).width(600).url() : project.image} alt={project.title || 'Project'} className="project-image" />
      </div>
      <div className="project-content">
        <div className="project-title-row">
          <h3 className="project-title-text">{project.title}</h3>
        </div>
        
        <div 
          className="project-summary-wrapper"
          onMouseEnter={() => mightTruncate && setTooltipVisible(true)}
          onMouseLeave={() => setTooltipVisible(false)}
        >
          <p className="project-summary">{summary}</p>
          {tooltipVisible && (
             <div className="project-tooltip">{summary}</div>
          )}
        </div>

        <div className="project-footer-row">
          <div className="project-tags">
            {(project.tags || []).map((tag, i) => (
              <span key={i} className="project-tag">{tag}</span>
            ))}
          </div>
          
          <div className="project-links">
            <a href={project.githubRepo || '#'} target="_blank" rel="noreferrer" className="project-icon-btn outline" title="View Code">
              <FaGithub size={16} />
            </a>
            <a href={project.liveLink || '#'} target="_blank" rel="noreferrer" className="project-icon-btn primary" title="Live Demo">
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const fallbackProjects = [
  {
    _id: 'fallback-spotify',
    title: 'Spotify Clone',
    summary: 'It is a clone of the popular Spotify app with some tweaks. It is built completely using plain HTML, CSS, Javascript and Tailwind CSS. It uses the Spotify API to fetch the data.',
    image: 'https://picsum.photos/seed/dash/600/400',
    tags: ['HTML/CSS', 'JavaScript', 'Tailwind CSS', 'API'],
    githubRepo: 'https://github.com/saikrishhnaa/spotify-clone.git',
    liveLink: 'https://spotify-clone-sam.netlify.app',
  },
  {
    _id: 'fallback-netflix',
    title: 'Netflix Clone',
    summary: 'This project is a simply front end clone of Netflix. It was created with React. It uses the TMDB API to pull most popular movies, top rated shows, trending, and much more.',
    image: 'https://picsum.photos/seed/task/600/400',
    tags: ['React', 'TMDB API', 'CSS'],
    githubRepo: 'https://github.com/saikrishhnaa/netflix-clone.git',
    liveLink: 'http://netflix-clone-sam.netlify.app',
  },
];

const Projects = () => {
  const [projectsList, setProjectsList] = useState(fallbackProjects);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const fetchProjects = async () => {
      try {
        const query = '*[_type == "project"]';
        const data = await client.fetch(query);
        if (data && data.length > 0) setProjectsList(data);
      } catch (error) {
        console.warn('Projects fetch failed, using fallback data');
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="projects-section">
      <div className="projects-container">
        <div className="projects-header">
          <div className="projects-subtitle">
            <Code size={16} strokeWidth={2.5} />
            <span>My Projects</span>
          </div>
        </div>

        <motion.div 
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {projectsList.map((project, idx) => (
            <ProjectCard key={idx} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
