import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import './Trajectory.css';
import { client, urlFor } from '../sanityClient';

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 80 } }
};

const fallbackExperiences = [
  {
    _id: 'fallback-1',
    year: 'Sep 2021 - Present',
    role: 'Senior Software Engineer @ Lenze',
    logoBg: '#FDE68A',
    logoText: 'CA',
    bullets: [
      'Designed and developed scalable, high-performance web applications using React.js, Vue.js, TypeScript, C#, ASP.NET, and .NET Core.',
      'Built responsive and user-centric interfaces leveraging modern UI frameworks such as Tailwind CSS, Quasar, and Ant Design Vue.',
      'Developed and integrated REST, GraphQL, and gRPC APIs to enable efficient and reliable communication between frontend and backend systems.',
      'Improved application security by implementing best practices to mitigate vulnerabilities such as XSS and SQL Injection.',
      'Deployed and managed applications using Docker and Microsoft Azure, ensuring scalability, reliability, and smooth delivery pipelines.',
      'Owned end-to-end feature delivery, including requirement analysis, system design, development, testing, and production support.',
      'Conducted code reviews, mentored team members, and contributed to technical interviews and hiring.',
    ],
  },
  {
    _id: 'fallback-2',
    year: 'Feb 2021 - Sep 2021',
    role: 'Software Engineer Intern @ Cuelogic Technologies | An LTI Company',
    logoBg: '#FFFFFF',
    logoText: 'SX',
    bullets: [
      'Gained hands-on experience in web development by working with HTML, CSS, JavaScript, Python, and Flask through structured training and practical assignments.',
      'Successfully designed and delivered a POC application, demonstrating end-to-end development using frontend and backend technologies.',
    ],
  },
];

const Trajectory = () => {
  const [experiences, setExperiences] = useState(fallbackExperiences);

  useEffect(() => {
    client
      .fetch('*[_type == "trajectory"] | order(order asc)')
      .then(data => {
        if (data && data.length > 0) setExperiences(data);
      })
      .catch(err => console.warn('Trajectory fetch failed, using fallback:', err.message));
  }, []);

  return (
    <section className="trajectory-section">
      <div className="trajectory-container">
        <div className="trajectory-header">
          <div className="trajectory-subtitle">
            <Clock size={16} strokeWidth={2.5} />
            <span>Trajectory</span>
          </div>
        </div>

        <motion.div 
          className="trajectory-list"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {experiences.map((exp, idx) => (
            <motion.div key={idx} variants={itemVariants} className="trajectory-item">
              <div className="item-logo">
                {exp.companyLogo ? (
                  <img src={urlFor(exp.companyLogo).width(160).url()} alt={exp.role} className="trajectory-company-image" />
                ) : (
                  <span>{exp.logoText || 'L'}</span>
                )}
              </div>
              <div className="item-content">
                <div className="item-year">{exp.year}</div>
                <div className="item-role">{exp.role}</div>
                <ul className="item-bullets">
                  {exp.bullets?.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Trajectory;
