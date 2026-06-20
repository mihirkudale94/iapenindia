import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Award, Shield, Target, Compass, Users, User, Landmark, X } from 'lucide-react';
import { officeBearersBios, advisoryBoardBios } from './../data/biographies';

const About = () => {
  const { hash } = useLocation();
  const [selectedMember, setSelectedMember] = useState(null);

  const getBio = (name) => {
    if (officeBearersBios[name]) return officeBearersBios[name];
    if (advisoryBoardBios[name]) return advisoryBoardBios[name];
    
    const obKey = Object.keys(officeBearersBios).find(k => name.includes(k) || k.includes(name));
    if (obKey) return officeBearersBios[obKey];
    
    const abKey = Object.keys(advisoryBoardBios).find(k => name.includes(k) || k.includes(name));
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
    { name: 'Dr. P.C. Vijay Kumar', role: 'Founder President & Director', dept: 'Critical Care Physician, Sooriya Hospital, Chennai', imageColor: 'bg-primary-light' },
    { name: 'Mr. Y.T. Shivshankar', role: 'National President', dept: 'Chief Clinical Nutritionist, Tata Memorial Hospital, Mumbai', imageColor: 'bg-accent-light' },
    { name: 'Dr. Bijju Pottakat', role: 'Vice President (Medical)', dept: 'Professor & Head, HPB Surgery, JIPMER, Puducherry', imageColor: 'bg-teal-light' },
    { name: 'Ms. Lekha Sreedharan', role: 'Vice President (Nutrition)', dept: 'HOD Clinical Dietetics, Apollo Children\'s Hospital, Chennai', imageColor: 'bg-primary-light' },
    { name: 'Ms. Sreemathy Venkatraman', role: 'National Secretary', dept: 'Clinical Dietitian, Trustwell Hospital, Bangalore', imageColor: 'bg-accent-light' },
    { name: 'Ms. Sanghamitra Chakravarti', role: 'National Joint Secretary', dept: 'HOD Nutrition, Medica Superspecialty Hospital, Kolkata', imageColor: 'bg-teal-light' },
    { name: 'Ms. Anshu Mehra', role: 'Hon. Treasurer', dept: 'Associate Professor, Home Science Department, Meerut College', imageColor: 'bg-primary-light' }
  ];

  const necMembers = [
    { name: 'Dr. Latha Poopandian', role: 'NEC Member', dept: 'Consultant Intensivist & Critical Care Nutritionist, Chennai' },
    { name: 'Dr. Nihar Das', role: 'NEC Member', dept: 'GI & Transplant Surgeon, President Delhi Chapter' },
    { name: 'Dr. Rita Patil', role: 'NEC Member', dept: 'Former Vice Principal & HOD Nutrition, Nanavati College, Mumbai' },
    { name: 'Ms. Rima Rao', role: 'NEC Member', dept: 'Associate Professor Foods & Nutrition, Rajkot' },
    { name: 'Ms. Sunita Sahoo', role: 'NEC Member', dept: 'Chief Clinical Dietitian, Apollo Hospitals, Bhubaneswar' },
    { name: 'Ms. Himani Puri', role: 'NEC Member & Renal Lead', dept: 'Founder Sattva Nutricare, Chief Dietitian Apex Hospital, Nashik' },
    { name: 'Ms. Ranu Singh', role: 'NEC Member & Community Lead', dept: 'Community Nutritionist & Founder of NutritionPunch, Lucknow' }
  ];

  const advisoryBoard = [
    { name: 'Dr. Paul K. Whelton, MB, MD, MSc', institute: 'Show Schwan Chair in Global Public Health, Tulane University, USA' },
    { name: 'Prof. Dr. Ching Siew Mooi', institute: 'Professor at FPSK, Faculty of Medicine and Health Sciences, Malaysia' },
    { name: 'Dr. Gianfranco Parati, MD, FESC', institute: 'Scientific Director & HOD Cardiology, IRCCS S.Luca Hospital, Milan, Italy' },
    { name: 'Prof. Dr. Shashank R. Joshi', institute: 'Endocrinologist, Senior Consultant, Lilavati & Sir H.N. Reliance Hospitals, Mumbai' },
    { name: 'Dr. Anoop Misra', institute: 'Executive Chairman, Fortis C-DOC Hospital for Diabetes & Allied Sciences, New Delhi' },
    { name: 'Dr. Sarath Gopalan', institute: 'Senior Pediatric Gastroenterologist, Rainbow Children\'s Hospital, New Delhi, President NSI' },
    { name: 'Dr. Banshi Saboo, PhD, MD', institute: 'Chairman, Diabetes Care & Hormone Clinic, Ahmedabad, Past President RSSDI' }
  ];

  return (
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
        <div className="container grid-2 align-start">
          <div>
            <h2 className="section-title text-left">About IAPEN INDIA Association</h2>
            <p className="about-text font-semibold text-primary mb-4">
              Pioneering Excellence in Clinical Nutrition and Health Care
            </p>
            <p className="about-text">
              The IAPEN INDIA Association for Parenteral and Enteral Nutrition (IAPEN INDIA), incorporated under CIN <strong>U85320PN2019NPL186896</strong> as a Section 8 Not-for-Profit Charitable Organization, stands at the forefront of India’s nutritional healthcare revolution. Headquartered at <strong>Survey No. 8/1, Omkar Colony, Lane No. 1, Pimple Gurav, Pune, Maharashtra – 411061, India</strong>, IAPEN INDIA is dedicated to advancing the rigorous science and evidence-based practice of clinical nutrition and metabolic care.
            </p>
            <p className="about-text">
              By integrating cutting-edge research with multidisciplinary collaboration, we address the pervasive challenge of malnutrition—both disease-related and socioeconomic—in hospital, community, and long-term care settings. Our mission is rooted in the principle that optimal nutrition is not merely supportive but fundamental to physiological healing, metabolic recovery, and enhanced quality of life, as substantiated by global epidemiological data linking malnutrition to prolonged hospital stays, increased morbidity, and elevated healthcare costs.
            </p>
            <p className="about-text">
              As India’s premier national body aligned with esteemed international Parenteral and Enteral Nutrition (PEN) societies such as the European Society for Clinical Nutrition and Metabolism (<strong>ESPEN</strong>), the American Society for Parenteral and Enteral Nutrition (<strong>ASPEN</strong>), and the South Asia Association for Parenteral and Enteral Nutrition (<strong>SAPEN</strong>), IAPEN INDIA embodies a progressive, globally connected platform. We foster seamless transitions in the continuum of care, from acute hospital interventions to home-based nutritional support, employing validated tools like the Malnutrition Universal Screening Tool (<strong>MUST</strong>), Subjective Global Assessment (<strong>SGA</strong>), and <strong>GLIM criteria</strong> to ensure timely, personalized interventions. Our commitment extends to bridging gaps in nutritional epidemiology, where we advocate for policies informed by randomized controlled trials (RCTs) and meta-analyses demonstrating the efficacy of parenteral and enteral nutrition in reducing complications in critically ill patients.
            </p>
            
            <h3 className="section-subtitle mt-6" style={{ textAlign: 'left', textTransform: 'none', fontSize: '1.25rem' }}>A Multidisciplinary Association for Professional Empowerment</h3>
            <p className="about-text">
              IAPEN India unites a diverse cadre of healthcare professionals including physicians, surgeons, dietitians, nurses, pharmacists, and other healthcare professionals in a collaborative ecosystem designed to elevate clinical standards. Through interprofessional education grounded in the latest scientific literature, we empower members to implement integrated nutrition care pathways that align with international guidelines, such as those from the International Society for Clinical Nutrition and Metabolism. This approach not only mitigates risks like refeeding syndrome and micronutrient deficiencies but also promotes metabolic optimization through evidence-based protocols, including precision nutrition tailored to genetic and phenotypic profiles.
            </p>
            <p className="about-text">
              Our organizational structure under the strategic oversight of the Board of Directors propels this mission forward: the National Executive Committee (NEC) provides leadership, the National Advisory Council fosters expert advice on policy and legislative matters, formulating policies for inclusive growth, while regional Chapters and specialized Core Groups drive localized initiatives. These entities spearhead the development of position papers, consensus statements, and national guidelines, drawing on systematic reviews and cohort studies to inform best practices.
            </p>
            <p className="about-text">
              IAPEN INDIA’s progressive agenda includes robust advocacy with government agencies, non-governmental organizations (NGOs), and academic institutions and universities to influence public health policies. By collaborating with global partners, we amplify India’s voice in international forums, contributing to advancements in areas like immunonutrition and gut microbiome modulation for enhanced patient outcomes.
            </p>

            <h3 className="section-subtitle mt-6" style={{ textAlign: 'left', textTransform: 'none', fontSize: '1.25rem' }}>Driving Innovation Through Education, Research, and Global Collaboration</h3>
            <p className="about-text">
              At the heart of IAPEN India’s operations is a commitment to scientific excellence and innovation. We organize high-impact events, including national and international congresses, symposia, workshops, and webinars, featuring keynote sessions on emerging topics like nutrition in neonatal and pediatric conditions, women’s health, nutritional assessments, nutrition in metabolic diseases, nutrition in various diseases like renal, liver, cardiac, cancer, nutrigenomics, bioenergetics in critical care, and sustainable enteral and parenteral formulations.
            </p>
            <p className="about-text">
              These platforms facilitate knowledge exchange, supported by our official publications: the <strong>Journal of Nutrition Research</strong> and the <strong>Insight Newsletter</strong>, which disseminate peer-reviewed articles, systematic reviews, and clinical case studies. Our research initiatives emphasize translational science, from bench-to-bedside applications, including multicenter studies on the impact of nutrition—oral or enteral—on health outcomes and the role of pharmaconutrients in diseases. By fostering partnerships with leading institutions, IAPEN INDIA is pioneering digital tools for nutritional assessment, such as AI-driven apps for real-time metabolic monitoring, ensuring scalability across India’s diverse healthcare landscape.
            </p>

            <h3 className="section-subtitle mt-6" style={{ textAlign: 'left', textTransform: 'none', fontSize: '1.25rem' }}>Vision for a Malnutrition-Free Future: Nutrition as Everyone’s Responsibility</h3>
            <p className="about-text">
              IAPEN INDIA envisions a progressive India where clinical nutrition is embedded in every facet of healthcare, from preventive community programs to advanced tertiary care. We are committed to building resilient health systems that prioritize equity, accessibility, and evidence-based interventions, positioning ourselves as the preeminent association with a strong global presence.
            </p>
            <p className="about-text">
              IAPEN India champions a unified approach where nutrition is everyone’s responsibility. With its vision anchored in collaboration, education, and compassion, the Association continues to lead India’s movement toward better health through better nutrition and drives us to cultivate a culture of shared accountability, and address malnutrition and endorse mission statements like the <strong>"Chennai Declaration"</strong> where doctors optimize therapeutic regimens, dietitians design individualized plans, nurses monitor compliance, and pharmacists ensure safe nutrient delivery.
            </p>
          </div>
          
          <div className="mission-vision-wrapper">
            <div className="card mission-card">
              <div className="card-header-with-icon">
                <div className="icon-wrapper bg-primary-light">
                  <Target className="text-primary" size={24} />
                </div>
                <h3 className="card-title">Our Mission</h3>
              </div>
              <p className="card-text">
                To elevate the standards of enteral and parenteral clinical nutrition through scientific research, standardized academic courses, and active collaboration among multidisciplinary healthcare specialists.
              </p>
            </div>

            <div className="card vision-card mt-6">
              <div className="card-header-with-icon">
                <div className="icon-wrapper bg-teal-light">
                  <Compass className="text-teal" size={24} />
                </div>
                <h3 className="card-title">Our Vision</h3>
              </div>
              <p className="card-text">
                To eradicate hospital malnutrition in India by ensuring that every patient receives optimal clinical nutrition support as an integral part of their medical treatment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Office Bearers Section */}
      <section id="office-bearers" className="section section-bg office-bearers-section">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Leadership</span>
            <h2 className="section-title">National Office Bearers</h2>
            <p className="section-desc">Meet the national executive committee members driving the administrative and academic directives of IAPEN India.</p>
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
                        bio: bio
                      });
                    }
                  }}
                >
                  <div className={`avatar-placeholder ${bearer.imageColor}`}>
                    <User size={36} className="text-primary-navy" />
                  </div>
                  <h3 className="bearer-name">{bearer.name}</h3>
                  <span className="bearer-role">{bearer.role}</span>
                  <p className="bearer-dept">{bearer.dept}</p>
                  {isClickable && (
                    <span className="view-profile-btn mt-3 text-primary font-semibold text-sm inline-block">
                      View Profile
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="section-title-wrapper mt-12">
            <h3 className="section-title" style={{ fontSize: '1.8rem' }}>National Executive Committee Members</h3>
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
                        bio: bio
                      });
                    }
                  }}
                >
                  <div className="avatar-placeholder bg-teal-light">
                    <User size={36} className="text-teal" />
                  </div>
                  <h3 className="bearer-name">{bearer.name}</h3>
                  <span className="bearer-role">{bearer.role}</span>
                  <p className="bearer-dept">{bearer.dept}</p>
                  {isClickable && (
                    <span className="view-profile-btn mt-3 text-teal font-semibold text-sm inline-block">
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
            <p className="section-desc">Distinguished clinical professors and pioneers who guide the strategic and scientific initiatives of the association.</p>
          </div>

          <div className="grid-2 advisory-grid">
            {advisoryBoard.map((advisor, index) => {
              const bio = getBio(advisor.name);
              const isClickable = !!bio;
              return (
                <div 
                  key={index} 
                  className={`card advisor-card ${isClickable ? 'cursor-pointer hover-lift' : ''}`}
                  onClick={() => {
                    if (isClickable) {
                      setSelectedMember({
                        name: advisor.name,
                        role: advisor.institute,
                        bio: bio
                      });
                    }
                  }}
                >
                  <div className="advisor-header">
                    <Landmark className="advisor-icon" size={20} />
                    <div>
                      <h3 className="advisor-name">{advisor.name}</h3>
                      <p className="advisor-institute">{advisor.institute}</p>
                      {isClickable && (
                        <span className="view-profile-btn mt-2 text-primary font-semibold text-sm block">
                          View Profile &rarr;
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Biography Modal Overlay */}
      {selectedMember && (
        <div className="modal-backdrop" onClick={() => setSelectedMember(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedMember(null)} aria-label="Close modal">
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
                  {selectedMember.dept && <p className="modal-member-dept">{selectedMember.dept}</p>}
                </div>
              </div>
              <div className="modal-bio-text text-left">
                {selectedMember.bio.split('\n').map((para, idx) => (
                  <p key={idx} className="bio-para">{para}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
