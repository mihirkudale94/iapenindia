import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import { Target, Compass, User, Landmark, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { officeBearersBios, advisoryBoardBios } from './../data/biographies';

// Office Bearers Images
import pcSir from '../assets/pc-sir.png';
import shivSir from '../assets/shivsir.png';
import dr7 from '../assets/dr7.png';
import lekhaMam from '../assets/lekhamam.png';
import smreethyMam from '../assets/smreethymam.png';
import dr8 from '../assets/dr8.png';
import dr13 from '../assets/dr13.png';

// NEC Images
import latha from '../assets/latha.png';
import niharDas from '../assets/nihar-das.jpg';
import ritaPatil from '../assets/rita-patil.png';
import reema from '../assets/reema.png';
import sahoo from '../assets/sahoo.png';
import himaniPuri from '../assets/himani-puri.png';
import ranu from '../assets/ranu.png';

// Organization Structure
import orgStructureImg from '../assets/organization-structure-image.png';

// Advisory Board Images
import whelton from '../assets/Whelton-PK-img.jpg';
import chingSiew from '../assets/ching-siew.jpg';
import parati from '../assets/GIANFRANCO-PARATI.jpg';
import shashankJoshi from '../assets/drshashank-joshi.jpg';
import anoopMishra from '../assets/anoop-mishra.jpg';
import gopalan from '../assets/Gopalan.jpg';
import bansiSaboo from '../assets/bansi-saboo-1.jpg';

const About = () => {
  const { hash } = useLocation();
  const [selectedMember, setSelectedMember] = useState(null);

  const getBio = (name) => {
    if (officeBearersBios[name]) return officeBearersBios[name];
    if (advisoryBoardBios[name]) return advisoryBoardBios[name];

    const obKey = Object.keys(officeBearersBios).find((k) => name.includes(k) || k.includes(name));
    if (obKey) return officeBearersBios[obKey];

    const abKey = Object.keys(advisoryBoardBios).find((k) => name.includes(k) || k.includes(name));
    if (abKey) return advisoryBoardBios[abKey];

    return null;
  };

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

  const officeBearers = [
    {
      name: 'Dr. P.C. Vijay Kumar',
      role: 'Founder President & Director',
      dept: 'Critical Care Physician, Sooriya Hospital, Chennai',
      image: pcSir,
    },
    {
      name: 'Mr. Y.T. Shivshankar',
      role: 'National President',
      dept: 'Chief Clinical Nutritionist, Tata Memorial Hospital, Mumbai',
      image: shivSir,
    },
    {
      name: 'Dr. Bijju Pottakat',
      role: 'Vice President (Medical)',
      dept: 'Professor & Head, HPB Surgery, JIPMER, Puducherry',
      image: dr7,
    },
    {
      name: 'Ms. Lekha Sreedharan',
      role: 'Vice President (Nutrition)',
      dept: "HOD Clinical Dietetics, Apollo Children's Hospital, Chennai",
      image: lekhaMam,
    },
    {
      name: 'Ms. Sreemathy Venkatraman',
      role: 'National Secretary',
      dept: 'Clinical Dietitian, Trustwell Hospital, Bangalore',
      image: smreethyMam,
    },
    {
      name: 'Ms. Sanghamitra Chakravarti',
      role: 'National Joint Secretary',
      dept: 'HOD Nutrition, Medica Superspecialty Hospital, Kolkata',
      image: dr8,
    },
    {
      name: 'Ms. Anshu Mehra',
      role: 'Hon. Treasurer',
      dept: 'Associate Professor, Home Science Department, Meerut College',
      image: dr13,
    },
  ];

  const necMembers = [
    {
      name: 'Dr. Latha Poopandian',
      role: 'NEC Member',
      dept: 'Consultant Intensivist & Critical Care Nutritionist, Chennai',
      image: latha,
    },
    {
      name: 'Dr. Nihar Das',
      role: 'NEC Member',
      dept: 'GI & Transplant Surgeon, President Delhi Chapter',
      image: niharDas,
    },
    {
      name: 'Dr. Rita Patil',
      role: 'NEC Member',
      dept: 'Former Vice Principal & HOD Nutrition, Nanavati College, Mumbai',
      image: ritaPatil,
    },
    {
      name: 'Ms. Rima Rao',
      role: 'NEC Member',
      dept: 'Associate Professor Foods & Nutrition, Rajkot',
      image: reema,
    },
    {
      name: 'Ms. Sunita Sahoo',
      role: 'NEC Member',
      dept: 'Chief Clinical Dietitian, Apollo Hospitals, Bhubaneswar',
      image: sahoo,
    },
    {
      name: 'Ms. Himani Puri',
      role: 'NEC Member & Renal Lead',
      dept: 'Founder Sattva Nutricare, Chief Dietitian Apex Hospital, Nashik',
      image: himaniPuri,
    },
    {
      name: 'Ms. Ranu Singh',
      role: 'NEC Member & Community Lead',
      dept: 'Community Nutritionist & Founder of NutritionPunch, Lucknow',
      image: ranu,
    },
  ];

  const advisoryBoard = [
    {
      name: 'Dr. Paul K. Whelton, MB, MD, MSc',
      institute: 'Show Schwan Chair in Global Public Health, Tulane University, USA',
      image: whelton,
    },
    {
      name: 'Prof. Dr. Ching Siew Mooi',
      institute: 'Professor at FPSK, Faculty of Medicine and Health Sciences, Malaysia',
      image: chingSiew,
    },
    {
      name: 'Dr. Gianfranco Parati, MD, FESC',
      institute: 'Scientific Director & HOD Cardiology, IRCCS S.Luca Hospital, Milan, Italy',
      image: parati,
    },
    {
      name: 'Prof. Dr. Shashank R. Joshi',
      institute:
        'Endocrinologist, Senior Consultant, Lilavati & Sir H.N. Reliance Hospitals, Mumbai',
      image: shashankJoshi,
    },
    {
      name: 'Dr. Anoop Misra',
      institute:
        'Executive Chairman, Fortis C-DOC Hospital for Diabetes & Allied Sciences, New Delhi',
      image: anoopMishra,
    },
    {
      name: 'Dr. Sarath Gopalan',
      institute:
        "Senior Pediatric Gastroenterologist, Rainbow Children's Hospital, New Delhi, President NSI",
      image: gopalan,
    },
    {
      name: 'Dr. Banshi Saboo, PhD, MD',
      institute: 'Chairman, Diabetes Care & Hormone Clinic, Ahmedabad, Past President RSSDI',
      image: bansiSaboo,
    },
  ];

  return (
    <>
      <Helmet>
        <title>About Us | IAPEN India</title>
        <meta
          name="description"
          content="Learn about IAPEN India, our mission, vision, and the esteemed office bearers and advisory board advancing clinical nutrition."
        />
      </Helmet>
      <div className="about-page animate-slide-up">
        {/* Page Header */}
        <section className="page-header bg-primary-dark">
          <div className="container">
            <span className="page-subtitle">Learn About Us</span>
            <h1 className="page-title text-white">About IAPEN India</h1>
          </div>
        </section>

        {/* History & Mission */}
        <section className="section history-section">
          <div className="container">
            <div className="about-text-wrapper">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="section-title text-left">About IAPEN INDIA Association</h2>
                <p className="about-text font-semibold text-primary mb-4">
                  Pioneering Excellence in Clinical Nutrition and Health Care
                </p>
                <p className="about-text">
                  The IAPEN INDIA Association for Parenteral and Enteral Nutrition (IAPEN INDIA),
                  incorporated under CIN <strong>U85320PN2019NPL186896</strong> as a Section 8
                  Not-for-Profit Charitable Organization, stands at the forefront of India’s
                  nutritional healthcare revolution. Headquartered at{' '}
                  <strong>
                    Survey No. 8/1, Omkar Colony, Lane No. 1, Pimple Gurav, Pune, Maharashtra –
                    411061, India
                  </strong>
                  , IAPEN INDIA is dedicated to advancing the rigorous science and evidence-based
                  practice of clinical nutrition and metabolic care.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3
                  className="section-subtitle mt-6"
                  style={{ textAlign: 'left', textTransform: 'none', fontSize: '1.25rem' }}
                >
                  A Multidisciplinary Association for Professional Empowerment
                </h3>
                <p className="about-text">
                  IAPEN India unites a diverse cadre of healthcare professionals including
                  physicians, surgeons, dietitians, nurses, pharmacists, and other healthcare
                  professionals in a collaborative ecosystem designed to elevate clinical standards.
                  Through interprofessional education grounded in the latest scientific literature,
                  we empower members to implement integrated nutrition care pathways that align with
                  international guidelines, such as those from the International Society for
                  Clinical Nutrition and Metabolism. This approach not only mitigates risks like
                  refeeding syndrome and micronutrient deficiencies but also promotes metabolic
                  optimization through evidence-based protocols, including precision nutrition
                  tailored to genetic and phenotypic profiles.
                </p>
              </motion.div>
            </div>

            <div className="grid-2 mt-10">
              <div className="card mission-card">
                <div className="card-header-with-icon">
                  <div className="icon-wrapper bg-primary-light">
                    <Target className="text-primary" size={24} />
                  </div>
                  <h3 className="card-title">Our Mission</h3>
                </div>
                <p className="card-text">
                  To elevate the standards of enteral and parenteral clinical nutrition through
                  scientific research, standardized academic courses, and active collaboration among
                  multidisciplinary healthcare specialists.
                </p>
              </div>

              <div className="card vision-card">
                <div className="card-header-with-icon">
                  <div className="icon-wrapper bg-teal-light">
                    <Compass className="text-teal" size={24} />
                  </div>
                  <h3 className="card-title">Our Vision</h3>
                </div>
                <p className="card-text">
                  To eradicate hospital malnutrition in India by ensuring that every patient
                  receives optimal clinical nutrition support as an integral part of their medical
                  treatment.
                </p>
              </div>
            </div>
          </div>

          {/* Organizational Structure - Full Width */}
          <div className="container mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="section-title-wrapper text-center">
                <h2 className="section-title">Organizational Structure</h2>
                <p className="section-desc">
                  The structural hierarchy defining IAPEN India's operations
                </p>
              </div>
              <div
                className="glass-panel"
                style={{
                  padding: '30px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--bg-white)',
                  marginTop: '30px',
                  textAlign: 'center',
                }}
              >
                <img
                  src={orgStructureImg}
                  alt="IAPEN India Organizational Structure"
                  style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Office Bearers Section */}
        <section id="office-bearers" className="section section-bg office-bearers-section">
          <div className="container">
            <div className="section-title-wrapper">
              <span className="section-subtitle">Leadership</span>
              <h2 className="section-title">National Office Bearers</h2>
              <p className="section-desc">
                Meet the national executive committee members driving the administrative and
                academic directives of IAPEN India.
              </p>
            </div>

            <div className="grid-3 office-grid">
              {officeBearers.map((bearer, index) => {
                const bio = getBio(bearer.name);
                const isClickable = !!bio;
                return (
                  <div
                    key={index}
                    className={`card bearer-card text-center ${isClickable ? 'cursor-pointer hover-lift' : ''}`}
                    onClick={() => {
                      if (isClickable) {
                        setSelectedMember({
                          name: bearer.name,
                          role: bearer.role,
                          dept: bearer.dept,
                          bio: bio,
                        });
                      }
                    }}
                  >
                    {bearer.image ? (
                      <img src={bearer.image} alt={bearer.name} className="bearer-image" />
                    ) : (
                      <div
                        className={`avatar-placeholder ${bearer.imageColor || 'bg-primary-light'}`}
                      >
                        <User size={36} className="text-primary-navy" />
                      </div>
                    )}
                    <h3 className="bearer-name">{bearer.name}</h3>
                    <span className="bearer-role">{bearer.role}</span>
                    <p className="bearer-dept">{bearer.dept}</p>
                    {isClickable && (
                      <span className="view-profile-btn mt-auto pt-4 text-primary font-semibold text-sm inline-block">
                        View Profile
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="section-title-wrapper mt-12">
              <h3 className="section-title" style={{ fontSize: '1.8rem' }}>
                National Executive Committee Members
              </h3>
            </div>

            <div className="grid-3 office-grid mt-6">
              {necMembers.map((bearer, index) => {
                const bio = getBio(bearer.name);
                const isClickable = !!bio;
                return (
                  <div
                    key={index}
                    className={`card bearer-card text-center ${isClickable ? 'cursor-pointer hover-lift' : ''}`}
                    onClick={() => {
                      if (isClickable) {
                        setSelectedMember({
                          name: bearer.name,
                          role: bearer.role,
                          dept: bearer.dept,
                          bio: bio,
                        });
                      }
                    }}
                  >
                    {bearer.image ? (
                      <img src={bearer.image} alt={bearer.name} className="bearer-image" />
                    ) : (
                      <div className="avatar-placeholder bg-teal-light">
                        <User size={36} className="text-teal" />
                      </div>
                    )}
                    <h3 className="bearer-name">{bearer.name}</h3>
                    <span className="bearer-role">{bearer.role}</span>
                    <p className="bearer-dept">{bearer.dept}</p>
                    {isClickable && (
                      <span className="view-profile-btn mt-auto pt-4 text-teal font-semibold text-sm inline-block">
                        View Profile
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Advisory Board Section */}
        <section id="advisory-board" className="section advisory-board-section">
          <div className="container">
            <div className="section-title-wrapper">
              <span className="section-subtitle">Governance</span>
              <h2 className="section-title">National Advisory Board</h2>
              <p className="section-desc">
                Distinguished clinical professors and pioneers who guide the strategic and
                scientific initiatives of the association.
              </p>
            </div>

            <div className="grid-3 office-grid">
              {advisoryBoard.map((advisor, index) => {
                const bio = getBio(advisor.name);
                const isClickable = !!bio;
                return (
                  <div
                    key={index}
                    className={`card bearer-card text-center ${isClickable ? 'cursor-pointer hover-lift' : ''}`}
                    onClick={() => {
                      if (isClickable) {
                        setSelectedMember({
                          name: advisor.name,
                          role: advisor.institute,
                          bio: bio,
                        });
                      }
                    }}
                  >
                    {advisor.image ? (
                      <img src={advisor.image} alt={advisor.name} className="bearer-image" />
                    ) : (
                      <div className="avatar-placeholder bg-primary-light">
                        <Landmark size={36} className="text-primary-navy" />
                      </div>
                    )}
                    <h3 className="bearer-name">{advisor.name}</h3>
                    <p className="bearer-dept">{advisor.institute}</p>
                    {isClickable && (
                      <span className="view-profile-btn mt-auto pt-4 text-primary font-semibold text-sm inline-block">
                        View Profile
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Biography Modal Overlay */}
        {selectedMember &&
          createPortal(
            <div className="modal-backdrop" onClick={() => setSelectedMember(null)}>
              <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <button
                  className="modal-close"
                  onClick={() => setSelectedMember(null)}
                  aria-label="Close modal"
                >
                  <X size={24} />
                </button>
                <div className="modal-body-content">
                  <div className="modal-member-header">
                    <div className="modal-avatar">
                      <User size={48} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="modal-member-name">{selectedMember.name}</h3>
                      <p className="modal-member-role">{selectedMember.role}</p>
                      {selectedMember.dept && (
                        <p className="modal-member-dept">{selectedMember.dept}</p>
                      )}
                    </div>
                  </div>
                  <div className="modal-bio-text text-left">
                    {selectedMember.bio.split('\n').map((para, idx) => (
                      <p key={idx} className="bio-para">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )}
      </div>
    </>
  );
};

export default About;
