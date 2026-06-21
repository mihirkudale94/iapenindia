import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import { Search, MapPin, Mail, User, Info, Building, X } from 'lucide-react';
import { chaptersCommittees } from './../data/committees';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { motion } from 'framer-motion';

const geoUrl = 'https://raw.githubusercontent.com/gramener/mapviewer/init/test/india-states.geojson';

const chaptersData = [
  {
    name: 'Ahmedabad Chapter',
    state: 'Gujarat',
    region: 'West',
    coordinator: 'Dr. Ketan Patel',
    email: 'ahmedabad@iapenindia.org',
    coordinates: [72.5714, 23.0225],
  },
  {
    name: 'Bangaluru Chapter',
    state: 'Karnataka',
    region: 'South',
    coordinator: 'Dr. Amit Gururaj Yelsangikar (President) / Ms. Suneetha Rao (Secretary)',
    email: 'iapenblr@gmail.com',
    coordinates: [77.5946, 12.9716],
  },
  {
    name: 'Bhopal Chapter',
    state: 'Madhya Pradesh',
    region: 'Central',
    coordinator: 'Dr. Ajay Sharma',
    email: 'bhopal@iapenindia.org',
    coordinates: [77.4126, 23.2599],
  },
  {
    name: 'Bhubaneswar Chapter',
    state: 'Odisha',
    region: 'East',
    coordinator: 'Dr. Mihir Mohanty',
    email: 'bhubaneswar@iapenindia.org',
    coordinates: [85.8245, 20.2961],
  },
  {
    name: 'Chandigarh Chapter',
    state: 'Punjab/Haryana',
    region: 'North',
    coordinator: 'Dr. Preeti Singh',
    email: 'chandigarh@iapenindia.org',
    coordinates: [76.7794, 30.7333],
  },
  {
    name: 'Chennai Chapter',
    state: 'Tamil Nadu',
    region: 'South',
    coordinator: 'Dr. V. Ramakrishnan',
    email: 'chennai@iapenindia.org',
    coordinates: [80.2707, 13.0827],
  },
  {
    name: 'Cochin Chapter',
    state: 'Kerala',
    region: 'South',
    coordinator: 'Dr. Liza Jacob',
    email: 'cochin@iapenindia.org',
    coordinates: [76.2673, 9.9312],
  },
  {
    name: 'Coimbatore Chapter',
    state: 'Tamil Nadu',
    region: 'South',
    coordinator: 'Dr. S. Karthik',
    email: 'coimbatore@iapenindia.org',
    coordinates: [76.9558, 11.0168],
  },
  {
    name: 'Delhi Chapter',
    state: 'Delhi NCR',
    region: 'North',
    coordinator: 'Dr. Ananya Sen',
    email: 'delhi@iapenindia.org',
    coordinates: [77.209, 28.6139],
  },
  {
    name: 'Etawah Chapter',
    state: 'Uttar Pradesh',
    region: 'North',
    coordinator: 'Dr. R. K. Yadav',
    email: 'etawah@iapenindia.org',
    coordinates: [79.0193, 26.773],
  },
  {
    name: 'Faridabad Chapter',
    state: 'Haryana',
    region: 'North',
    coordinator: 'Dr. Vikram Malhotra',
    email: 'faridabad@iapenindia.org',
    coordinates: [77.3178, 28.4089],
  },
  {
    name: 'Guwahati Chapter',
    state: 'Assam',
    region: 'East',
    coordinator: 'Dr. Jyoti Baruah',
    email: 'guwahati@iapenindia.org',
    coordinates: [91.7362, 26.1445],
  },
  {
    name: 'Hyderabad Chapter',
    state: 'Telangana',
    region: 'South',
    coordinator: 'Dr. Srinivas Rao',
    email: 'hyderabad@iapenindia.org',
    coordinates: [78.4867, 17.385],
  },
  {
    name: 'Indore Chapter',
    state: 'Madhya Pradesh',
    region: 'Central',
    coordinator: 'Dr. Nidhi Chawla',
    email: 'indore@iapenindia.org',
    coordinates: [75.8577, 22.7196],
  },
  {
    name: 'Kannur Chapter',
    state: 'Kerala',
    region: 'South',
    coordinator: 'Dr. K. Rajeevan',
    email: 'kannur@iapenindia.org',
    coordinates: [75.3704, 11.8745],
  },
  {
    name: 'Kolkata Chapter',
    state: 'West Bengal',
    region: 'East',
    coordinator: 'Dr. Suchitra Banerjee',
    email: 'kolkata@iapenindia.org',
    coordinates: [88.3639, 22.5726],
  },
  {
    name: 'Lucknow Chapter',
    state: 'Uttar Pradesh',
    region: 'North',
    coordinator: 'Dr. Amit Tripathi',
    email: 'lucknow@iapenindia.org',
    coordinates: [80.9462, 26.8467],
  },
  {
    name: 'Ludhiana Chapter',
    state: 'Punjab',
    region: 'North',
    coordinator: 'Dr. G. S. Grewal',
    email: 'ludhiana@iapenindia.org',
    coordinates: [75.8573, 30.901],
  },
  {
    name: 'Mangaluru Chapter',
    state: 'Karnataka',
    region: 'South',
    coordinator: 'Dr. Shalini Rai',
    email: 'mangaluru@iapenindia.org',
    coordinates: [74.856, 12.9141],
  },
  {
    name: 'Meerut Chapter',
    state: 'Uttar Pradesh',
    region: 'North',
    coordinator: 'Dr. Saurabh Gupta',
    email: 'meerut@iapenindia.org',
    coordinates: [77.7082, 28.9845],
  },
  {
    name: 'Mumbai Chapter',
    state: 'Maharashtra',
    region: 'West',
    coordinator: 'Dr. Ritu Sinha',
    email: 'mumbai@iapenindia.org',
    coordinates: [72.8777, 19.076],
  },
  {
    name: 'Nagpur Chapter',
    state: 'Maharashtra',
    region: 'West',
    coordinator: 'Dr. Nitin Deshmukh',
    email: 'nagpur@iapenindia.org',
    coordinates: [79.0882, 21.1458],
  },
  {
    name: 'Nashik Chapter',
    state: 'Maharashtra',
    region: 'West',
    coordinator: 'Dr. Snehal Patil',
    email: 'nashik@iapenindia.org',
    coordinates: [73.7898, 19.9975],
  },
  {
    name: 'Navi Mumbai Chapter',
    state: 'Maharashtra',
    region: 'West',
    coordinator: 'Dr. Vinay Kumar',
    email: 'navimumbai@iapenindia.org',
    coordinates: [73.0297, 19.033],
  },
  {
    name: 'Patna Chapter',
    state: 'Bihar',
    region: 'East',
    coordinator: 'Dr. Rajiv Ranjan',
    email: 'patna@iapenindia.org',
    coordinates: [85.1376, 25.5941],
  },
  {
    name: 'Prayagraj Chapter',
    state: 'Uttar Pradesh',
    region: 'North',
    coordinator: 'Dr. O. P. Mishra',
    email: 'prayagraj@iapenindia.org',
    coordinates: [81.8463, 25.4358],
  },
  {
    name: 'Puducherry Chapter',
    state: 'Puducherry',
    region: 'South',
    coordinator: 'Dr. Marie Dev',
    email: 'puducherry@iapenindia.org',
    coordinates: [79.8083, 11.9416],
  },
  {
    name: 'Pune Chapter',
    state: 'Maharashtra',
    region: 'West',
    coordinator: 'Dr. Sanjay Agarwal (President) / Ms. Richa Shukla (Secretary)',
    email: 'iapenpunechapter@gmail.com',
    coordinates: [73.8567, 18.5204],
  },
  {
    name: 'Raipur Chapter',
    state: 'Chhattisgarh',
    region: 'Central',
    coordinator: 'Dr. Deepa Prasad',
    email: 'raipur@iapenindia.org',
    coordinates: [81.6296, 21.2514],
  },
  {
    name: 'Ranchi Chapter',
    state: 'Jharkhand',
    region: 'East',
    coordinator: 'Dr. Abhishek Roy',
    email: 'ranchi@iapenindia.org',
    coordinates: [85.3096, 23.3441],
  },
  {
    name: 'Sambhajinagar Chapter',
    state: 'Maharashtra',
    region: 'West',
    coordinator: 'Dr. Anil Borse',
    email: 'sambhajinagar@iapenindia.org',
    coordinates: [75.3433, 19.8762],
  },
  {
    name: 'Surat Chapter',
    state: 'Gujarat',
    region: 'West',
    coordinator: 'Dr. Meera Vyas',
    email: 'surat@iapenindia.org',
    coordinates: [72.8311, 21.1702],
  },
  {
    name: 'Vadodara Chapter',
    state: 'Gujarat',
    region: 'West',
    coordinator: 'Dr. Rajesh Shah',
    email: 'vadodara@iapenindia.org',
    coordinates: [73.1812, 22.3072],
  },
  {
    name: 'Varanasi Chapter',
    state: 'Uttar Pradesh',
    region: 'North',
    coordinator: 'Dr. Sanjay Sen',
    email: 'varanasi@iapenindia.org',
    coordinates: [82.9739, 25.3176],
  },
  {
    name: 'Vijayawada Chapter',
    state: 'Andhra Pradesh',
    region: 'South',
    coordinator: 'Dr. P. V. Rao',
    email: 'vijayawada@iapenindia.org',
    coordinates: [80.648, 16.5062],
  },
  {
    name: 'Vizag Chapter',
    state: 'Andhra Pradesh',
    region: 'South',
    coordinator: 'Dr. L. S. Murthy',
    email: 'vizag@iapenindia.org',
    coordinates: [83.2185, 17.6868],
  },
];

