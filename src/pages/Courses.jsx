import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BookOpen, Award, CheckCircle, GraduationCap, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const Courses = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  const lllTopics = [
    'Nutritional Support in ICU & Sepsis',
    'Nutrition Support in Cancer Patients',
    'Nutritional Support in Gastrointestinal Diseases',
    'Nutrition in Pediatric & Neonatal Practice',
    'Nutritional Support in Renal & Hepatic Failure',
    'Home Parenteral & Enteral Feeding',
  ];

  return (
    <div className="courses-page animate-slide-up">
      {/* Header */}
      <section className="page-header bg-primary-dark">
        <div className="container">
          <span className="page-subtitle">Educational Programs</span>
          <h1 className="page-title text-white">Courses & Certifications</h1>
        </div>
      </section>

      {/* General & Specialist Courses */}
      <section className="section courses-overview-section">
        <div className="container grid-2 align-center">
          <div>
            <span className="section-subtitle">Online Learning</span>
            <h2 className="section-title text-left">Lifestyle Management and Hypertension</h2>
            <p className="about-text">
              IAPEN India offers specialized training programs in cardiovascular and diabetes
              lifestyle management. Our featured online learning modules help clinicians implement
              sodium-restricted and DASH-based protocols for hypertension management.
            </p>
            <p className="about-text">
              This course is hosted in collaboration with Docmode. For registrations and curriculum
              details, click the official link below or query our coordination team.
            </p>
            <div className="hero-actions mt-6">
              <a
                href="https://iapen.docmode.org/view/lifestyle-management-and-hypertension/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Access Hypertension Course
              </a>
              <a href="mailto:iapendiabetes@gmail.com" className="btn btn-outline">
                Contact: iapendiabetes@gmail.com
              </a>
            </div>
          </div>
          <div className="glass-panel benefits-sidebar">
            <BookOpen className="text-primary sidebar-icon-large" size={48} />
            <h3>Hypertension Course Details</h3>
            <p>
              Master localized sodium-reduction guidelines and lifestyle interventions for
              hypertension, endorsed by the national core group panels.
            </p>
          </div>
        </div>
      </section>

      {/* ESPEN LLL Section */}
      <section id="espen-lll" className="section section-bg espen-lll-section">
        <div className="container">
          <div className="grid-2 align-center">
            <div className="course-image-placeholder glass-panel">
              <GraduationCap className="text-primary icon-giant" size={64} />
              <div className="course-badges">
                <span className="course-badge-item bg-primary-light text-primary">
                  ESPEN Endorsed
                </span>
                <span className="course-badge-item bg-accent-light text-accent">
                  Global Standard
                </span>
              </div>
            </div>

            <div>
              <span className="section-subtitle">Core Program</span>
              <h2 className="section-title text-left">ESPEN LLL Programme</h2>
              <p className="about-text">
                The Life-Long Learning (LLL) Programme in Clinical Nutrition and Metabolism is an
                innovative educational initiative of ESPEN (European Society for Clinical Nutrition
                and Metabolism).
              </p>
              <p className="about-text">
                As the official partner, IAPEN India conducts these courses across the country. The
                curriculum offers modular certified training for medical doctors, dietitians,
                pharmacists, and nutritional scientists.
              </p>

              <div className="course-meta-grid mt-4">
                <div className="course-meta-item">
                  <Clock size={16} className="text-primary" />
                  <span>
                    Format: <strong>Live Workshops & Online Portal</strong>
                  </span>
                </div>
                <div className="course-meta-item">
                  <Award size={16} className="text-primary" />
                  <span>
                    Credits: <strong>CNE / CME Points & ESPEN Credits</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Topics Visual Roadmap */}
          <div className="topics-container mt-12 mb-8">
            <h3
              className="topics-heading text-center"
              style={{ fontSize: '24px', marginBottom: '40px' }}
            >
              ESPEN LLL Learning Roadmap
            </h3>
            <div style={{ position: 'relative', padding: '20px 0' }}>
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '0',
                  right: '0',
                  height: '4px',
                  background: 'var(--border-ultra-light)',
                  zIndex: 0,
                  transform: 'translateY(-50%)',
                  borderRadius: '4px',
                }}
              ></div>
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '0',
                  width: '70%',
                  height: '4px',
                  background: 'var(--primary)',
                  zIndex: 1,
                  transform: 'translateY(-50%)',
                  borderRadius: '4px',
                }}
              ></div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '20px',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                {lllTopics.map((topic, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    style={{
                      background: 'var(--bg-white)',
                      padding: '20px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-light)',
                      boxShadow: 'var(--shadow-sm)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      position: 'relative',
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: idx < 4 ? 'var(--primary)' : 'var(--bg-white)',
                        border: idx < 4 ? 'none' : '2px solid var(--border-light)',
                        color: idx < 4 ? 'white' : 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '16px',
                        zIndex: 3,
                      }}
                    >
                      {idx < 4 ? (
                        <CheckCircle size={20} />
                      ) : (
                        <span style={{ fontWeight: 'bold' }}>{idx + 1}</span>
                      )}
                    </div>
                    <span
                      style={{ fontSize: '14px', fontWeight: '600', color: 'var(--primary-dark)' }}
                    >
                      {topic}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ESPEN Membership Info */}
      <section id="espen-membership" className="section espen-membership-section">
        <div className="container grid-2 align-center">
          <div>
            <span className="section-subtitle">Membership</span>
            <h2 className="section-title text-left">ESPEN Block Membership</h2>
            <p className="about-text">
              Active members of IAPEN India are eligible to apply for dual block membership with
              ESPEN at highly subsidized rates. Dual block membership must be renewed annually.
            </p>
            <p className="about-text font-semibold text-primary mb-3">
              ESPEN Block Membership Fees (inclusive of GST):
            </p>
            <ul className="rules-list mb-4">
              <li>
                <strong>Junior Members</strong> (Under 35 years of age): <strong>₹5,000</strong> per
                year
              </li>
              <li>
                <strong>Senior Members</strong> (Above 65 years of age): <strong>₹5,000</strong> per
                year
              </li>
              <li>
                <strong>Regular Members</strong> (Other age brackets): <strong>₹10,000</strong> per
                year
              </li>
            </ul>
            <p className="about-text text-muted mb-4" style={{ fontSize: '0.9rem' }}>
              *Note: It is mandatory to hold an active membership of IAPEN India to apply for ESPEN
              Block Membership. Applications are typically accepted till Jan 20th.
            </p>

            <div className="hero-actions mt-6">
              <a
                href="https://docs.google.com/forms/d/1Q43W1QKOPw8rty90Z-7kjFSPxIh52djOMsDq6BmKeXc/edit"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Apply for Block Membership
              </a>
              <a href="mailto:pencommunication@iapenindia.org" className="btn btn-outline">
                Queries: pencommunication@iapenindia.org
              </a>
            </div>
          </div>

          <div className="glass-panel benefits-sidebar">
            <BookOpen className="text-teal sidebar-icon-large" size={48} />
            <h3>ESPEN Journal Access</h3>
            <p>
              Subsidized membership opens access to the official peer-reviewed scientific journals
              of ESPEN, keeping you at the bleeding edge of clinical research.
            </p>
          </div>
        </div>
      </section>

      {/* T-LLL Teacher Eligibility */}
      <section id="t-lll" className="section t-lll-section">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Advanced Training</span>
            <h2 className="section-title">Eligibility for T-LLL (Teacher LLL)</h2>
            <p className="section-desc">
              Learn how to become a certified national instructor/faculty for ESPEN LLL courses in
              India.
            </p>
          </div>

          <div className="grid-2 t-lll-rules-grid">
            <div className="card rules-card">
              <h3 className="rules-title">Prerequisites for IAPEN India & ESPEN T-LLL:</h3>
              <ul className="rules-list mt-4">
                <li>
                  <strong>IAPEN Life Membership</strong> (Mandatory).
                </li>
                <li>
                  <strong>ESPEN Block Membership</strong> for the last 3 consecutive years.
                </li>
                <li>
                  <strong>Significant Contribution:</strong> Office bearer for min. 5 years at
                  Chapter level (or 2 years nationally), OR conducted 5+ workshops/seminars, OR
                  published 2+ articles in the <em>Journal of Nutrition Research</em>, OR recruited
                  15+ life members.
                </li>
                <li>
                  <strong>ESPEN Criteria:</strong> Age &gt; 35 years, completed 3 LLL live courses
                  (12 credits) and 3 online LLL topics (8 credits).
                </li>
              </ul>
            </div>

            <div className="card rules-card card-accent">
              <h3 className="rules-title">Application & Verification:</h3>
              <p className="card-text mt-4">
                To request a Letter of Recommendation, send your short CV, completed ESPEN
                application form, and confirmed ESPEN Congress registration to{' '}
                <strong>president@iapenindia.org</strong> and{' '}
                <strong>pencommunication@iapenindia.org</strong> not later than{' '}
                <strong>31st May</strong>.
              </p>
              <p className="card-text mt-2" style={{ fontSize: '0.85rem', opacity: 0.9 }}>
                <em>Disclaimer:</em> Certified T-LLL teachers are bound by agreement with IAPEN
                India not to conduct ESPEN LLL programs with competing associations in India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Past ESPEN LLL Courses & Highlights Section */}
      <section id="past-highlights" className="section section-bg past-highlights-section">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Milestones</span>
            <h2 className="section-title">Past ESPEN LLL Courses & Highlights</h2>
            <p className="section-desc">
              We have a rich history of organizing standardized clinical nutrition courses across
              major medical centers in India.
            </p>
          </div>

          <div
            className="timeline-container mt-8"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '30px',
              maxWidth: '800px',
              margin: '0 auto',
            }}
          >
            {/* 2024 Course */}
            <div className="card timeline-card" style={{ padding: '24px' }}>
              <span
                className="custom-badge bg-primary-light text-primary"
                style={{ fontSize: '12px' }}
              >
                March 2024
              </span>
              <h3
                style={{
                  fontSize: '20px',
                  marginTop: '10px',
                  color: 'var(--primary-dark)',
                  textAlign: 'left',
                }}
              >
                ESPEN LLL Course 2024 - Mumbai
              </h3>
              <p className="about-text mt-3" style={{ fontSize: '15px', lineHeight: '1.6' }}>
                Sharing stupendous success of the ESPEN LLL Course 2024 at Sahara Star, Mumbai @ICNC
                2024.😊
              </p>
              <p
                className="about-text mt-2"
                style={{ fontSize: '15px', lineHeight: '1.6', color: 'var(--text-muted)' }}
              >
                We at IAPEN INDIA are humbled by all the smiles and positive feedbacks of satisfied
                learners and in gratitude of the eminent faculties Dr Perundurai Chinnaswamy
                Vijayakumar Sir, Biju Pottakkat Sir, Shivshankar Timmanpyati Sir, Prof Rocco
                Barazzoni, Prof Rémy Meier, Mansi Gupta Patil , Datta Patel , Bidita Shah , Dr
                Jayasshree Toddkar Madam, Dr Harish Ambekar for their support. IAPEN INDIA strives
                to continue this journey of contributing towards evidence based learnings.
              </p>
            </div>

            {/* 2023 Course */}
            <div className="card timeline-card" style={{ padding: '24px' }}>
              <span className="custom-badge bg-teal-light text-teal" style={{ fontSize: '12px' }}>
                February 2023
              </span>
              <h3
                style={{
                  fontSize: '20px',
                  marginTop: '10px',
                  color: 'var(--primary-dark)',
                  textAlign: 'left',
                }}
              >
                Physical ESPEN LLL Course - Chennai
              </h3>
              <p className="about-text mt-3" style={{ fontSize: '15px', lineHeight: '1.6' }}>
                Successful completion of the Physical ESPEN LLL Course- a programme in Clinical
                Nutrition and Metabolism is based on an Educational Curriculum offering more than
                120 training modules, created and peer-reviewed by recognized experts in the field
                during #ICNC2023 at Chennai.
              </p>
              <p
                className="about-text mt-2"
                style={{ fontSize: '15px', lineHeight: '1.6', color: 'var(--text-muted)' }}
              >
                With super attendance of around 75 participants for each module, and with eminent
                International and National ESPEN faculties like Prof Remy Meier, Prof Rocco
                Barazzoni, Dr Veeradej Pisprasert, Dr Shilpa Varma, Dr Bidita Shah and also Dr P C
                Vijayakumar, Dr Biju Pottakat, Shivshankar Timmanpyati amongst few, this was a very
                well recieved and successful course.
              </p>
            </div>

            {/* 2022 Course */}
            <div className="card timeline-card" style={{ padding: '24px' }}>
              <span
                className="custom-badge bg-accent-light text-accent"
                style={{ fontSize: '12px' }}
              >
                March 2022
              </span>
              <h3
                style={{
                  fontSize: '20px',
                  marginTop: '10px',
                  color: 'var(--primary-dark)',
                  textAlign: 'left',
                }}
              >
                ESPEN LLL Virtual Course
              </h3>
              <p className="about-text mt-3" style={{ fontSize: '15px', lineHeight: '1.6' }}>
                A successful ESPEN LLL virtual course conducted by IAPEN INDIA on 10, 11, 12th March
                2022 . Course Cordinator Dr. Shilpa Varma
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;
