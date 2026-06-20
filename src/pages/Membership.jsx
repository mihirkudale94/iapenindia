import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { Check, User, Briefcase, Award, Sparkles } from 'lucide-react';
import RegistrationSection from '../components/RegistrationSection';
import { lifeBenefits, studentBenefits, pricingTiers } from '../data/membershipData';

const Membership = () => {
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

  return (
    <>
      <Helmet>
        <title>Membership | IAPEN India</title>
        <meta
          name="description"
          content="Join IAPEN India. Discover membership benefits, fees, and apply online to become a part of India's leading clinical nutrition community."
        />
      </Helmet>
      <div className="membership-page animate-slide-up">
        {/* Header */}
        <section className="page-header bg-primary-dark">
          <div className="container">
            <span className="page-subtitle">Join the Association</span>
            <h1 className="page-title text-white">Professional Membership</h1>
          </div>
        </section>

        {/* Benefits and Pricing */}
        <section className="section benefits-section">
          <div className="container">
            <div className="grid-2 align-start">
              <div>
                <h2 className="section-title text-left">Why Join IAPEN India?</h2>
                <p className="about-text font-semibold text-primary mb-4">
                  IAPEN INDIA welcomes all aspiring health care professionals who wish to become a
                  Life Member of IAPEN INDIA and get connected to millions of health care
                  professionals from across the globe through its international affiliates.
                </p>

                <div
                  className="benefits-columns mt-6"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '20px',
                  }}
                >
                  <div
                    className="glass-panel"
                    style={{
                      padding: '24px',
                      borderRadius: 'var(--radius-lg)',
                      background:
                        'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,245,250,0.5))',
                      border: '1px solid rgba(11,60,93,0.1)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '16px',
                      }}
                    >
                      <div
                        style={{
                          padding: '10px',
                          background: 'var(--primary-light)',
                          borderRadius: '12px',
                          color: 'var(--primary)',
                        }}
                      >
                        <Briefcase size={24} />
                      </div>
                      <h3 style={{ fontSize: '18px', color: 'var(--primary-navy)', margin: 0 }}>
                        Life Membership
                      </h3>
                    </div>
                    <ul
                      className="benefits-checklist"
                      style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
                    >
                      {lifeBenefits.map((benefit, idx) => (
                        <li
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '12px',
                            fontSize: '14px',
                            color: 'var(--text-muted)',
                          }}
                        >
                          <Check
                            size={16}
                            style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }}
                          />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    className="glass-panel"
                    style={{
                      padding: '24px',
                      borderRadius: 'var(--radius-lg)',
                      background:
                        'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(242,250,254,0.5))',
                      border: '1px solid rgba(32,128,168,0.1)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '16px',
                      }}
                    >
                      <div
                        style={{
                          padding: '10px',
                          background: 'var(--teal-light)',
                          borderRadius: '12px',
                          color: 'var(--teal)',
                        }}
                      >
                        <User size={24} />
                      </div>
                      <h3 style={{ fontSize: '18px', color: 'var(--teal)', margin: 0 }}>
                        Student Membership
                      </h3>
                    </div>
                    <ul
                      className="benefits-checklist"
                      style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
                    >
                      {studentBenefits.map((benefit, idx) => (
                        <li
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '12px',
                            fontSize: '14px',
                            color: 'var(--text-muted)',
                          }}
                        >
                          <Check
                            size={16}
                            style={{ color: 'var(--teal)', flexShrink: 0, marginTop: '2px' }}
                          />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="glass-panel benefits-sidebar">
                <Award className="text-accent sidebar-icon-large" size={48} />
                <h3>Certified Standards</h3>
                <p>
                  Our members are recognized nationally for adhering to ethical and evidence-based
                  nutrition protocols. Membership provides credentials that reflect commitment to
                  professional excellence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Tiers */}
        <section className="section section-bg pricing-section">
          <div className="container">
            <div className="section-title-wrapper">
              <span className="section-subtitle">Categories</span>
              <h2 className="section-title">Membership Pricing</h2>
              <p className="section-desc">
                Select the category that corresponds to your profession. Student pricing is
                available for active undergraduate and postgraduate students.
              </p>
            </div>

            <div className="grid-3 pricing-grid">
              {pricingTiers.map((tier, index) => (
                <div
                  key={index}
                  className={`card pricing-card ${tier.color} ${tier.popular ? 'popular-card' : ''}`}
                >
                  {tier.popular && (
                    <div className="popular-badge">
                      <Sparkles size={12} /> Popular
                    </div>
                  )}
                  <span className="tier-badge">{tier.badge}</span>
                  <h3 className="tier-title">{tier.title}</h3>
                  <div className="tier-price-box">
                    <span className="tier-price">{tier.price}</span>
                    <span className="tier-type">/ {tier.type}</span>
                  </div>

                  <ul className="tier-features">
                    {tier.features.map((feat, idx) => (
                      <li key={idx}>
                        <Check size={14} className="text-teal" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="#register" className="btn btn-primary w-full mt-6">
                    Select & Register
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form Extracted Component */}
        <RegistrationSection />
      </div>
    </>
  );
};

export default Membership;