const getPastelColor = (stateName) => {
  if (!stateName) return '#f1f5f9';
  let hash = 0;
  for (let i = 0; i < stateName.length; i++) {
    hash = stateName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colors = [
    '#ffe4e6', // Soft Rose
    '#d1fae5', // Soft Mint Green
    '#dbeafe', // Soft Sky Blue
    '#e0e7ff', // Soft Lavender Blue
    '#ffedd5', // Soft Peach/Orange
    '#fef9c3', // Soft Pastel Yellow
    '#ccfbf1', // Soft Teal
  ];
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

const MapChart = ({ chapters, selectedState, onStateClick }) => {
  const [hoveredState, setHoveredState] = useState(null);

  return (
    <div
      style={{
        width: '100%',
        height: '450px',
        background: 'rgba(5, 27, 44, 0.03)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid rgba(11, 60, 93, 0.1)',
        overflow: 'hidden',
        marginBottom: '40px',
        position: 'relative',
      }}
    >
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 1000, center: [82, 22] }}
        style={{ width: '100%', height: '100%' }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const stateName = geo.properties.ST_NM;
              // Check if chapters exist in this state
              const chaptersInState = chapters.filter(
                (c) => c.state.toLowerCase() === stateName.toLowerCase()
              );
              const isSelected = selectedState && selectedState.toLowerCase() === stateName.toLowerCase();

              // Styling color variables
              const stateBaseColor = getPastelColor(stateName);
              let fillColour = stateBaseColor;
              if (isSelected) {
                fillColour = 'var(--accent)'; // Highlighted gold
              }

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={fillColour}
                  stroke={isSelected ? '#051b2c' : '#b8c6d4'}
                  strokeWidth={isSelected ? 1.5 : 0.5}
                  onMouseEnter={() => {
                    setHoveredState({
                      name: stateName,
                      count: chaptersInState.length,
                    });
                  }}
                  onMouseLeave={() => {
                    setHoveredState(null);
                  }}
                  onClick={() => {
                    onStateClick(stateName);
                  }}
                  style={{
                    default: { 
                      outline: 'none', 
                      transition: 'all 200ms ease' 
                    },
                    hover: {
                      fill: isSelected ? 'var(--accent)' : 'var(--primary)',
                      stroke: '#051b2c',
                      strokeWidth: 1,
                      outline: 'none',
                      cursor: 'pointer',
                      transition: 'all 200ms ease'
                    },
                    pressed: { 
                      outline: 'none' 
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
        {chapters.map(
          (chapter, idx) =>
            chapter.coordinates && (
              <Marker key={idx} coordinates={chapter.coordinates}>
                <circle 
                  r={5} 
                  fill="var(--primary-dark)" 
                  stroke="var(--accent)" 
                  strokeWidth={1.5}
                  style={{ pointerEvents: 'none' }}
                />
              </Marker>
            )
        )}
      </ComposableMap>

      {/* Floating Info Panel in bottom-left */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(4px)',
          padding: '12px 18px',
          borderRadius: '8px',
          border: '1px solid rgba(11, 60, 93, 0.1)',
          boxShadow: 'var(--shadow-md)',
          textAlign: 'left',
          pointerEvents: 'none',
          maxWidth: '260px'
        }}
      >
        <h4 style={{ margin: 0, fontSize: '13px', color: 'var(--primary-dark)', fontWeight: '700' }}>
          Interactive Map of India
        </h4>
        
        {hoveredState ? (
          <div style={{ marginTop: '4px' }}>
            <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--accent)', display: 'block' }}>
              {hoveredState.name}
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>
              {hoveredState.count} active chapter{hoveredState.count !== 1 ? 's' : ''}
            </span>
          </div>
        ) : selectedState ? (
          <div style={{ marginTop: '4px' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--primary)', display: 'block' }}>
              Filtered: {selectedState}
            </span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>
              Click state again or reset filter below
            </span>
          </div>
        ) : (
          <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: 'var(--text-muted)' }}>
            Hover over states or click to filter chapters.
          </p>
        )}
      </div>

      {/* Map Reset Button in bottom-right */}
      {selectedState && (
        <button
          onClick={() => onStateClick(null)}
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            background: 'var(--primary)',
            color: 'white',
            border: 'none',
            padding: '8px 14px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            transition: 'background 150ms'
          }}
        >
          Reset Map Filter
        </button>
      )}
    </div>
  );
};

