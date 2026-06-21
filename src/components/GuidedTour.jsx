import { useEffect, useState } from 'react';
import { useDemo } from './DemoContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, X, Play, Milestone } from 'lucide-react';

const TOUR_STEPS = [
  {
    title: 'Welcome to IAPEN India',
    text: 'Let\'s take a 1-minute guided tour of our modern, client-ready portal designed for medical nutrition specialists.',
    selector: null,
    position: 'center'
  },
  {
    title: 'Interactive Hero Banner',
    text: 'A high-impact banner highlighting key campaigns (e.g. Clinical Nutrition, Annual Congress 2026, and ESPEN LLL training courses).',
    selector: 'section[class*="hero-slider-section"]',
    position: 'bottom'
  },
  {
    title: 'Audit & Accountability Bar',
    text: 'Prominently features regulatory notifications and direct coordinator emails for members seeking official financial reports.',
    selector: 'section[class*="notice-bar"]',
    position: 'bottom'
  },
  {
    title: 'Publications & Verification Hub',
    text: 'Quick access buttons to view scientific newsletters, verify chapter election results, and download congress certificates.',
    selector: 'section[class*="quick-info-section"]',
    position: 'top'
  },
  {
    title: 'Dynamic Statistics Counter',
    text: 'Real-time counters showcasing active chapters, core groups, registered professionals, and yearly educational webinars.',
    selector: 'section[class*="stats-section"]',
    position: 'top'
  },
  {
    title: 'Professional Member Portal',
    text: 'A secure gateway for registered clinical professionals with role-based access for members, coordinators, and national administrators.',
    selector: '.top-member-portal-btn',
    position: 'bottom'
  },
  {
    title: 'Agentic AI Support Assistant',
    text: 'Click here to query our database or request a human coordinator for membership, events, and education support.',
    selector: '.support-widget-fab',
    position: 'left'
  }
];

const GuidedTour = () => {
  const { tourStep, setTourStep } = useDemo();
  const [highlightStyle, setHighlightStyle] = useState(null);

  useEffect(() => {
    if (tourStep < 0 || tourStep >= TOUR_STEPS.length) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHighlightStyle(null);
      return;
    }

    const step = TOUR_STEPS[tourStep];
    if (!step.selector) {
      setHighlightStyle(null);
      return;
    }

    const element = document.querySelector(step.selector);
    if (element) {
      // Scroll to element
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Calculate position
      const updatePosition = () => {
        const rect = element.getBoundingClientRect();
        setHighlightStyle({
          top: `${rect.top + window.scrollY - 8}px`,
          left: `${rect.left + window.scrollX - 8}px`,
          width: `${rect.width + 16}px`,
          height: `${rect.height + 16}px`,
        });
      };

      // Wait a short duration for scrolling to finish before updating bounding rect
      const timeout = setTimeout(updatePosition, 300);
      window.addEventListener('resize', updatePosition);
      
      return () => {
        clearTimeout(timeout);
        window.removeEventListener('resize', updatePosition);
      };
    } else {
      setHighlightStyle(null);
    }
  }, [tourStep]);

  if (tourStep < 0 || tourStep >= TOUR_STEPS.length) return null;

  const currentStep = TOUR_STEPS[tourStep];

  const handleNext = () => {
    setTourStep(prev => prev + 1);
  };

  const handlePrev = () => {
    setTourStep(prev => prev - 1);
  };

  const handleClose = () => {
    setTourStep(-1);
  };

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 99999 }}>
      {/* Dimmed Overlay Backdrop */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(5, 27, 44, 0.45)',
          backdropFilter: 'blur(3px)',
          pointerEvents: 'auto',
          zIndex: 99998
        }}
        onClick={handleClose}
      />

      {/* Target Element Highlight Box */}
      {highlightStyle && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            position: 'absolute',
            ...highlightStyle,
            boxShadow: '0 0 0 9999px rgba(5, 27, 44, 0.65), 0 0 15px var(--accent)',
            border: '2.5px solid var(--accent)',
            borderRadius: '12px',
            zIndex: 99998,
            pointerEvents: 'none'
          }}
        />
      )}

      {/* Tooltip Dialog Card */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            zIndex: 99999,
            pointerEvents: 'auto',
            ...(currentStep.position === 'center' ? {
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              maxWidth: '480px'
            } : currentStep.position === 'left' ? {
              bottom: '96px',
              right: '96px',
              maxWidth: '350px'
            } : {
              bottom: '40px',
              left: '50%',
              transform: 'translateX(-50%)',
              maxWidth: '520px'
            }),
            width: 'calc(100% - 40px)',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(11, 60, 93, 0.15)',
            boxShadow: '0 20px 45px rgba(5, 27, 44, 0.25), 0 2px 5px rgba(0,0,0,0.05)',
            borderRadius: '16px',
            padding: '24px',
            color: '#051b2c',
            textAlign: 'left'
          }}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              color: '#94a3b8'
            }}
          >
            <X size={18} />
          </button>

          {/* Heading */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Milestone size={18} className="text-accent" style={{ color: 'var(--accent)' }} />
            <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '800', fontFamily: 'var(--font-heading)', color: 'var(--primary-dark)' }}>
              {currentStep.title}
            </h4>
          </div>

          {/* Body Text */}
          <p style={{ margin: '0 0 20px 0', fontSize: '13px', color: '#4e5d6c', lineHeight: 1.5 }}>
            {currentStep.text}
          </p>

          {/* Controls Footer */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Step Indicators */}
            <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600' }}>
              Step {tourStep + 1} of {TOUR_STEPS.length}
            </span>

            {/* Navigation buttons */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {tourStep > 0 && (
                <button
                  onClick={handlePrev}
                  className="btn btn-outline btn-sm"
                  style={{
                    padding: '6px 12px',
                    fontSize: '11px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <ChevronLeft size={12} /> Back
                </button>
              )}
              {tourStep < TOUR_STEPS.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="btn btn-primary btn-sm"
                  style={{
                    padding: '6px 12px',
                    fontSize: '11px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  Next <ChevronRight size={12} />
                </button>
              ) : (
                <button
                  onClick={handleClose}
                  className="btn btn-accent btn-sm"
                  style={{
                    padding: '6px 12px',
                    fontSize: '11px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  Finish Tour <Play size={12} />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default GuidedTour;
