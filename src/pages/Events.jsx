import { useState } from 'react';
import {
  Calendar,
  MapPin,
  Award,
  ArrowRight,
  Download,
  Search,
  AlertCircle,
  X,
} from 'lucide-react';
import { certificatesDatabase } from '../data/certificates';

const Events = () => {
  const [certQuery, setCertQuery] = useState('');
  const [certConference, setCertConference] = useState('icnc2026');
  const [certResult, setCertResult] = useState(null);
  const [searchingCert, setSearchingCert] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');

  const upcomingEvents = [
    {
      title: 'Indian Clinical Nutrition Congress (ICNC 2026)',
      date: 'February 20-22, 2026',
      location: 'Pune, Maharashtra',
      type: 'Flagship Conference',
      desc: 'Join national and global experts in gastroenterology, critical care, and dietetics. Includes hands-on workshops and poster presentations.',
      brochureLink: 'https://iapenindia.org/PDF/ICNC-2026.pdf',
      color: 'card-primary',
    },
    {
      title: 'ESPEN LLL Module 3: Nutritional Support in ICU',
      date: 'September 12, 2026',
      location: 'Mumbai (Hybrid)',
      type: 'Certified Course',
      desc: 'Advanced LLL module covering septic shock nutrition, enteral tube placement strategies, and parenteral nutrition monitoring protocols.',
      brochureLink: '/courses',
      color: 'card-teal',
    },
    {
      title: 'National Webinar on Pediatric Nutrition Standards',
      date: 'November 05, 2026',
      location: 'Online Webinar',
      type: 'Continuing Education',
      desc: 'Free webinar for members detailing the localized pediatric clinical guidelines launched by the IAPEN Pediatric Core Group.',
      brochureLink: '#',
      color: 'card-accent',
    },
  ];

  const handleCertSearch = (e) => {
    e.preventDefault();
    setError('');

    const trimmedEmail = certQuery.trim().toLowerCase();
    if (!trimmedEmail) {
      setError('Email address is required');
      return;
    } else if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
      setError('Please enter a valid email address');
      return;
    }

    setSearchingCert(true);
    setSearched(true);
    setCertResult(null);

    // Dynamic local database lookup
    setTimeout(() => {
      setSearchingCert(false);
      const delegate = certificatesDatabase.find(
        (item) => item.email.toLowerCase() === trimmedEmail
      );

      const eventRecord = delegate?.events[certConference];

      if (delegate && eventRecord) {
        setCertResult({
          delegateName: delegate.delegateName,
          email: delegate.email,
          conferenceName: eventRecord.eventName,
          certId: eventRecord.certId,
          status: 'verified',
        });
      } else {
        setCertResult({
          status: 'not_found',
        });
      }
    }, 1500);
  };

  return (
    <div className="events-page animate-slide-up">
      {/* Header */}
      <section className="page-header bg-primary-dark">
        <div className="container">
          <span className="page-subtitle">Scientific Calendar</span>
          <h1 className="page-title text-white">Conferences & Events</h1>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="section upcoming-events-section">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Calendar 2026</span>
            <h2 className="section-title">Upcoming Scientific Events</h2>
            <p className="section-desc">
              Mark your calendar for the upcoming physical congresses, LLL live workshops, and
              clinical tele-seminars organized by IAPEN India.
            </p>
          </div>

          <div className="grid-3 events-grid">
            {upcomingEvents.map((evt, idx) => (
              <div key={idx} className={`card event-card-item ${evt.color}`}>
                <span className="event-type-badge">{evt.type}</span>
                <h3 className="event-title">{evt.title}</h3>

                <div className="event-meta-list mt-4">
                  <div className="event-meta-item">
                    <Calendar size={14} className="text-primary" />
                    <span>{evt.date}</span>
                  </div>
                  <div className="event-meta-item mt-2">
                    <MapPin size={14} className="text-primary" />
                    <span>{evt.location}</span>
                  </div>
                </div>

                <p className="event-desc-text mt-4">{evt.desc}</p>

                <div className="event-actions mt-6">
                  {evt.brochureLink.endsWith('.pdf') ? (
                    <a
                      href={evt.brochureLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary w-full"
                    >
                      Download Brochure <Download size={14} />
                    </a>
                  ) : (
                    <a href={evt.brochureLink} className="btn btn-outline w-full">
                      View Course Details <ArrowRight size={14} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificate Verification Portal */}
      <section className="section section-bg certificate-portal-section">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Downloads</span>
            <h2 className="section-title">Certificate Verification Portal</h2>
            <p className="section-desc">
              Search and download participation/attendance certificates for recent IAPEN conferences
              and ESPEN workshops.
            </p>
          </div>

          <div className="form-container-box glass-panel cert-portal-box">
            <h3 className="form-box-title">Search Certificate</h3>
            <p
              style={{
                fontSize: '13px',
                color: 'var(--text-muted)',
                marginBottom: '24px',
                marginTop: '-8px',
              }}
            >
              For testing, try searching: <code>president@iapenindia.org</code> or{' '}
              <code>info@iapenindia.org</code>.
            </p>

            <form onSubmit={handleCertSearch} className="cert-search-form">
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="conference">
                    Conference/Event
                  </label>
                  <select
                    id="conference"
                    className="form-select"
                    value={certConference}
                    onChange={(e) => setCertConference(e.target.value)}
                  >
                    <option value="icnc2026">ICNC 2026 Annual Congress (Pune)</option>
                    <option value="espen2025">ESPEN LLL Course 2025 (Mumbai)</option>
                    <option value="cne2025">Advanced Cancer Nutrition CNE 2025</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="certQuery">
                    Registered Email Address
                  </label>
                  <div className="input-with-icon">
                    <Search size={18} className="input-icon" />
                    <input
                      type="text"
                      id="certQuery"
                      className={`form-input ${error ? 'is-invalid' : ''}`}
                      placeholder="Enter the email used for registration"
                      value={certQuery}
                      onChange={(e) => {
                        setCertQuery(e.target.value);
                        if (error) setError('');
                      }}
                      onBlur={() => {
                        if (!certQuery.trim()) {
                          setError('Email address is required');
                        } else if (!/\S+@\S+\.\S+/.test(certQuery)) {
                          setError('Please enter a valid email address');
                        }
                      }}
                    />
                    {certQuery && (
                      <button
                        onClick={() => {
                          setCertQuery('');
                          setError('');
                        }}
                        className="clear-search-btn"
                        style={{ right: '14px' }}
                        aria-label="Clear search"
                        type="button"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                  {error && (
                    <span className="form-error">
                      <AlertCircle size={12} /> {error}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-center mt-4">
                <button
                  type="submit"
                  className="btn btn-primary w-full-md"
                  disabled={searchingCert}
                >
                  {searchingCert ? 'Searching Database...' : 'Search Certificate'}
                </button>
              </div>
            </form>

            {/* Results Display */}
            {searched && (
              <div className="cert-results-area mt-8 animate-fade">
                {searchingCert ? (
                  <div className="skeleton-card">
                    <div className="skeleton-circle"></div>
                    <div className="skeleton-title"></div>
                    <div className="skeleton-line"></div>
                    <div className="skeleton-line-short"></div>
                    <div className="skeleton-button"></div>
                    <p className="text-muted mt-2" style={{ fontSize: '13px' }}>
                      Connecting to secure certificate registry...
                    </p>
                  </div>
                ) : certResult?.status === 'verified' ? (
                  <div className="cert-success-box glass-panel text-center animate-fade">
                    <Award className="text-teal mb-4 animate-bounce" size={48} />
                    <h3>Certificate Record Verified!</h3>
                    <div className="cert-details-grid mt-4">
                      <div className="cert-detail-row">
                        <span>Delegate Name:</span> <strong>{certResult.delegateName}</strong>
                      </div>
                      <div className="cert-detail-row">
                        <span>Event:</span> <strong>{certResult.conferenceName}</strong>
                      </div>
                      <div className="cert-detail-row">
                        <span>Reference ID:</span> <code>{certResult.certId}</code>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        alert(
                          'Mock Download: Certificate PDF has been compiled and downloaded successfully!'
                        )
                      }
                      className="btn btn-accent mt-6"
                    >
                      Download PDF Certificate <Download size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="cert-error-box glass-panel text-center animate-fade">
                    <AlertCircle className="text-accent mb-4" size={48} />
                    <h3>No Certificate Record Found</h3>
                    <p className="text-muted mt-2">
                      We could not find any delegate record matching the email{' '}
                      <strong>"{certQuery}"</strong>. Please ensure the email is typed correctly or
                      check the selected event.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Past Events & Highlights */}
      <section className="section past-events-highlights-section">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Highlights</span>
            <h2 className="section-title">Glimpses from ICNC 2022</h2>
            <p className="section-desc font-semibold text-primary">
              Reflecting on the successful milestones and scientific panels of the Indian Clinical
              Nutrition Congress 2022.
            </p>
          </div>

          <div
            className="glass-panel"
            style={{
              padding: '30px',
              maxWidth: '800px',
              margin: '30px auto 0 auto',
              textAlign: 'center',
            }}
          >
            <div className="past-event-glimpse-box">
              <Award className="text-teal" size={48} style={{ margin: '0 auto 16px auto' }} />
              <h3 style={{ color: 'var(--primary-dark)', fontSize: '18px', marginBottom: '12px' }}>
                ICNC 2022 Key Takeaways
              </h3>
              <p
                className="about-text"
                style={{ fontSize: '15px', lineHeight: '1.6', color: 'var(--text-muted)' }}
              >
                The Indian Clinical Nutrition Congress 2022 brought together leading physicians,
                clinical dietitians, and pharmacologists from across India. Sessions focused on
                formulating localized guideline frameworks, enhancing ICU parenteral nutrition
                safety checklists, and advocating for structured Medical Nutrition Therapy (MNT). We
                are proud to share the scientific progress and collaborative milestones achieved
                during this congress.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
