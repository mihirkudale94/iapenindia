import { useState } from 'react';
import { Search, Info, Activity, ChevronDown, CheckCircle, X } from 'lucide-react';
import { coreGroupsCommittees } from './../data/committees';

const CoreGroups = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [expandedGroup, setExpandedGroup] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const categories = [
    'All',
    'Clinical Specialities',
    'Geriatric & Pediatrics',
    'Surgical & Critical Care',
    'Public & Integrative Health',
  ];

  const coreGroupsData = [
    {
      name: 'Nutrition and Diabetes India',
      category: 'Clinical Specialities',
      desc: 'Developing protocols for diabetes management, medical nutrition therapy, and low-glycemic dietary interventions.',
      focus: [
        'MNT for Type 1 & 2 Diabetes',
        'Gestational Diabetes Guidelines',
        'Public awareness campaigns',
      ],
      coordinators: 'Dr. Shilpa Varma (Chief Program Officer), Datta Patel (Joint Program Officer)',
    },
    {
      name: 'Nutrition in Transplant',
      category: 'Surgical & Critical Care',
      desc: 'Formulating pre- and post-transplant nutritional support protocols for kidney, liver, and heart transplant recipients.',
      focus: [
        'Immunosuppressant dietary adjustments',
        'Pre-transplant optimization',
        'Post-operative recovery diets',
      ],
      coordinators: 'Dr. Suresh Kumar, Dr. P. R. Rao',
    },
    {
      name: 'Dysphagia',
      category: 'Clinical Specialities',
      desc: 'Advancing protocols for texture-modified diets, speech therapy coordination, and tube feeding alternatives in swallowing difficulties.',
      focus: [
        'Texture-modified food standards',
        'Dysphagia screening tools',
        'Multidisciplinary feeding clinics',
      ],
      coordinators: 'Ms. Sreemathy Venkatraman (Chief Program Officer)',
    },
    {
      name: 'ERAS Core Group',
      category: 'Surgical & Critical Care',
      desc: 'Focusing on Enhanced Recovery After Surgery principles, including pre-operative carbohydrate loading and early post-operative feeding.',
      focus: [
        'Pre-operative fasting reduction',
        'Early post-op oral intake',
        'Perioperative fluid management',
      ],
      coordinators: 'Dr. P.C. Vijay Kumar (Chairperson)',
    },
    {
      name: 'Hypertension Core Group',
      category: 'Clinical Specialities',
      desc: 'Designing sodium-restricted diets, DASH diet guidelines for Indian populations, and cardiovascular nutrition standards.',
      focus: [
        'DASH diet localization',
        'Sodium reduction campaigns',
        'Cardiac rehabilitation protocols',
      ],
      coordinators: 'Dr. Mansi Patil (Chief Program Officer)',
    },
    {
      name: 'ONCO Core Group',
      category: 'Clinical Specialities',
      desc: 'Establishing guidelines for medical nutrition therapy in cancer patients during chemotherapy, radiotherapy, and palliative care.',
      focus: [
        'Cancer cachexia prevention',
        'Chemo-induced nausea management',
        'Enteral nutrition in head/neck cancers',
      ],
      coordinators: 'Mr. Y.T. Shivshankar (Chief Program Officer)',
    },
    {
      name: 'Pediatric Core Group',
      category: 'Geriatric & Pediatrics',
      desc: 'Dedicated to pediatric clinical nutrition, addressing neonatal parenteral feeding, inborn errors of metabolism, and pediatric critical care.',
      focus: [
        'Neonatal TPN guidelines',
        'Pediatric ICU feeding protocols',
        'Malnutrition management standards',
      ],
      coordinators: 'Dr. Priya Chitale (Chief Program Officer), Ms. Lekha Sreedharan',
    },
    {
      name: 'Community Nutrition Core Group',
      category: 'Public & Integrative Health',
      desc: 'Promoting public health nutrition, combating childhood wasting, anemia, and designing maternal nutritional support initiatives.',
      focus: [
        'Undernutrition rehabilitation',
        'Anemia eradication projects',
        'School feeding program standards',
      ],
      coordinators: 'Ms. Ranu Singh (Chief Program Officer)',
    },
    {
      name: 'Critical Care',
      category: 'Surgical & Critical Care',
      desc: 'Designing critical care nutritional support guidelines, parenteral and enteral feeding protocols, and energy expenditure formulas.',
      focus: [
        'Parenteral nutrition monitoring',
        'Early enteral feeding in sepsis',
        'ICU calorimetry standards',
      ],
      coordinators: 'Dr. P.C. Vijay Kumar, Dr. Latha Poopandian',
    },
    {
      name: 'Renal Core Group',
      category: 'Clinical Specialities',
      desc: 'Formulating protein-restricted diets for chronic kidney disease (CKD) and high-protein nutrition for hemodialysis patients.',
      focus: [
        'CKD stage-specific menus',
        'Dialysis nutrition guidelines',
        'Renal enteral formula criteria',
      ],
      coordinators: 'Ms. Himani Puri (Programme Officer), Ms. Suneetha Rao',
    },
    {
      name: 'Digitization In Nutrition',
      category: 'Public & Integrative Health',
      desc: 'Promoting digital health, diet planning software standards, and tele-nutrition services across rural and urban environments.',
      focus: [
        'Tele-nutrition protocols',
        'Diet software guidelines',
        'Mobile health app validation',
      ],
      coordinators: 'Dr. Ketan Patel, Dr. Nidhi Chawla',
    },
    {
      name: 'Fertility and Maternal Nutrition',
      category: 'Geriatric & Pediatrics',
      desc: 'Advancing pre-conception nutrition guidelines, gestational weight gain monitoring, and post-partum lactation support.',
      focus: [
        'Pre-conception dietary support',
        'Lactation nutritional guidelines',
        'Micro-nutrient supplementation',
      ],
      coordinators: 'Dr. Sindhu S. (Program Officer)',
    },
    {
      name: 'Metabolic Syndrome and Nutrition',
      category: 'Clinical Specialities',
      desc: 'Tackling abdominal obesity, insulin resistance, and dyslipidemia through dietary changes and lifestyle modifications.',
      focus: [
        'Lifestyle modification programs',
        'Anti-inflammatory diets',
        'Fatty liver nutritional care',
      ],
      coordinators: 'Dr. Sandhya Narayanan, Dr. Vinay Kumar',
    },
    {
      name: 'Geriatric Nutrition',
      category: 'Geriatric & Pediatrics',
      desc: 'Focusing on nutritional care of older adults, targeting sarcopenia prevention, cognitive decline dietary care, and nursing home menus.',
      focus: [
        'Sarcopenia prevention diets',
        'Cognitive nutrition standards',
        'Geriatric screening tools',
      ],
      coordinators: 'Dr. Preeti Singh, Dr. Shalini Rai',
    },
    {
      name: 'Gastrointestinal Nutrition',
      category: 'Clinical Specialities',
      desc: 'Formulating dietary guidelines for Inflammatory Bowel Disease (IBD), Irritable Bowel Syndrome (IBS), celiac disease, and pancreatitis.',
      focus: [
        'Low-FODMAP diets',
        'Celiac-safe nutrition standards',
        'Short bowel syndrome management',
      ],
      coordinators: 'Bidita Shah (Chief Program Officer)',
    },
    {
      name: 'Integrated Nutrition and Dietetics',
      category: 'Public & Integrative Health',
      desc: 'Bridging modern clinical nutrition with ayurvedic dietetics, functional foods, and traditional dietary practices.',
      focus: ['Functional food standards', 'Nutraceutical regulations', 'Integrative diet therapy'],
      coordinators: 'Dr. Sunita Sharma, Dr. Rekha Sharma',
    },
    {
      name: 'Neuro Nutrition',
      category: 'Clinical Specialities',
      desc: "Targeting medical nutrition therapy in neurological conditions, such as stroke recovery, dysphagia in Parkinson's, and ketogenic diet for epilepsy.",
      focus: [
        'Ketogenic diet for epilepsy',
        'Post-stroke enteral feeding',
        'Cognitive support nutrition',
      ],
      coordinators: 'Ms. Rima Rao',
    },
  ];

  const filteredGroups = coreGroupsData.filter((group) => {
    const matchesSearch =
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || group.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpand = (index) => {
    if (expandedGroup === index) {
      setExpandedGroup(null);
    } else {
      setExpandedGroup(index);
    }
  };

  return (
    <div className="core-groups-page animate-slide-up">
      {/* Header */}
      <section className="page-header bg-primary-dark">
        <div className="container">
          <span className="page-subtitle">Expert Panels</span>
          <h1 className="page-title text-white">Clinical Core Groups</h1>
        </div>
      </section>

      {/* Main Section */}
      <section className="section core-groups-section">
        <div className="container">
          <div className="section-title-wrapper">
            <h2 className="section-title">Focus Areas & Specialities</h2>
            <p className="section-desc">
              IAPEN India hosts 17 voluntary core groups focused on researching, reviewing, and
              publishing guidelines for disease-specific clinical nutrition.
            </p>
          </div>

          {/* Controls */}
          <div className="search-filter-container glass-panel">
            <div className="search-box-wrapper">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search focus area or clinical speciality..."
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
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`region-tab-btn ${filterCategory === cat ? 'active' : ''}`}
                  onClick={() => setFilterCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid-3 groups-grid">
            {filteredGroups.map((group, index) => {
              const globalIndex = coreGroupsData.findIndex((g) => g.name === group.name);
              const isExpanded = expandedGroup === globalIndex;
              const hasDetails = !!coreGroupsCommittees[group.name];

              return (
                <div
                  key={index}
                  className={`card group-card card-teal ${isExpanded ? 'expanded-card' : ''} ${hasDetails ? 'cursor-pointer hover-lift' : ''}`}
                  onClick={() => {
                    if (hasDetails) {
                      setSelectedGroup(group);
                    } else {
                      toggleExpand(globalIndex);
                    }
                  }}
                >
                  <div className="group-card-header">
                    <div className="group-card-title-area">
                      <Activity className="text-teal group-card-icon" size={20} />
                      <h3 className="group-name">{group.name}</h3>
                    </div>
                    {!hasDetails && (
                      <ChevronDown
                        size={18}
                        className={`expand-chevron ${isExpanded ? 'rotate' : ''}`}
                      />
                    )}
                  </div>

                  <div className="group-card-summary">
                    <span className="group-cat-badge">{group.category}</span>
                    <p className="group-desc">{group.desc}</p>
                    {hasDetails && (
                      <span className="view-profile-btn mt-3 text-teal font-semibold text-sm inline-block">
                        View Committee Details &rarr;
                      </span>
                    )}
                  </div>

                  {!hasDetails && (
                    <div className={`group-body ${isExpanded ? 'expanded' : ''}`}>
                      <div className="group-body-content">
                        <div className="details-section">
                          <h4 className="details-title">Key Focus Areas:</h4>
                          <ul className="focus-list">
                            {group.focus.map((item, idx) => (
                              <li key={idx}>
                                <CheckCircle size={14} className="text-teal" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="details-section">
                          <h4 className="details-title">Coordinators:</h4>
                          <p className="coordinator-text">{group.coordinators}</p>

                          <div className="group-metrics">
                            <div className="metric-item">
                              <strong>{group.focus.length}</strong>
                              <span>Guidelines</span>
                            </div>
                            <div className="metric-item">
                              <strong>Active</strong>
                              <span>Panel Status</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Empty Placeholder */}
          {filteredGroups.length === 0 && (
            <div className="no-results-box text-center glass-panel">
              <Info size={48} className="text-muted mb-4" />
              <h3>No Core Groups Found</h3>
              <p className="text-muted">
                Try searching with a different keyword or selecting a different category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Core Group Detailed Modal */}
      {selectedGroup && coreGroupsCommittees[selectedGroup.name] && (
        <div className="modal-backdrop" onClick={() => setSelectedGroup(null)}>
          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '850px' }}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedGroup(null)}
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
            <div className="modal-body-content">
              <div
                className="modal-member-header"
                style={{ marginBottom: '16px', paddingBottom: '16px' }}
              >
                <div className="modal-avatar" style={{ backgroundColor: 'var(--teal-light)' }}>
                  <Activity size={36} className="text-teal" />
                </div>
                <div>
                  <h3 className="modal-member-name">{selectedGroup.name}</h3>
                  <span className="custom-badge bg-teal-light" style={{ fontSize: '13px' }}>
                    {selectedGroup.category}
                  </span>
                </div>
              </div>

              <div
                style={{
                  maxHeight: '60vh',
                  overflowY: 'auto',
                  paddingRight: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                }}
                className="text-left"
              >
                {/* Description */}
                <div>
                  <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                    {selectedGroup.desc}
                  </p>
                </div>

                {/* Aims, Vision, Mission (if present, like in Pediatric Core Group) */}
                {coreGroupsCommittees[selectedGroup.name].aim && (
                  <div
                    style={{
                      backgroundColor: 'var(--bg-section)',
                      padding: '20px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-ultra-light)',
                    }}
                  >
                    <h4
                      style={{
                        fontSize: '16px',
                        fontWeight: '700',
                        color: 'var(--primary-dark)',
                        marginBottom: '10px',
                      }}
                    >
                      Aims, Vision & Mission
                    </h4>
                    <p
                      style={{
                        fontSize: '14px',
                        color: 'var(--text-muted)',
                        lineHeight: '1.6',
                        marginBottom: '8px',
                      }}
                    >
                      <strong>Aim:</strong> {coreGroupsCommittees[selectedGroup.name].aim}
                    </p>
                    {coreGroupsCommittees[selectedGroup.name].vision && (
                      <p
                        style={{
                          fontSize: '14px',
                          color: 'var(--text-muted)',
                          lineHeight: '1.6',
                          marginBottom: '8px',
                        }}
                      >
                        <strong>Vision:</strong> {coreGroupsCommittees[selectedGroup.name].vision}
                      </p>
                    )}
                    {coreGroupsCommittees[selectedGroup.name].mission && (
                      <p
                        style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6' }}
                      >
                        <strong>Mission:</strong> {coreGroupsCommittees[selectedGroup.name].mission}
                      </p>
                    )}
                  </div>
                )}

                {/* Committee Team */}
                <div>
                  <h4
                    style={{
                      fontSize: '18px',
                      fontWeight: '700',
                      color: 'var(--primary-dark)',
                      borderBottom: '2px solid var(--teal-light)',
                      paddingBottom: '6px',
                      marginBottom: '16px',
                    }}
                  >
                    Core Committee Members
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {coreGroupsCommittees[selectedGroup.name].members.map((member, idx) => (
                      <div
                        key={idx}
                        style={{
                          borderBottom:
                            idx < coreGroupsCommittees[selectedGroup.name].members.length - 1
                              ? '1px dashed var(--border-ultra-light)'
                              : 'none',
                          paddingBottom: '16px',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            flexWrap: 'wrap',
                            gap: '8px',
                          }}
                        >
                          <strong style={{ fontSize: '16px', color: 'var(--primary-dark)' }}>
                            {member.name}
                          </strong>
                          <span className="custom-badge bg-teal-light" style={{ fontSize: '12px' }}>
                            {member.role}
                          </span>
                        </div>
                        <p
                          style={{
                            fontSize: '14px',
                            color: 'var(--text-muted)',
                            marginTop: '6px',
                            lineHeight: '1.5',
                          }}
                        >
                          {member.details}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Launch Activity / News (if present) */}
                {coreGroupsCommittees[selectedGroup.name].launchActivity && (
                  <div
                    style={{ borderTop: '1px solid var(--border-ultra-light)', paddingTop: '16px' }}
                  >
                    <h4
                      style={{
                        fontSize: '15px',
                        fontWeight: '700',
                        color: 'var(--primary-dark)',
                        marginBottom: '8px',
                      }}
                    >
                      Scientific Activities & Launch
                    </h4>
                    <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                      {coreGroupsCommittees[selectedGroup.name].launchActivity}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoreGroups;