const consolidateMembers = (members) => {
  if (!members || !Array.isArray(members)) return [];

  const cleaned = [];
  
  const isContinuation = (name) => {
    if (!name) return true;
    const cleanName = name.trim().toLowerCase();
    if (/^[(\-,.]/.test(cleanName)) return true;
    if (cleanName.startsWith('at ') || 
        cleanName.startsWith('of ') || 
        cleanName.startsWith('in ') || 
        cleanName.startsWith('and ') ||
        cleanName.startsWith('– ')) return true;
    if (cleanName.includes('achievements') || 
        cleanName.includes('educational') || 
        cleanName.includes('qualification') ||
        cleanName.includes('affiliation') ||
        cleanName.includes('experience')) return true;
    if (cleanName === 'of iapen' || 
        cleanName === 'of indian' || 
        cleanName === 'at gujarat' || 
        cleanName === 'isccm ahmedabad' ||
        cleanName === '– aster' ||
        cleanName === 'she' ||
        cleanName === ', indian') return true;
    return false;
  };

  const isContinuationNameFragment = (name) => {
    const clean = name.trim().toLowerCase();
    return clean === ', indian' || clean === '- indian' || clean === 'of iapen' || clean === 'at gujarat' || clean === 'she' || clean === '– aster' || clean === 'of indian';
  };

  members.forEach((member) => {
    let name = member.name || '';
    name = name.replace(/\s*educational\s*qualifications?\s*/gi, '');
    name = name.replace(/\s*qualification\s*/gi, '');
    name = name.replace(/\s*experience\s*/gi, '');
    name = name.replace(/\s*affiliation\s*/gi, '');
    name = name.replace(/\s*chief dietician\s*/gi, '');
    name = name.trim();

    if (isContinuation(name) && cleaned.length > 0) {
      const prev = cleaned[cleaned.length - 1];
      let detailsText = '';
      if (member.name && !isContinuationNameFragment(member.name)) {
        detailsText += member.name + ' ';
      }
      detailsText += member.details || '';
      prev.details = prev.details 
        ? `${prev.details.trim()} ${detailsText.trim()}`
        : detailsText.trim();
    } else {
      let role = member.role || 'Committee Member';
      role = role.replace(/hon\s*\.?\s*/gi, 'Hon. ');
      role = role.charAt(0).toUpperCase() + role.slice(1);
      cleaned.push({
        name: name,
        role: role,
        details: member.details || '',
        image: member.image || ''
      });
    }
  });

  return cleaned;
};

const parseDetails = (detailsText) => {
  if (!detailsText) return {};

  const parsed = {
    qualifications: '',
    affiliation: '',
    experience: '',
    societies: '',
    achievements: '',
    interests: '',
    general: ''
  };

  const text = detailsText.trim();
  const splitRegex = /(AFFILIATION|DESIGNATION|EXPERIENCE|WORK EXPERIENCE|ASSOCIATION WITH OTHER[S]? SOCIETIES|ASSOCIATION WITH OTHER[S]? ASSOCIATIONS?|ASSOCIATION WITH OTHER[S]? ORGANIZATIONS?|ASSOCIATION WITH OTHER[S]? SOCIETIES AND ASSOCIATIONS|ACHIEVEMENTS|ACHIEVEMENTS AND ACCOLADES|AWARDS AND CERTIFICATES|AWARDS|AREAS OF SPECIAL INTEREST|AREAS OF INTEREST|FIELD OF INTEREST IN NUTRITION|FIELD OF INTEREST|SPECIAL INTERESTS)\s*[-:]\s*/g;
  const parts = text.split(splitRegex);
  
  if (parts.length <= 1) {
    parsed.general = text;
    return parsed;
  }
  
  parsed.qualifications = parts[0].trim();
  
  for (let i = 1; i < parts.length; i += 2) {
    const heading = parts[i].toUpperCase();
    const content = parts[i + 1] ? parts[i + 1].trim() : '';
    
    if (heading.includes('AFFILIATION') || heading.includes('DESIGNATION')) {
      parsed.affiliation = content;
    } else if (heading.includes('EXPERIENCE')) {
      parsed.experience = content;
    } else if (heading.includes('ASSOCIATION')) {
      parsed.societies = content;
    } else if (heading.includes('ACHIEVEMENT') || heading.includes('AWARD')) {
      parsed.achievements = content;
    } else if (heading.includes('INTEREST')) {
      parsed.interests = content;
    }
  }
  
  return parsed;
};

// eslint-disable-next-line no-unused-vars
const MemberProfileItem = ({ member, isExpanded, onToggle }) => {
  const parsed = parseDetails(member.details);
  const hasParsedFields = parsed.affiliation || parsed.experience || parsed.societies || parsed.achievements || parsed.interests || parsed.qualifications;

  return (
    <div
      className="chapter-member-item"
      style={{
        borderBottom: '1px solid var(--border-ultra-light)',
        paddingBottom: '16px',
        paddingTop: '16px',
        textAlign: 'left'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          userSelect: 'none'
        }}
        onClick={onToggle}
      >
        <div>
          <strong style={{ fontSize: '16px', color: 'var(--primary-dark)' }}>
            {member.name}
          </strong>
          <span
            className="custom-badge bg-primary-light"
            style={{ fontSize: '11px', marginLeft: '10px', verticalAlign: 'middle', padding: '3px 8px', borderRadius: '12px', color: 'var(--primary)', fontWeight: '600' }}
          >
            {member.role}
          </span>
        </div>
        <span style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: '600' }}>
          {isExpanded ? 'Hide Details ▲' : 'View Details ▼'}
        </span>
      </div>

      {isExpanded && (
        <div 
          style={{ 
            marginTop: '12px', 
            fontSize: '14px', 
            color: 'var(--text-dark)', 
            lineHeight: '1.6',
            backgroundColor: 'var(--bg-section)',
            padding: '16px',
            borderRadius: '8px',
            border: '1px solid var(--border-ultra-light)'
          }}
        >
          {hasParsedFields ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {parsed.affiliation && (
                <div>
                  <strong style={{ color: 'var(--primary-navy)' }}>Designation & Affiliation:</strong>
                  <p style={{ margin: '2px 0 0 0', color: 'var(--text-muted)' }}>{parsed.affiliation}</p>
                </div>
              )}
              {parsed.qualifications && (
                <div>
                  <strong style={{ color: 'var(--primary-navy)' }}>Educational Qualifications:</strong>
                  <p style={{ margin: '2px 0 0 0', color: 'var(--text-muted)' }}>{parsed.qualifications}</p>
                </div>
              )}
              {parsed.experience && (
                <div>
                  <strong style={{ color: 'var(--primary-navy)' }}>Professional Experience:</strong>
                  <p style={{ margin: '2px 0 0 0', color: 'var(--text-muted)' }}>{parsed.experience}</p>
                </div>
              )}
              {parsed.societies && (
                <div>
                  <strong style={{ color: 'var(--primary-navy)' }}>Memberships & Affiliations:</strong>
                  <p style={{ margin: '2px 0 0 0', color: 'var(--text-muted)' }}>{parsed.societies}</p>
                </div>
              )}
              {parsed.achievements && (
                <div>
                  <strong style={{ color: 'var(--primary-navy)' }}>Key Achievements & Accolades:</strong>
                  <p style={{ margin: '2px 0 0 0', color: 'var(--text-muted)' }}>{parsed.achievements}</p>
                </div>
              )}
              {parsed.interests && (
                <div>
                  <strong style={{ color: 'var(--primary-navy)' }}>Areas of Special Interest:</strong>
                  <p style={{ margin: '2px 0 0 0', color: 'var(--text-muted)' }}>{parsed.interests}</p>
                </div>
              )}
            </div>
          ) : (
            <p style={{ margin: 0, color: 'var(--text-muted)' }}>{member.details || 'No biography details provided.'}</p>
          )}
        </div>
      )}
    </div>
  );
};

