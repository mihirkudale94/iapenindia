import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, ShieldAlert, Award, FileText, Calendar, BookOpen, Users, Globe, MapPin, TrendingUp, GraduationCap } from 'lucide-react';
import heroClinicalNutrition from '../assets/hero_clinical_nutrition.png';
import heroNutritionCongress from '../assets/hero_nutrition_congress.png';
import heroEspenTraining from '../assets/hero_espen_training.png';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Promoting Clinical Nutrition in India',
      subtitle: 'Indian Association for Parenteral and Enteral Nutrition (IAPEN India)',
      description: 'Advancing clinical nutrition research, developing standard guidelines, and fostering collaboration among doctors, dietitians, and healthcare professionals.',
      ctaText: 'Become a Member',
      ctaLink: '/membership',
      bgGradient: 'linear-gradient(135deg, var(--primary-navy) 0%, var(--primary) 100%)',
      image: heroClinicalNutrition,
    },
    {
      title: 'Indian Clinical Nutrition Congress 2026',
      subtitle: 'ICNC 2026 - The Premier Nutrition Event',
      description: 'Join leading medical specialists, dietitians, and research scholars to discuss advancements, emerging tech in parenteral/enteral care, and Medical Nutrition Therapy (MNT).',
      ctaText: 'View Event Details',
      ctaLink: '/events',
      bgGradient: 'linear-gradient(135deg, var(--teal) 0%, var(--primary) 100%)',
      image: heroNutritionCongress,
    },
    {
      title: 'ESPEN Lifelong Learning (LLL) Courses',
      subtitle: 'Standardized Global Certification',
      description: 'In partnership with ESPEN, IAPEN India brings certified clinical nutrition training courses taught by national and international experts.',
      ctaText: 'Explore Courses',
      ctaLink: '/courses',
      bgGradient: 'linear-gradient(135deg, var(--primary-navy) 0%, var(--accent) 100%)',
      image: heroEspenTraining,
    }
  ];

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

  const stats = [
    { value: '35+', label: 'Active Chapters', icon: <Globe size={24} /> },
    { value: '17+', label: 'Clinical Core Groups', icon: <Users size={24} /> },
    { value: '5000+', label: 'Registered Professionals', icon: <Award size={24} /> },
    { value: '25+', label: 'Educational CNEs Yearly', icon: <Calendar size={24} /> }
  ];

  return (
    <div className="home-page animate-slide-up">
      {/* Hero Slider */}
      <section className="hero-slider-section">
        <div 
          className="hero-slide" 
          style={{ background: slides[currentSlide].bgGradient }}
        >
          <div className="container hero-container animate-fade">
            <div>
              <span className="hero-subtitle">{slides[currentSlide].subtitle}</span>
              <h1 className="hero-title">{slides[currentSlide].title}</h1>
              <p className="hero-description">{slides[currentSlide].description}</p>
              <div className="hero-actions">
                <Link to={slides[currentSlide].ctaLink} className="btn btn-accent btn-lg">
                  {slides[currentSlide].ctaText} <ChevronRight size={18} />
                </Link>
                <Link to="/about" className="btn btn-white-border btn-lg">
                  Learn More
                </Link>
              </div>
            </div>

            {/* Right column: 3D floating graphic banners and badges */}
            <div className="hero-graphic-panel">
              <div className="hero-image-wrapper">
                <img 
                  src={slides[currentSlide].image} 
                  alt={slides[currentSlide].title} 
                  className="hero-main-image" 
                />
                {currentSlide === 0 && (
                  <>
                    <div className="hero-floating-card card-top-left animate-float">
                      <div className="hero-graphic-icon">
                        <Globe size={18} />
                      </div>
                      <div className="hero-graphic-info">
                        <h4>35+ Chapters</h4>
                        <p>Across India</p>
                      </div>
                    </div>
                    <div className="hero-floating-card card-bottom-right animate-float" style={{ animationDelay: '1.5s' }}>
                      <div className="hero-graphic-icon">
                        <Award size={18} />
                      </div>
                      <div className="hero-graphic-info">
                        <h4>5000+ Members</h4>
                        <p>Doctors & Dietitians</p>
                      </div>
                    </div>
                  </>
                )}
                {currentSlide === 1 && (
                  <>
                    <div className="hero-floating-card card-top-left animate-float">
                      <div className="hero-graphic-icon">
                        <Calendar size={18} />
                      </div>
                      <div className="hero-graphic-info">
                        <h4>Feb 20-22, 2026</h4>
                        <p>Congress Dates</p>
                      </div>
                    </div>
                    <div className="hero-floating-card card-bottom-right animate-float" style={{ animationDelay: '1.5s' }}>
                      <div className="hero-graphic-icon">
                        <MapPin size={18} />
                      </div>
                      <div className="hero-graphic-info">
                        <h4>Pune, MH</h4>
                        <p>Physical Venue</p>
                      </div>
                    </div>
                  </>
                )}
                {currentSlide === 2 && (
                  <>
                    <div className="hero-floating-card card-top-left animate-float">
                      <div className="hero-graphic-icon">
                        <BookOpen size={18} />
                      </div>
                      <div className="hero-graphic-info">
                        <h4>ESPEN Partner</h4>
                        <p>Global Certification</p>
                      </div>
                    </div>
                    <div className="hero-floating-card card-bottom-right animate-float" style={{ animationDelay: '1.5s' }}>
                      <div className="hero-graphic-icon">
                        <TrendingUp size={18} />
                      </div>
                      <div className="hero-graphic-info">
                        <h4>CNE Credits</h4>
                        <p>Earn standard credits</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Slider Controls */}
        <button onClick={prevSlide} className="slider-arrow arrow-left" aria-label="Previous slide">
          <ChevronLeft size={24} />
        </button>
        <button onClick={nextSlide} className="slider-arrow arrow-right" aria-label="Next slide">
          <ChevronRight size={24} />
        </button>
        
        {/* Slider Indicators */}
        <div className="slider-indicators">
          {slides.map((_, index) => (
            <button 
              key={index} 
              className={`indicator-dot ${currentSlide === index ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Notice / Audit Bar */}
      <section className="notice-bar">
        <div className="container notice-container">
          <div className="notice-content">
            <ShieldAlert className="notice-icon" size={20} />
            <p className="notice-text">
              <strong>Notice:</strong> Any active IAPEN member wishing to receive the Financial Audit Report for the financial year 2024-25 can email us at <a href="mailto:treasurer@iapenindia.org">treasurer@iapenindia.org</a>. Please specify your name and membership number.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Downloads & Announcements */}
      <section className="section quick-info-section">
        <div className="container grid-2">
          <div className="card card-accent quick-card">
            <div className="card-header-with-icon">
              <FileText className="card-icon text-accent" size={32} />
              <h3 className="card-title">Latest Publications</h3>
            </div>
            <p className="card-desc">Download and view the latest quarterly clinical newsletter and circulars of IAPEN India.</p>
            <div className="card-actions-list">
              <a 
                href="https://iapenindia.org/PDF/IAPEN-Newsletter.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="action-link"
              >
                Download IAPEN India Newsletter 2025 (PDF) <ChevronRight size={16} />
              </a>
            </div>
          </div>

          <div className="card card-primary quick-card">
            <div className="card-header-with-icon">
              <Users className="card-icon text-primary" size={32} />
              <h3 className="card-title">Association Elections</h3>
            </div>
            <p className="card-desc">Stay updated with the organizational and regional administrative changes within the national association.</p>
            <div className="card-actions-list">
              <a 
                href="https://iapenindia.org/PDF/Chapter-elections-results-2025.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="action-link"
              >
                View Chapter Elections Results 2025 <ChevronRight size={16} />
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
          
          <div className="grid-3 services-grid">
            <div className="service-card">
              <div className="service-icon-box bg-primary-light">
                <BookOpen size={24} className="text-primary" />
              </div>
              <h3 className="service-title">Guidelines & Standards</h3>
              <p className="service-text">Formulating clinical nutrition practice guidelines and position statements specific to the Indian healthcare ecosystem.</p>
            </div>

            <div className="service-card">
              <div className="service-icon-box bg-accent-light">
                <Calendar size={24} className="text-accent" />
              </div>
              <h3 className="service-title">Continuing Education</h3>
              <p className="service-text">Hosting national congresses (ICNC), lifelong learning programs (ESPEN LLL), webinars, and hands-on clinical nutrition workshops.</p>
            </div>

            <div className="service-card">
              <div className="service-icon-box bg-teal-light">
                <Users size={24} className="text-teal" />
              </div>
              <h3 className="service-title">Professional Networking</h3>
              <p className="service-text">Connecting over 5000+ clinical nutritionists, medical practitioners, dietitians, and students across 35+ local chapters.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-section bg-primary-dark">
        <div className="container grid-4 stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-item">
              <div className="stat-icon-wrapper">{stat.icon}</div>
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Core Groups Preview */}
      <section className="section core-groups-preview">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Our Specializations</span>
            <h2 className="section-title">Clinical Core Groups</h2>
            <p className="section-desc">Our volunteer experts operate in dedicated clinical core groups to target disease-specific nutritional care guidelines.</p>
          </div>

          <div className="grid-3 preview-groups-grid">
            <div className="preview-group-card">
              <h4>Pediatric Nutrition</h4>
              <p>Addressing nutritional care of infants and children in hospital and community settings.</p>
            </div>
            <div className="preview-group-card">
              <h4>Oncology Nutrition</h4>
              <p>Specialized oncology core group focuses on medical nutrition therapy in cancer patients.</p>
            </div>
            <div className="preview-group-card">
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
      <section className="section bg-primary-light membership-cta">
        <div className="container grid-2 align-center">
          <div>
            <h2 className="cta-title">Advance Your Clinical Career</h2>
            <p className="cta-desc">
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
    </div>
  );
};

export default Home;
