import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Code, Compass, Home } from 'lucide-react';
import './FeaturesGrid.css';

const featuresData = [
  {
    icon: <Clock size={20} strokeWidth={2} />,
    subtitle: "Experiência",
    title: "+5 anos",
    description: "Atuação em design systems, produto e parceria com engenharia."
  },
  {
    icon: <Code size={20} strokeWidth={2} />,
    subtitle: "Front-end",
    title: "React",
    description: "Base técnica consolidada para interface, implementação e consistência de entrega."
  },
  {
    icon: <Compass size={20} strokeWidth={2} />,
    subtitle: "Estratégia principal",
    title: "Escala",
    description: "Consistência, documentação e decisão visual sustentável."
  },
  {
    icon: <Home size={20} strokeWidth={2} />,
    subtitle: "Homeoffice",
    title: "Remoto",
    description: "Colaboração multidisciplinar com times distribuídos em diferentes frentes."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60 } }
};

const FeaturesGrid = () => {
  return (
    <section className="features-section">
      <motion.div 
        className="features-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {featuresData.map((feature, index) => (
          <motion.div key={index} className="feature-card" variants={itemVariants}>
            <div className="feature-icon-wrapper">
              {feature.icon}
            </div>
            <h4 className="feature-subtitle">{feature.subtitle}</h4>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturesGrid;
