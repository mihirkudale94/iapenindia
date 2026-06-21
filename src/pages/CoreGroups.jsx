import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { Helmet } from 'react-helmet-async';
import { Activity, Search, Users, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import officialCoreGroups from '../data/coreGroupsOfficial.json';

const groups = officialCoreGroups;

const getGroupSlug = (source) => source.split('/').filter(Boolean).pop();

const getMemberIdentity = (title) => {
  const lines = title
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
  if (lines.length > 1) return { role: lines[0], name: lines.slice(1).join(' ') };

  const parts = title.split(/\s+-\s+/);
  if (
    parts.length > 1 &&
    /(mentor|founder|officer|member|advisor|chair|patron|committee|coordinator|secretary|media)/i.test(
      parts[0]
    )
  ) {
    return { role: parts[0], name: parts.slice(1).join(' - ') };
  }

  return { role: '', name: title };
};

const CoreGroups = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(null);

  const filteredGroups = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return groups;

    return groups.filter(
      (group) =>
        group.name.toLowerCase().includes(query) ||
        group.members.some((member) =>
          `${member.title} ${member.details}`.toLowerCase().includes(query)
        )
    );
  }, [searchTerm]);

  return (
    <div className="core-groups-page animate-slide-up">
      <Helmet>
        <title>Core Groups | IAPEN India</title>
        <meta
          name="description"
          content="Explore the official IAPEN India clinical nutrition Core Groups and their complete committee membership."
        />
      </Helmet>

      <section className="page-header bg-primary-dark">
        <div className="container">
          <span className="page-subtitle">Multidisciplinary Expertise</span>
          <h1 className="page-title text-white">Core Groups</h1>
        </div>
      </section>

      <section className="section core-groups-section">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Official Committees</span>
            <h2 className="section-title">Clinical Nutrition Core Groups</h2>
            <p className="section-desc">
              Explore the specialist committees advancing education, research, and clinical
              nutrition practice across IAPEN India.
            </p>
          </div>

          <div className="search-filter-container glass-panel">
            <div className="search-box-wrapper">
              <Search className="search-icon" size={20} />
              <input
                type="search"
                placeholder="Search a Core Group, member, or speciality..."
                className="search-input-field"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                aria-label="Search Core Groups"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="clear-search-btn"
                  aria-label="Clear search"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            <div className="group-results-count" aria-live="polite">
              <strong>{filteredGroups.length}</strong> Core Groups
            </div>
          </div>

          <div className="grid-3 groups-grid">
            {filteredGroups.map((group) => (
              <button
                type="button"
                key={group.name}
                className="card group-card card-teal cursor-pointer hover-lift text-left"
                onClick={() => setSelectedGroup(group)}
              >
                <div className="group-card-header">
                  <div className="group-card-title-area">
                    <Activity className="text-teal group-card-icon" size={20} />
                    <h3 className="group-name">{group.name}</h3>
                  </div>
                </div>
                <div className="group-card-summary">
                  <div className="group-member-count">
                    <Users size={16} />
                    <span>{group.members.length} listed committee profiles</span>
                  </div>
                  <span className="view-profile-btn mt-4 text-teal font-semibold text-sm inline-block">
                    View complete group →
                  </span>
                </div>
              </button>
            ))}
          </div>

          {filteredGroups.length === 0 && (
            <div className="no-results-box text-center glass-panel">
              <Search size={42} className="text-muted mb-4" />
              <h3>No matching Core Groups</h3>
              <p className="text-muted">Try another group, member, or clinical speciality.</p>
            </div>
          )}
        </div>
      </section>

      {selectedGroup &&
        createPortal(
          <div className="modal-backdrop" onClick={() => setSelectedGroup(null)}>
            <div
              className="modal-container core-group-modal"
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="core-group-title"
            >
              <button
                className="modal-close"
                onClick={() => setSelectedGroup(null)}
                aria-label="Close Core Group details"
              >
                <X size={24} />
              </button>
              <div className="modal-body-content">
                <div className="modal-member-header">
                  <div className="modal-avatar" style={{ backgroundColor: 'var(--teal-light)' }}>
                    <Activity size={36} className="text-teal" />
                  </div>
                  <div>
                    <span className="section-subtitle">IAPEN India Core Group</span>
                    <h3 id="core-group-title" className="modal-member-name">
                      {selectedGroup.name}
                    </h3>
                    <p className="modal-member-dept">
                      {selectedGroup.members.length} listed committee profiles
                    </p>
                    <Link
                      to={`/core-groups/${getGroupSlug(selectedGroup.source)}`}
                      className="source-link mt-2"
                      onClick={() => setSelectedGroup(null)}
                    >
                      Open full group page →
                    </Link>
                  </div>
                </div>

                <div className="core-group-modal-scroll text-left">
                  {selectedGroup.aim && (
                    <section className="core-group-aim">
                      <h4>Aim</h4>
                      <p>{selectedGroup.aim}</p>
                    </section>
                  )}

                  <section>
                    <h4 className="core-group-members-title">Core Committee Members</h4>
                    <div className="core-group-member-list">
                      {selectedGroup.members.map((member, index) => {
                        const identity = getMemberIdentity(member.title);
                        return (
                          <article className="core-group-member" key={`${member.title}-${index}`}>
                            <img
                              src={member.image}
                              alt={identity.name}
                              className="core-group-member-image"
                            />
                            <div>
                              <div className="core-group-member-heading">
                                <h5>{identity.name}</h5>
                                {identity.role && (
                                  <span className="custom-badge bg-teal-light">
                                    {identity.role}
                                  </span>
                                )}
                              </div>
                              {member.details && <p>{member.details}</p>}
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  </section>

                  {selectedGroup.launchActivity && (
                    <section className="core-group-aim">
                      <h4>Scientific Activities & Launch</h4>
                      <p>{selectedGroup.launchActivity}</p>
                    </section>
                  )}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default CoreGroups;
