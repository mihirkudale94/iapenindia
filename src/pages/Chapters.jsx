import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, MapPin, Mail, User, Info, Building, X } from 'lucide-react';
import { chaptersCommittees } from './../data/committees';

const Chapters = () => {
  const { hash } = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRegion, setFilterRegion] = useState('All');
  const [selectedChapter, setSelectedChapter] = useState(null);

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

  const chaptersData = [
    { name: 'Ahmedabad Chapter', state: 'Gujarat', region: 'West', coordinator: 'Dr. Ketan Patel', email: 'ahmedabad@iapenindia.org' },
    { name: 'Bangaluru Chapter', state: 'Karnataka', region: 'South', coordinator: 'Dr. Amit Gururaj Yelsangikar (President) / Ms. Suneetha Rao (Secretary)', email: 'iapenblr@gmail.com' },
    { name: 'Bhopal Chapter', state: 'Madhya Pradesh', region: 'Central', coordinator: 'Dr. Ajay Sharma', email: 'bhopal@iapenindia.org' },
    { name: 'Bhubaneswar Chapter', state: 'Odisha', region: 'East', coordinator: 'Dr. Mihir Mohanty', email: 'bhubaneswar@iapenindia.org' },
    { name: 'Chandigarh Chapter', state: 'Punjab/Haryana', region: 'North', coordinator: 'Dr. Preeti Singh', email: 'chandigarh@iapenindia.org' },
    { name: 'Chennai Chapter', state: 'Tamil Nadu', region: 'South', coordinator: 'Dr. V. Ramakrishnan', email: 'chennai@iapenindia.org' },
    { name: 'Cochin Chapter', state: 'Kerala', region: 'South', coordinator: 'Dr. Liza Jacob', email: 'cochin@iapenindia.org' },
    { name: 'Coimbatore Chapter', state: 'Tamil Nadu', region: 'South', coordinator: 'Dr. S. Karthik', email: 'coimbatore@iapenindia.org' },
    { name: 'Delhi Chapter', state: 'Delhi NCR', region: 'North', coordinator: 'Dr. Ananya Sen', email: 'delhi@iapenindia.org' },
    { name: 'Etawah Chapter', state: 'Uttar Pradesh', region: 'North', coordinator: 'Dr. R. K. Yadav', email: 'etawah@iapenindia.org' },
    { name: 'Faridabad Chapter', state: 'Haryana', region: 'North', coordinator: 'Dr. Vikram Malhotra', email: 'faridabad@iapenindia.org' },
    { name: 'Guwahati Chapter', state: 'Assam', region: 'East', coordinator: 'Dr. Jyoti Baruah', email: 'guwahati@iapenindia.org' },
    { name: 'Hyderabad Chapter', state: 'Telangana', region: 'South', coordinator: 'Dr. Srinivas Rao', email: 'hyderabad@iapenindia.org' },
    { name: 'Indore Chapter', state: 'Madhya Pradesh', region: 'Central', coordinator: 'Dr. Nidhi Chawla', email: 'indore@iapenindia.org' },
    { name: 'Kannur Chapter', state: 'Kerala', region: 'South', coordinator: 'Dr. K. Rajeevan', email: 'kannur@iapenindia.org' },
    { name: 'Kolkata Chapter', state: 'West Bengal', region: 'East', coordinator: 'Dr. Suchitra Banerjee', email: 'kolkata@iapenindia.org' },
    { name: 'Lucknow Chapter', state: 'Uttar Pradesh', region: 'North', coordinator: 'Dr. Amit Tripathi', email: 'lucknow@iapenindia.org' },
    { name: 'Ludhiana Chapter', state: 'Punjab', region: 'North', coordinator: 'Dr. G. S. Grewal', email: 'ludhiana@iapenindia.org' },
    { name: 'Mangaluru Chapter', state: 'Karnataka', region: 'South', coordinator: 'Dr. Shalini Rai', email: 'mangaluru@iapenindia.org' },
    { name: 'Meerut Chapter', state: 'Uttar Pradesh', region: 'North', coordinator: 'Dr. Saurabh Gupta', email: 'meerut@iapenindia.org' },
    { name: 'Mumbai Chapter', state: 'Maharashtra', region: 'West', coordinator: 'Dr. Ritu Sinha', email: 'mumbai@iapenindia.org' },
    { name: 'Nagpur Chapter', state: 'Maharashtra', region: 'West', coordinator: 'Dr. Nitin Deshmukh', email: 'nagpur@iapenindia.org' },
    { name: 'Nashik Chapter', state: 'Maharashtra', region: 'West', coordinator: 'Dr. Snehal Patil', email: 'nashik@iapenindia.org' },
    { name: 'Navi Mumbai Chapter', state: 'Maharashtra', region: 'West', coordinator: 'Dr. Vinay Kumar', email: 'navimumbai@iapenindia.org' },
    { name: 'Patna Chapter', state: 'Bihar', region: 'East', coordinator: 'Dr. Rajiv Ranjan', email: 'patna@iapenindia.org' },
    { name: 'Prayagraj Chapter', state: 'Uttar Pradesh', region: 'North', coordinator: 'Dr. O. P. Mishra', email: 'prayagraj@iapenindia.org' },
    { name: 'Puducherry Chapter', state: 'Puducherry', region: 'South', coordinator: 'Dr. Marie Dev', email: 'puducherry@iapenindia.org' },
    { name: 'Pune Chapter', state: 'Maharashtra', region: 'West', coordinator: 'Dr. Sanjay Agarwal (President) / Ms. Richa Shukla (Secretary)', email: 'iapenpunechapter@gmail.com' },
    { name: 'Raipur Chapter', state: 'Chhattisgarh', region: 'Central', coordinator: 'Dr. Deepa Prasad', email: 'raipur@iapenindia.org' },
    { name: 'Ranchi Chapter', state: 'Jharkhand', region: 'East', coordinator: 'Dr. Abhishek Roy', email: 'ranchi@iapenindia.org' },
    { name: 'Sambhajinagar Chapter', state: 'Maharashtra', region: 'West', coordinator: 'Dr. Anil Borse', email: 'sambhajinagar@iapenindia.org' },
    { name: 'Surat Chapter', state: 'Gujarat', region: 'West', coordinator: 'Dr. Meera Vyas', email: 'surat@iapenindia.org' },
    { name: 'Vadodara Chapter', state: 'Gujarat', region: 'West', coordinator: 'Dr. Rajesh Shah', email: 'vadodara@iapenindia.org' },
    { name: 'Varanasi Chapter', state: 'Uttar Pradesh', region: 'North', coordinator: 'Dr. Sanjay Sen', email: 'varanasi@iapenindia.org' },
    { name: 'Vijaywada Chapter', state: 'Andhra Pradesh', region: 'South', coordinator: 'Dr. P. V. Rao', email: 'vijayawada@iapenindia.org' },
    { name: 'Vizag Chapter', state: 'Andhra Pradesh', region: 'South', coordinator: 'Dr. L. S. Murthy', email: 'vizag@iapenindia.org' }
  ];

  const regions = ['All', 'North', 'South', 'East', 'West', 'Central'];

  const filteredChapters = chaptersData.filter(chapter => {
    const matchesSearch = chapter.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          chapter.state.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          chapter.coordinator.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = filterRegion === 'All' || chapter.region === filterRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="chapters-page animate-slide-up">
      {/* Header */}
      <section className="page-header bg-primary-dark">
        <div className="container">
          <span className="page-subtitle">National Network</span>
          <h1 className="page-title text-white">Regional Chapters</h1>
        </div>
      </section>

      {/* Chapters Search & Filters */}
      <section className="section chapters-section">
        <div className="container">
          <div className="section-title-wrapper">
            <h2 className="section-title">Chapters Directory</h2>
            <p className="section-desc">Search and connect with our 35+ local chapters distributed across the country to participate in regional clinical programs.</p>
          </div>

          {/* Interactive Search Controls */}
          <div className="search-filter-container glass-panel">
            <div className="search-box-wrapper">
              <Search className="search-icon" size={20} />
              <input 
                type="text" 
                placeholder="Search chapter, state, or coordinator..." 
                className="search-input-field"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')} 
                  className="clear-search-btn"
                  aria-label="Clear search"
                  type="button"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            
            <div className="region-filter-tabs">
              {regions.map((reg) => (
                <button
                  key={reg}
                  className={`region-tab-btn ${filterRegion === reg ? 'active' : ''}`}
                  onClick={() => setFilterRegion(reg)}
                >
                  {reg === 'All' ? 'All Regions' : reg}
                </button>
              ))}
            </div>
          </div>

          {/* Results Summary */}
          <div className="results-info">
            <p>Showing {filteredChapters.length} active chapters</p>
          </div>

          {/* Grid of Chapter Cards */}
          <div id="directory" className="grid-3 chapters-grid">
            {filteredChapters.map((chapter, index) => {
              const hasDetails = !!chaptersCommittees[chapter.name];
              return (
                <div 
                  key={index} 
                  className={`card chapter-card card-primary ${hasDetails ? 'cursor-pointer hover-lift' : ''}`}
                  onClick={() => {
                    if (hasDetails) {
                      setSelectedChapter({
                        name: chapter.name,
                        state: chapter.state,
                        region: chapter.region,
                        ...chaptersCommittees[chapter.name]
                      });
                    }
                  }}
                >
                  <div className="chapter-header">
                    <Building className="chapter-icon" size={24} />
                    <div>
                      <h3 className="chapter-name">{chapter.name}</h3>
                      <span className="chapter-region-badge">{chapter.region} India</span>
                    </div>
                  </div>
                  <div className="chapter-body">
                    <div className="chapter-detail-item">
                      <MapPin size={16} className="detail-icon" />
                      <span>State: <strong>{chapter.state}</strong></span>
                    </div>
                    <div className="chapter-detail-item">
                      <User size={16} className="detail-icon" />
                      <span>Coordinator: {chapter.coordinator}</span>
                    </div>
                    <div className="chapter-detail-item">
                      <Mail size={16} className="detail-icon" />
                      <span className="chapter-email-link">{chapter.email}</span>
                    </div>
                    {hasDetails && (
                      <span className="view-profile-btn mt-3 text-primary font-semibold text-sm inline-block">
                        View Committee Details &rarr;
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* No results placeholder */}
          {filteredChapters.length === 0 && (
            <div className="no-results-box text-center glass-panel">
              <Info size={48} className="text-muted mb-4" />
              <h3>No Chapters Found</h3>
              <p className="text-muted">Try searching with a different keyword or selecting a different region.</p>
            </div>
          )}
        </div>
      </section>

      {/* Chapter Committee Modal */}
      {selectedChapter && (
        <div className="modal-backdrop" onClick={() => setSelectedChapter(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '800px' }}>
            <button className="modal-close" onClick={() => setSelectedChapter(null)} aria-label="Close modal">
              <X size={24} />
            </button>
            <div className="modal-body-content">
              <div className="modal-member-header" style={{ marginBottom: '16px', paddingBottom: '16px' }}>
                <div className="modal-avatar" style={{ backgroundColor: 'var(--primary-light)' }}>
                  <Building size={36} className="text-primary" />
                </div>
                <div>
                  <h3 className="modal-member-name">{selectedChapter.name}</h3>
                  <p className="modal-member-role" style={{ color: 'var(--text-muted)' }}>
                    Region: {selectedChapter.region} India &bull; State: {selectedChapter.state}
                  </p>
                </div>
              </div>

              <div className="chapter-committee-section text-left">
                <h4 className="details-title" style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--primary-dark)', borderBottom: '2px solid var(--primary-light)', paddingBottom: '6px' }}>
                  Executive Committee Members
                </h4>
                <div className="chapter-members-list" style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxHeight: '50vh', overflowY: 'auto', paddingRight: '10px' }}>
                  {selectedChapter.members.map((member, idx) => (
                    <div key={idx} className="chapter-member-item" style={{ borderBottom: idx < selectedChapter.members.length - 1 ? '1px dashed var(--border-ultra-light)' : 'none', paddingBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                        <strong style={{ fontSize: '16px', color: 'var(--primary-dark)' }}>{member.name}</strong>
                        <span className="custom-badge bg-primary-light" style={{ fontSize: '12px' }}>{member.role}</span>
                      </div>
                      <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '6px', lineHeight: '1.5' }}>{member.details}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="chapter-contact-box" style={{ marginTop: '24px', backgroundColor: 'var(--bg-section)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-ultra-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Mail size={20} className="text-primary" />
                  <div className="text-left">
                    <strong style={{ display: 'block', fontSize: '14px', color: 'var(--primary-navy)' }}>Official Chapter Contact Email</strong>
                    <a href={`mailto:${selectedChapter.email}`} style={{ fontSize: '14px', fontWeight: '600' }}>{selectedChapter.email}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chapters;
