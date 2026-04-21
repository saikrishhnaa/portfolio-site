import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { writeClient } from '../sanityClient';
import './ContactModal.css';

const ContactModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [validationError, setValidationError] = useState('');
  
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      // Reset form on close
      setEmail('');
      setSubject('');
      setMessage('');
      setIsSubmitting(false);
      setSubmitStatus(null);
      setErrorMessage('');
      setValidationError('');
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!email || !message) {
      setValidationError("Please provide at least your email and a message.");
      return;
    }

    setValidationError('');
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      if (!import.meta.env.VITE_SANITY_WRITE_TOKEN) {
        console.warn("Missing VITE_SANITY_WRITE_TOKEN. Demo resolving...");
        await new Promise(r => setTimeout(r, 800));
        setSubmitStatus('success');
      } else {
        await writeClient.create({
          _type: 'contactMessage',
          email,
          subject,
          message
        });
        setSubmitStatus('success');
      }
    } catch (error) {
      console.error("Submission failed:", error);
      setSubmitStatus('error');
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            className="modal-content"
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <div className="modal-header">
              <div className="modal-title-box">
                <span className="modal-greeting">Hello.</span>
                <h2 className="modal-title">Let's discuss your next project.</h2>
              </div>
              <button className="modal-close-btn" onClick={onClose} disabled={isSubmitting}>
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>

            {submitStatus === 'success' ? (
              <div className="modal-success-view">
                <div className="success-icon-wrapper">
                  <div className="success-check">✓</div>
                </div>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for reaching out. I'll get back to you as soon as possible.</p>
                <button className="modal-btn cancel mt-4" onClick={onClose}>
                  Close Window
                </button>
              </div>
            ) : (
              <>
                <div className="modal-body">
                  {validationError && <div className="validation-error">{validationError}</div>}
                  {submitStatus === 'error' && <div className="validation-error">Failed: {errorMessage}</div>}
                  <div className="form-group">
                <label>Your email</label>
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label>Subject</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Project Inquiry, Consultation, Networking" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea 
                  className="form-textarea" 
                  placeholder="Please provide the details of your inquiry..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value.slice(0, 800))}
                  disabled={isSubmitting}
                ></textarea>
                <div className="char-counter">
                  {message.length} / 800
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="modal-btn cancel" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </button>
              <button className="modal-btn send" onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
            </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
