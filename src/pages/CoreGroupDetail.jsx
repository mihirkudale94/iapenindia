import { Helmet } from 'react-helmet-async';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Users } from 'lucide-react';
import officialCoreGroups from '../data/coreGroupsOfficial.json';

const sourceSlug = (source) => source.split('/').filter(Boolean).pop();

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

const CoreGroupDetail = () => {
  const { slug } = useParams();
  const group = officialCoreGroups.find((item) => sourceSlug(item.source) === slug);

  if (!group) return <Navigate to="/core-groups" replace />;

  return (
    <div className="directory-detail-page animate-slide-up">
      <Helmet>
        <title>{group.name} | IAPEN India</title>
        <meta
          name="description"
          content={`Meet the official ${group.name} committee members of IAPEN India.`}
        />
      </Helmet>
      <section className="page-header bg-primary-dark">
        <div className="container">
          <span className="page-subtitle">IAPEN India Core Group</span>
          <h1 className="page-title text-white">{group.name}</h1>
        </div>
      </section>
      <section className="section">
        <div className="container directory-detail-container">
          <div className="directory-detail-toolbar">
            <Link to="/core-groups" className="btn btn-outline btn-sm">
              <ArrowLeft size={17} /> All Core Groups
            </Link>
            <a
              href={group.source}
              target="_blank"
              rel="noopener noreferrer"
              className="source-link"
            >
              Official source <ExternalLink size={15} />
            </a>
          </div>
          <div className="section-title-wrapper text-left directory-detail-intro">
            <span className="section-subtitle">Meet the Committee</span>
            <h2 className="section-title">Members & Professional Profiles</h2>
            <p className="section-desc">
              <Users size={18} /> {group.members.length} official profiles
            </p>
          </div>
          <div className="profile-directory-grid">
            {group.members.map((member, index) => {
              const identity = getMemberIdentity(member.title);
              return (
                <article className="profile-directory-card" key={`${member.title}-${index}`}>
                  <img src={member.image} alt={identity.name} className="profile-directory-image" />
                  <div className="profile-directory-content">
                    {identity.role && (
                      <span className="custom-badge bg-teal-light">{identity.role}</span>
                    )}
                    <h3>{identity.name}</h3>
                    {member.details && <p>{member.details}</p>}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoreGroupDetail;
