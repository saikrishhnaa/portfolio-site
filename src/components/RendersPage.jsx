import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Monitor } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import './RendersPage.css';
import { client } from '../sanityClient';


const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90 } }
};

const RenderCard = ({ item }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  // Support both Sanity field name (youtubeId) and fallback field name (videoId)
  const videoId = item.youtubeId || item.videoId || '';
  const githubUrl = item.githubRepo || item.githubUrl || '#';
  const description = item.description || '';
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  const mightTruncate = description.length > 80;

  return (
    <motion.div variants={cardVariants} className="render-card">
      {/* Embeddable YouTube iframe */}
      <div className="render-video-wrapper">
        {videoId ? (
          <iframe
            src={embedUrl}
            title={item.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            className="render-iframe"
          />
        ) : (
          <div className="render-iframe" style={{ background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No video</div>
        )}
      </div>

      <div className="render-info">
        <h3 className="render-title">{item.title}</h3>

        <div
          className="render-desc-wrapper"
          onMouseEnter={() => mightTruncate && setTooltipVisible(true)}
          onMouseLeave={() => setTooltipVisible(false)}
        >
          <p className="render-desc">{description}</p>
          {tooltipVisible && (
            <div className="render-tooltip">{description}</div>
          )}
        </div>

        <div className="render-tags-row">
          <div className="render-tags">
            {(item.tags || []).map((tag, i) => (
              <span key={i} className="render-tag">{tag}</span>
            ))}
          </div>
          
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="render-github-inline-btn"
            title="View Source Code"
          >
            <FaGithub size={16} />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const fallbackRenders = [
  {
    _id: 'fallback-r1',
    title: 'A Aa Aai Song',
    description: "I've created this beautiful engaging OpenGL graphics demo based on the beloved Marathi song 'A Aa Aai', crafted with C++ and the Win32 SDK to bring cultural artistry into real-time graphics.",
    tags: ['C++ Language', 'Win32 SDK', 'OpenGL'],
    videoId: '9LPdPsIkkHE',
    githubUrl: 'https://github.com/saikrishhnaa',
  },
  {
    _id: 'fallback-r2',
    title: "Perspective Group's Logo Animation",
    description: 'Delighted to showcase our Perspective Group Logo animation demo, meticulously crafted using OpenGL and C++ — a seamless blend of aesthetic precision and real-time rendering wizardry.',
    tags: ['C++ Language', 'OpenGL'],
    videoId: 'uY4C57MjGRI',
    githubUrl: 'https://github.com/saikrishhnaa',
  },
  {
    _id: 'fallback-r3',
    title: 'My Name Animation',
    description: '🌈 In this mesmerizing demo, I brought to life the magic of OpenGL by showcasing letters moving in a beautifully orchestrated animation — crafted entirely with C++ and the Win32 SDK.',
    tags: ['C++ Language', 'Win32 SDK', 'OpenGL'],
    videoId: 'iM5cpjcVQdM',
    githubUrl: 'https://github.com/saikrishhnaa',
  },
  {
    _id: 'fallback-r4',
    title: "DHANANJAY'S Birthday Special",
    description: 'A surprise birthday animation rendered in real-time using OpenGL FFP and C++, featuring theatrical curtain effects and celebratory visuals crafted with care.',
    tags: ['C++ Language', 'OpenGL FFP'],
    videoId: 'eA5rpQYYEks',
    githubUrl: 'https://github.com/saikrishhnaa',
  },
  {
    _id: 'fallback-r5',
    title: 'Happy 77th Independence Day',
    description: "A patriotic OpenGL tribute rendered in real-time celebrating India's 77th Independence Day, featuring the tricolour and iconic national imagery.",
    tags: ['C++ Language', 'OpenGL FFP'],
    videoId: 'Yp4u8C1Q5mo',
    githubUrl: 'https://github.com/saikrishhnaa',
  },
  {
    _id: 'fallback-r6',
    title: '"Vijayotsav" by Perspective',
    description: '🪔 A festival of victory — Vijayotsav is a real-time OpenGL animation showcasing temple silhouettes against a glowing sunset, symbolizing triumph and culture.',
    tags: ['C++ Language', 'OpenGL FFP'],
    videoId: '7lvOipkrSE0',
    githubUrl: 'https://github.com/saikrishhnaa',
  },
  {
    _id: 'fallback-r7',
    title: 'Anjanichya Suta Tula',
    description: 'A devotional real-time OpenGL animation inspired by the Hanuman devotional song, rendered with C++ and FFP pipeline featuring dynamic light and character motion.',
    tags: ['C++ Language', 'OpenGL FFP'],
    videoId: 'OVD9AmHlKc0',
    githubUrl: 'https://github.com/saikrishhnaa',
  },
];

const RendersPage = () => {
  const [rendersList, setRendersList] = useState(fallbackRenders);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const fetchRenders = async () => {
      try {
        const query = '*[_type == "render"]';
        const data = await client.fetch(query);
        // Temporarily commented out to always show all hardcoded videos
        // if (data && data.length > 0) setRendersList(data);
      } catch (error) {
        console.warn('Renders fetch failed, using fallback data');
      }
    };
    fetchRenders();
  }, []);

  return (
    <section className="renders-section">
      <motion.div
        className="renders-header-box"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="renders-subtitle">
          <Monitor size={16} strokeWidth={2.5} />
          <span>Graphics Programming & HPC</span>
        </div>
        <h1 className="renders-main-title">VISUAL COMPUTING</h1>
      </motion.div>

      <div className="renders-container">
        <div className="renders-subtitle-row">
          <Code size={16} strokeWidth={2.5} />
          <span>Projects Demo</span>
        </div>

        <motion.div
          className="renders-grid"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {rendersList.map((item, idx) => (
            <RenderCard key={item._id || idx} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default RendersPage;
