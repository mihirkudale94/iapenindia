import { useState } from 'react';
import { BookOpen, CheckCircle, ExternalLink, ShieldCheck, ChevronDown } from 'lucide-react';

const Journal = () => {
  const [expandedArticle, setExpandedArticle] = useState(null);

  const toggleArticle = (idx) => {
    if (expandedArticle === idx) {
      setExpandedArticle(null);
    } else {
      setExpandedArticle(idx);
    }
  };

  const indexing = [
    'Google Scholar',
    'Index Copernicus (ICV: 85.4)',
    'Crossref (DOI assignment)',
    'Directory of Research Journals Indexing (DRJI)',
    'Scientific Indexing Services (SIS)',
  ];

  const articles = [
    {
      title:
        'Efficacy of early enteral nutrition in geriatric ICU patients with sepsis: A randomized controlled trial',
      authors: 'Dr. Mansi Patil, Dr. Amit Bhardwaj, Dr. Suresh Awale',
      abstract:
        'Sepsis remains a primary cause of mortality in intensive care units. This randomized trial investigates the clinical impact of early enteral feeding (within 24 hours of ICU admission) compared to delayed enteral feeding protocols on 28-day mortality, systemic inflammatory markers, and gut mucosal barrier integrity in elderly Indian patients.',
    },
    {
      title:
        'Parenteral nutrition protocols in pediatric oncology: A multi-center observational study in India',
      authors: 'Dr. Sunita Sharma, Dr. Liza Jacob, Dr. Rajesh Nair',
      abstract:
        'Pediatric cancer patients undergoing intensive chemotherapy regimens face acute nutritional challenges and severe mucosal toxicity. This multi-center study compiles clinical outcomes of a standardized parenteral feeding checklist on skeletal muscle index preservation and therapy compliance rates.',
    },
  ];

  return (
    <div className="journal-page animate-slide-up">
      {/* Header */}
      <section className="page-header bg-primary-dark">
        <div className="container">
          <span className="page-subtitle">Official Publication</span>
          <h1 className="page-title text-white">Journal of Nutrition Research</h1>
        </div>
      </section>

      {/* Main Journal Info */}
      <section className="section journal-intro-section">
        <div className="container grid-2 align-center">
          <div>
            <span className="section-subtitle">About the Journal</span>
            <h2 className="section-title text-left">Journal of Nutrition Research</h2>
            <p className="about-text">
              The **Journal of Nutrition Research** (E-ISSN: 2348-1064) is the official,
              open-access, peer-reviewed international scientific publication of the Indian
              Association for Parenteral and Enteral Nutrition (IAPEN India).
            </p>
            <p className="about-text">
              The journal is dedicated to publishing original research, clinical trials, reviews,
              case reports, and guidelines covering all fields of basic, clinical, applied, and
              community nutrition.
            </p>

            <div className="journal-metadata-list mt-4">
              <div className="metadata-tag">
                <strong>E-ISSN:</strong> 2348-1064
              </div>
              <div className="metadata-tag">
                <strong>Frequency:</strong> Bi-annual
              </div>
              <div className="metadata-tag">
                <strong>Format:</strong> Online Open-Access
              </div>
            </div>

            <div className="hero-actions mt-6">
              <a
                href="https://jnutres.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Visit Journal Website <ExternalLink size={14} />
              </a>
              <a
                href="https://jnutres.com/submit"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Submit Manuscript
              </a>
            </div>
          </div>

          <div className="journal-cover-mock glass-panel">
            <BookOpen className="text-primary icon-cover-large" size={80} />
            <div className="cover-title-box">
              <h3>Journal of Nutrition Research</h3>
              <p>Peer Reviewed & Open Access</p>
            </div>
            <span className="e-issn-label">E-ISSN 2348-1064</span>
          </div>
        </div>
      </section>

      {/* Current Issue Articles */}
      <section className="section section-bg current-issue-section">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Volume 13, Issue 1 (2025)</span>
            <h2 className="section-title">Latest Published Abstracts</h2>
            <p className="section-desc">
              Explore peer-reviewed scientific articles published in the current issue of the
              Journal of Nutrition Research.
            </p>
          </div>

          <div
            className="articles-list"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              maxWidth: '900px',
              margin: '0 auto',
            }}
          >
            {articles.map((art, idx) => (
              <div
                key={idx}
                className={`card group-accordion-card ${expandedArticle === idx ? 'expanded-card' : ''}`}
                style={{ cursor: 'pointer' }}
                onClick={() => toggleArticle(idx)}
              >
                <div className="group-header" style={{ padding: '24px' }}>
                  <div>
                    <span
                      className="custom-badge bg-primary-light text-primary"
                      style={{ fontSize: '10px' }}
                    >
                      Original Research
                    </span>
                    <h3
                      style={{
                        fontSize: '18px',
                        marginTop: '10px',
                        color: 'var(--primary-dark)',
                        textAlign: 'left',
                      }}
                    >
                      {art.title}
                    </h3>
                    <p
                      className="text-muted"
                      style={{ fontSize: '13px', marginTop: '4px', textAlign: 'left' }}
                    >
                      Authors: <strong>{art.authors}</strong>
                    </p>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`group-arrow ${expandedArticle === idx ? 'rotate' : ''}`}
                  />
                </div>

                <div className={`group-body ${expandedArticle === idx ? 'expanded' : ''}`}>
                  <div style={{ padding: '24px', borderTop: '1px dashed var(--border-light)' }}>
                    <h4
                      style={{
                        fontSize: '13px',
                        textTransform: 'uppercase',
                        color: 'var(--primary-navy)',
                        letterSpacing: '0.05em',
                        marginBottom: '8px',
                      }}
                    >
                      Abstract:
                    </h4>
                    <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                      {art.abstract}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scope and Indexing */}
      <section className="section journal-scope-section">
        <div className="container grid-2">
          {/* Scope */}
          <div className="card card-primary">
            <h3 className="scope-title">Key Subject Areas & Scope</h3>
            <ul className="benefits-checklist mt-4">
              <li>
                <div className="checklist-icon-box">
                  <CheckCircle size={14} />
                </div>
                <span>Enteral and Parenteral Nutrition protocols and complications.</span>
              </li>
              <li>
                <div className="checklist-icon-box">
                  <CheckCircle size={14} />
                </div>
                <span>Medical Nutrition Therapy (MNT) for metabolic diseases.</span>
              </li>
              <li>
                <div className="checklist-icon-box">
                  <CheckCircle size={14} />
                </div>
                <span>Pediatric, geriatric, and oncology nutritional care.</span>
              </li>
              <li>
                <div className="checklist-icon-box">
                  <CheckCircle size={14} />
                </div>
                <span>Functional foods, nutraceuticals, and bioactive diet compounds.</span>
              </li>
            </ul>
          </div>

          {/* Indexing */}
          <div className="card card-accent">
            <h3 className="scope-title">Abstracting and Indexing</h3>
            <p className="card-desc">
              The journal is indexed in several reputable digital registries to ensure maximum
              visibility for published papers.
            </p>
            <ul className="benefits-checklist">
              {indexing.map((ind, idx) => (
                <li key={idx}>
                  <div className="checklist-icon-box">
                    <ShieldCheck size={14} className="text-teal" />
                  </div>
                  <span>{ind}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Journal;