const Chapters = () => {
  const { hash } = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRegion, setFilterRegion] = useState('All');
  const [selectedState, setSelectedState] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [expandedMember, setExpandedMember] = useState(null);

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

  const handleStateClick = (stateName) => {
    if (selectedState && stateName && selectedState.toLowerCase() === stateName.toLowerCase()) {
      setSelectedState(null);
    } else {
      setSelectedState(stateName);
      setFilterRegion('All');
    }
  };

  const regions = ['All', 'North', 'South', 'East', 'West', 'Central'];

  const filteredChapters = chaptersData.filter((chapter) => {
    const matchesSearch =
      chapter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chapter.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chapter.coordinator.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = filterRegion === 'All' || chapter.region === filterRegion;
    const matchesState = !selectedState || chapter.state.toLowerCase() === selectedState.toLowerCase();
    return matchesSearch && matchesRegion && matchesState;
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
            <p className="section-desc">
              Search and connect with our 35+ local chapters distributed across the country to
              participate in regional clinical programs.
            </p>
          </div>

          {/* Interactive Map Visualisation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <MapChart chapters={chaptersData} selectedState={selectedState} onStateClick={handleStateClick} />
          </motion.div>

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
                  onClick={() => {
                    setFilterRegion(reg);
                    setSelectedState(null);
                  }}
                >
                  {reg === 'All' ? 'All Regions' : reg}
                </button>
              ))}
            </div>
          </div>

          {/* Results Summary */}
          <div className="results-info" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
            <p style={{ margin: 0 }}>Showing {filteredChapters.length} active chapters</p>
            {selectedState && (
              <span className="custom-badge bg-primary-light" style={{ padding: '6px 12px', fontSize: '13px', borderRadius: '20px', color: 'var(--primary)', fontWeight: '600' }}>
                Filtered by State: <strong>{selectedState}</strong>
                <button 
                  onClick={() => handleStateClick(selectedState)} 
                  style={{ border: 'none', background: 'none', marginLeft: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px', color: 'var(--primary-dark)', verticalAlign: 'middle' }}
                  aria-label="Clear state filter"
                >
                  &times;
                </button>
              </span>
            )}
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
                        ...chaptersCommittees[chapter.name],
                      });
                      setExpandedMember(null);
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
                      <span>
                        State: <strong>{chapter.state}</strong>
                      </span>
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
              <p className="text-muted">
                Try searching with a different keyword or selecting a different region.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Chapter Committee Modal */}
      {selectedChapter && createPortal((() => {
        try {
          const cleanedMembers = consolidateMembers(selectedChapter.members);
          const officeBearers = cleanedMembers.filter(m => 
            m.role && (
              m.role.toLowerCase().includes('president') || 
              m.role.toLowerCase().includes('secretary') || 
              m.role.toLowerCase().includes('treasurer') || 
              m.role.toLowerCase().includes('convener') ||
              m.role.toLowerCase().includes('coordinator') ||
              m.role.toLowerCase().includes('chair')
            )
          );
          const executiveCommittee = cleanedMembers.filter(m => !officeBearers.includes(m));

          return (
            <div className="modal-backdrop" onClick={() => setSelectedChapter(null)}>
              <div
                className="modal-container"
                onClick={(e) => e.stopPropagation()}
                style={{ maxWidth: '800px' }}
              >
                <button
                  className="modal-close"
                  onClick={() => setSelectedChapter(null)}
                  aria-label="Close modal"
                >
                  <X size={24} />
                </button>
                <div className="modal-body-content" style={{ maxHeight: '75vh', overflowY: 'auto', paddingRight: '5px' }}>
                  <div
                    className="modal-member-header"
                    style={{ marginBottom: '20px', paddingBottom: '16px' }}
                  >
                    <div className="modal-avatar" style={{ backgroundColor: 'var(--primary-light)' }}>
                      <Building size={36} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="modal-member-name" style={{ color: 'var(--primary-dark)', fontSize: '20px', fontWeight: '700', margin: 0 }}>
                        {selectedChapter.name}
                      </h3>
                      <p className="modal-member-role" style={{ color: 'var(--text-muted)', margin: '4px 0 0 0', fontSize: '13px' }}>
                        Region: {selectedChapter.region} India &bull; State: {selectedChapter.state}
                      </p>
                    </div>
                  </div>

                  {/* Office Bearers Section */}
                  {officeBearers.length > 0 && (
                    <div className="chapter-committee-section text-left" style={{ marginBottom: '24px' }}>
                      <h4
                        className="details-title"
                        style={{
                          fontSize: '1.1rem',
                          fontWeight: '700',
                          marginBottom: '12px',
                          color: 'var(--primary-navy)',
                          borderBottom: '2px solid var(--accent)',
                          paddingBottom: '4px',
                        }}
                      >
                        Office Bearers (Leadership Team)
                      </h4>
                      <div>
                        {officeBearers.map((member, idx) => {
                          const isExpanded = expandedMember === `office-${idx}`;
                          const parsed = parseDetails(member.details);
                          const hasParsedFields = parsed.affiliation || parsed.experience || parsed.societies || parsed.achievements || parsed.interests || parsed.qualifications;

                          return (
                            <div
                              key={`office-${idx}`}
                              className="chapter-member-item"
                              style={{
                                borderBottom: '1px solid var(--border-ultra-light)',
                                paddingBottom: '16px',
                                paddingTop: '16px',
                                textAlign: 'left'
                              }}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  cursor: 'pointer',
                                  userSelect: 'none'
                                }}
                                onClick={() => setExpandedMember(isExpanded ? null : `office-${idx}`)}
                              >
                                <div>
                                  <strong style={{ fontSize: '16px', color: 'var(--primary-dark)' }}>
                                    {member.name}
                                  </strong>
                                  <span
                                    className="custom-badge bg-primary-light"
                                    style={{ fontSize: '11px', marginLeft: '10px', verticalAlign: 'middle', padding: '3px 8px', borderRadius: '12px', color: 'var(--primary)', fontWeight: '600' }}
                                  >
                                    {member.role}
                                  </span>
                                </div>
                                <span style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: '600' }}>
                                  {isExpanded ? 'Hide Details ▲' : 'View Details ▼'}
                                </span>
                              </div>

                              {isExpanded && (
                                <div 
                                  style={{ 
                                    marginTop: '12px', 
                                    fontSize: '14px', 
                                    color: 'var(--text-dark)', 
                                    lineHeight: '1.6',
                                    backgroundColor: 'var(--bg-section)',
                                    padding: '16px',
                                    borderRadius: '8px',
                                    border: '1px solid var(--border-ultra-light)',
                                    display: 'flex',
                                    gap: '16px',
                                    flexDirection: 'row',
                                    alignItems: 'flex-start',
                                    flexWrap: 'wrap'
                                  }}
                                >
                                  {member.image && (
                                    <div style={{ flexShrink: 0, width: '180px', height: '180px', borderRadius: '8px', overflow: 'hidden', border: '2px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
                                      <img 
                                        src={member.image} 
                                        alt={member.name} 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                        onError={(e) => { e.target.style.display = 'none'; }}
                                      />
                                    </div>
                                  )}
                                  <div style={{ flex: 1, minWidth: '200px' }}>
                                    {hasParsedFields ? (
                                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        {parsed.affiliation && (
                                          <div>
                                            <strong style={{ color: 'var(--primary-navy)' }}>Designation & Affiliation:</strong>
                                            <p style={{ margin: '2px 0 0 0', color: 'var(--text-muted)' }}>{parsed.affiliation}</p>
                                          </div>
                                        )}
                                        {parsed.qualifications && (
                                          <div>
                                            <strong style={{ color: 'var(--primary-navy)' }}>Educational Qualifications:</strong>
                                            <p style={{ margin: '2px 0 0 0', color: 'var(--text-muted)' }}>{parsed.qualifications}</p>
                                          </div>
                                        )}
                                        {parsed.experience && (
                                          <div>
                                            <strong style={{ color: 'var(--primary-navy)' }}>Professional Experience:</strong>
                                            <p style={{ margin: '2px 0 0 0', color: 'var(--text-muted)' }}>{parsed.experience}</p>
                                          </div>
                                        )}
                                        {parsed.societies && (
                                          <div>
                                            <strong style={{ color: 'var(--primary-navy)' }}>Memberships & Affiliations:</strong>
                                            <p style={{ margin: '2px 0 0 0', color: 'var(--text-muted)' }}>{parsed.societies}</p>
                                          </div>
                                        )}
                                        {parsed.achievements && (
                                          <div>
                                            <strong style={{ color: 'var(--primary-navy)' }}>Key Achievements & Accolades:</strong>
                                            <p style={{ margin: '2px 0 0 0', color: 'var(--text-muted)' }}>{parsed.achievements}</p>
                                          </div>
                                        )}
                                        {parsed.interests && (
                                          <div>
                                            <strong style={{ color: 'var(--primary-navy)' }}>Areas of Special Interest:</strong>
                                            <p style={{ margin: '2px 0 0 0', color: 'var(--text-muted)' }}>{parsed.interests}</p>
                                          </div>
                                        )}
                                      </div>
                                    ) : (
                                      <p style={{ margin: 0, color: 'var(--text-muted)' }}>{member.details || 'No biography details provided.'}</p>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Executive Committee Section */}
                  {executiveCommittee.length > 0 && (
                    <div className="chapter-committee-section text-left" style={{ marginBottom: '24px' }}>
                      <h4
                        className="details-title"
                        style={{
                          fontSize: '1.1rem',
                          fontWeight: '700',
                          marginBottom: '12px',
                          color: 'var(--primary-navy)',
                          borderBottom: '2px solid var(--border-light)',
                          paddingBottom: '4px',
                        }}
                      >
                        Executive Committee Members
                      </h4>
                      <div>
                        {executiveCommittee.map((member, idx) => {
                          const isExpanded = expandedMember === `exec-${idx}`;
                          const parsed = parseDetails(member.details);
                          const hasParsedFields = parsed.affiliation || parsed.experience || parsed.societies || parsed.achievements || parsed.interests || parsed.qualifications;

                          return (
                            <div
                              key={`exec-${idx}`}
                              className="chapter-member-item"
                              style={{
                                borderBottom: '1px solid var(--border-ultra-light)',
                                paddingBottom: '16px',
                                paddingTop: '16px',
                                textAlign: 'left'
                              }}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  cursor: 'pointer',
                                  userSelect: 'none'
                                }}
                                onClick={() => setExpandedMember(isExpanded ? null : `exec-${idx}`)}
                              >
                                <div>
                                  <strong style={{ fontSize: '16px', color: 'var(--primary-dark)' }}>
                                    {member.name}
                                  </strong>
                                  <span
                                    className="custom-badge bg-primary-light"
                                    style={{ fontSize: '11px', marginLeft: '10px', verticalAlign: 'middle', padding: '3px 8px', borderRadius: '12px', color: 'var(--primary)', fontWeight: '600' }}
                                  >
                                    {member.role}
                                  </span>
                                </div>
                                <span style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: '600' }}>
                                  {isExpanded ? 'Hide Details ▲' : 'View Details ▼'}
                                </span>
                              </div>

                              {isExpanded && (
                                <div 
                                  style={{ 
                                    marginTop: '12px', 
                                    fontSize: '14px', 
                                    color: 'var(--text-dark)', 
                                    lineHeight: '1.6',
                                    backgroundColor: 'var(--bg-section)',
                                    padding: '16px',
                                    borderRadius: '8px',
                                    border: '1px solid var(--border-ultra-light)',
                                    display: 'flex',
                                    gap: '16px',
                                    flexDirection: 'row',
                                    alignItems: 'flex-start',
                                    flexWrap: 'wrap'
                                  }}
                                >
                                  {member.image && (
                                    <div style={{ flexShrink: 0, width: '180px', height: '180px', borderRadius: '8px', overflow: 'hidden', border: '2px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
                                      <img 
                                        src={member.image} 
                                        alt={member.name} 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                        onError={(e) => { e.target.style.display = 'none'; }}
                                      />
                                    </div>
                                  )}
                                  <div style={{ flex: 1, minWidth: '200px' }}>
                                    {hasParsedFields ? (
                                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        {parsed.affiliation && (
                                          <div>
                                            <strong style={{ color: 'var(--primary-navy)' }}>Designation & Affiliation:</strong>
                                            <p style={{ margin: '2px 0 0 0', color: 'var(--text-muted)' }}>{parsed.affiliation}</p>
                                          </div>
                                        )}
                                        {parsed.qualifications && (
                                          <div>
                                            <strong style={{ color: 'var(--primary-navy)' }}>Educational Qualifications:</strong>
                                            <p style={{ margin: '2px 0 0 0', color: 'var(--text-muted)' }}>{parsed.qualifications}</p>
                                          </div>
                                        )}
                                        {parsed.experience && (
                                          <div>
                                            <strong style={{ color: 'var(--primary-navy)' }}>Professional Experience:</strong>
                                            <p style={{ margin: '2px 0 0 0', color: 'var(--text-muted)' }}>{parsed.experience}</p>
                                          </div>
                                        )}
                                        {parsed.societies && (
                                          <div>
                                            <strong style={{ color: 'var(--primary-navy)' }}>Memberships & Affiliations:</strong>
                                            <p style={{ margin: '2px 0 0 0', color: 'var(--text-muted)' }}>{parsed.societies}</p>
                                          </div>
                                        )}
                                        {parsed.achievements && (
                                          <div>
                                            <strong style={{ color: 'var(--primary-navy)' }}>Key Achievements & Accolades:</strong>
                                            <p style={{ margin: '2px 0 0 0', color: 'var(--text-muted)' }}>{parsed.achievements}</p>
                                          </div>
                                        )}
                                        {parsed.interests && (
                                          <div>
                                            <strong style={{ color: 'var(--primary-navy)' }}>Areas of Special Interest:</strong>
                                            <p style={{ margin: '2px 0 0 0', color: 'var(--text-muted)' }}>{parsed.interests}</p>
                                          </div>
                                        )}
                                      </div>
                                    ) : (
                                      <p style={{ margin: 0, color: 'var(--text-muted)' }}>{member.details || 'No biography details provided.'}</p>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div
                    className="chapter-contact-box"
                    style={{
                      marginTop: '24px',
                      backgroundColor: 'var(--bg-section)',
                      padding: '16px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-ultra-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Mail size={20} className="text-primary" />
                      <div className="text-left">
                        <strong
                          style={{ display: 'block', fontSize: '13px', color: 'var(--primary-navy)' }}
                        >
                          Official Chapter Contact Email
                        </strong>
                        <a
                          href={`mailto:${selectedChapter.email}`}
                          style={{ fontSize: '14px', fontWeight: '600', color: 'var(--primary)' }}
                        >
                          {selectedChapter.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        } catch (err) {
          console.error("Modal Render Error:", err);
          return (
            <div className="modal-backdrop" onClick={() => setSelectedChapter(null)}>
              <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px', padding: '30px', backgroundColor: '#ffffff', borderRadius: '12px' }}>
                <button className="modal-close" onClick={() => setSelectedChapter(null)}>&times;</button>
                <div style={{ color: '#b91c1c', textAlign: 'left' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px' }}>Modal Load Error</h3>
                  <p style={{ fontSize: '14px', marginBottom: '15px' }}>An error occurred while loading this chapter's committee details.</p>
                  <pre style={{ backgroundColor: '#fef2f2', padding: '12px', borderRadius: '6px', fontSize: '12px', overflowX: 'auto', border: '1px solid #fee2e2' }}>
                    {err.message}
                  </pre>
                </div>
              </div>
            </div>
          );
        }
      })(), document.body)}
    </div>
  );
};

export default Chapters;
