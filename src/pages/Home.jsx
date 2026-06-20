import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, ShieldAlert, FileText, BookOpen, MapPin, TrendingUp } from 'lucide-react';
import iapenBanner1 from '../assets/iapen_banner_1.png';
import iapenBanner2 from '../assets/iapen_banner_2.png';
import iapenBanner3 from '../assets/iapen_banner_3.png';
import newBanner1 from '../assets/banner_nutrition_1.jpg';
import { motion, useInView } from 'framer-motion';
import { animate } from 'framer-motion';
import { slidesData as slides, statsData as stats } from '../data/homeData';
import styles from './Home.module.css';

const AnimatedCounter = ({ from, to }) => {
  const nodeRef = React.useRef(null);

  useEffect(() => {
    const node = nodeRef.current;
    
    if (!node) return;

    const controls = animate(from, to, {
      duration: 2,
      onUpdate(value) {
        node.textContent = Math.round(value);
      },
    });

    return () => controls.stop();
  }, [from, to]);

  return <span ref={nodeRef} />;
};

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <>
      <Helmet>
        <title>Home | IAPEN India</title>
        <meta name="description" content="IAPEN India - Promoting Clinical Nutrition in India. Join us in advancing clinical nutrition research, education, and practice." />
        <meta property="og:title" content="IAPEN India | Advanced Clinical Nutrition" />
        <meta property="og:description" content="Promoting Clinical Nutrition in India. Discover courses, events, and membership benefits." />
      </Helmet>
      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="home-page animate-slide-up">
        {/* Hero Slider */}
      <section className={styles['hero-slider-section']}>
        <div className={styles['hero-grid-pattern']}></div>
        {slides.map((slide, index) => (
          <div 
            key={index} 
            className={`${styles['hero-slide']} ${index === currentSlide ? styles.active : ''}`}
            style={{ 
              backgroundImage: `linear-gradient(rgba(5, 27, 44, 0.4), rgba(5, 27, 44, 0.7)), url(${slide.image})`,
              backgroundPosition: slide.objectPosition || 'center center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className={styles['hero-content-container']}>
              <h1 className={styles['hero-typography-title']}>{slide.title}</h1>
              <Link to={slide.ctaLink} className="btn btn-primary mt-8 btn-lg">
                Explore More <ChevronRight size={20} className="ml-2" />
              </Link>
            </div>
          </div>
        ))}
        
        {/* Slider Controls */}
        <button onClick={prevSlide} className={`${styles['slider-arrow']} ${styles['arrow-left']}`} aria-label="Previous slide">
          <ChevronLeft size={24} />
        </button>
        <button onClick={nextSlide} className={`${styles['slider-arrow']} ${styles['arrow-right']}`} aria-label="Next slide">
          <ChevronRight size={24} />
        </button>
        
        {/* Slider Indicators */}
        <div className={styles['slider-indicators']}>
          {slides.map((_, index) => (
            <button 
              key={index} 
              className={`${styles['indicator-dot']} ${currentSlide === index ? styles.active : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Notice / Audit Bar */}
      <section className={styles['notice-bar']}>
        <div className={`container ${styles['notice-container']}`}>
          <div className={styles['notice-content']}>
            <ShieldAlert className={styles['notice-icon']} size={20} />
            <p className={styles['notice-text']}>
              <strong>Note*:</strong> Any member wishing to avail Financial Audit Report for the year 2024-25 can write to <a href="mailto:treasurer@iapenindia.org">treasurer@iapenindia.org</a> (Please mention your membership number and name in the mail)
            </p>
          </div>
        </div>
      </section>

      {/* Quick Downloads & Announcements */}
      <section className={`section ${styles['quick-info-section']}`}>
        <div className="container grid-3">
          <div className={`card card-accent ${styles['quick-card']}`}>
            <div className={styles['card-header-with-icon']}>
              <FileText className={`${styles['card-icon']} text-accent`} size={32} />
              <h3 className="card-title">Latest Publications</h3>
            </div>
            <p className={styles['card-desc']}>Download and view the latest quarterly clinical newsletter and circulars of IAPEN India.</p>
            <div className={styles['card-actions-list']}>
              <a 
                href="https://iapenindia.org/PDF/IAPEN-Newsletter.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles['action-link']}
              >
                View Newsletter 2025 <ChevronRight size={16} />
              </a>
            </div>
          </div>

          <div className={`card card-primary ${styles['quick-card']}`}>
            <div className={styles['card-header-with-icon']}>
              <Users className={`${styles['card-icon']} text-primary`} size={32} />
              <h3 className="card-title">Association Elections</h3>
            </div>
            <p className={styles['card-desc']}>Stay updated with the organizational and regional administrative changes within the national association.</p>
            <div className={styles['card-actions-list']}>
              <a 
                href="https://iapenindia.org/PDF/Chapter-elections-results-2025.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles['action-link']}
              >
                View Chapter Election Results 2025 <ChevronRight size={16} />
              </a>
            </div>
          </div>

          <div className={`card card-accent ${styles['quick-card']}`}>
            <div className={styles['card-header-with-icon']}>
              <Award className={`${styles['card-icon']} text-accent`} size={32} />
              <h3 className="card-title">Event Certificates</h3>
            </div>
            <p className={styles['card-desc']}>Download and verify your participation certificates for recent IAPEN India congresses and events.</p>
            <div className={styles['card-actions-list']}>
              <a 
                href="https://projects.whizsoftwares.in/certificate/certifcate_list.php?conference_id=12" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles['action-link']}
              >
                Download ICNC 2026 Certificate <ChevronRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Summary & Core Services */}
      <section className="section section-bg about-summary-section">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Who We Are</span>
            <h2 className="section-title">Advancing Nutritional Science</h2>
            <p className="section-desc">IAPEN India is at the forefront of providing education, setting guidelines, and supporting professionals engaged in clinical nutrition.</p>
          </div>
          
          <div className={`grid-3 ${styles['services-grid']}`}>
            <div className={styles['service-card']}>
              <div className={`${styles['service-icon-box']} bg-primary-light`}>
                <BookOpen size={24} className="text-primary" />
              </div>
              <h3 className={styles['service-title']}>Guidelines & Standards</h3>
              <p className={styles['service-text']}>Formulating clinical nutrition practice guidelines and position statements specific to the Indian healthcare ecosystem.</p>
            </div>

            <div className={styles['service-card']}>
              <div className={`${styles['service-icon-box']} bg-accent-light`}>
                <Calendar size={24} className="text-accent" />
              </div>
              <h3 className={styles['service-title']}>Continuing Education</h3>
              <p className={styles['service-text']}>Hosting national congresses (ICNC), lifelong learning programs (ESPEN LLL), webinars, and hands-on clinical nutrition workshops.</p>
            </div>

            <div className={styles['service-card']}>
              <div className={`${styles['service-icon-box']} bg-teal-light`}>
                <Users size={24} className="text-teal" />
              </div>
              <h3 className={styles['service-title']}>Professional Networking</h3>
              <p className={styles['service-text']}>Connecting over 5000+ clinical nutritionists, medical practitioners, dietitians, and students across 35+ local chapters.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className={`${styles['stats-section']} bg-primary-dark`}>
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="container grid-4 stats-grid"
        >
          {stats.map((stat, idx) => (
            <motion.div key={idx} variants={itemVariants} className={styles['stat-item']}>
              <div className={styles['stat-icon-wrapper']}>{stat.icon}</div>
              <motion.span 
                className={styles['stat-value']}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <AnimatedCounter from={0} to={stat.numeric} />{stat.suffix}
              </motion.span>
              <span className={styles['stat-label']}>{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Core Groups Preview */}
      <section className={`section ${styles['core-groups-preview']}`}>
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Our Specializations</span>
            <h2 className="section-title">Clinical Core Groups</h2>
            <p className="section-desc">Our volunteer experts operate in dedicated clinical core groups to target disease-specific nutritional care guidelines.</p>
          </div>

          <div className={`grid-3 ${styles['preview-groups-grid']}`}>
            <div className={styles['preview-group-card']}>
              <h4>Pediatric Nutrition</h4>
              <p>Addressing nutritional care of infants and children in hospital and community settings.</p>
            </div>
            <div className={styles['preview-group-card']}>
              <h4>Oncology Nutrition</h4>
              <p>Specialized oncology core group focuses on medical nutrition therapy in cancer patients.</p>
            </div>
            <div className={styles['preview-group-card']}>
              <h4>Critical Care</h4>
              <p>Targeting guidelines for parenteral and enteral feeding protocols in ICU environments.</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link to="/core-groups" className="btn btn-primary">
              View All 17 Core Groups <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Membership CTA Section */}
      <section className={`section bg-primary-light ${styles['membership-cta']}`}>
        <div className="container grid-2 align-center">
          <div>
            <h2 className={styles['cta-title']}>Advance Your Clinical Career</h2>
            <p className={styles['cta-desc']}>
              Get access to open-access journal research materials, discounted registration fees for national events (ICNC) and certified courses, and connect with clinical experts.
            </p>
          </div>
          <div className="text-right-md">
            <Link to="/membership" className="btn btn-accent btn-lg">
              Explore Membership Benefits
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
    </>
  );
};

export default Home;
