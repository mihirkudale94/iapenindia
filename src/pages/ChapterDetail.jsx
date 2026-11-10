import { Helmet } from 'react-helmet-async';
import { Navigate, useParams } from 'react-router-dom';
import { Mail, Users } from 'lucide-react';
import officialChapters from '@/data/chaptersOfficial.json';
import ContentBlocks from '@/components/widgets/ContentBlocks';

const getMemberIdentity = (title) => {
  const lines = title
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
  if (lines.length > 1) return { role: lines[0], name: lines.slice(1).join(' ') };
  return { role: '', name: title };
};

const ChapterDetail = () => {
  const { slug } = useParams();
  const officialChapter = officialChapters.find((item) => item.slug === slug);

  if (!officialChapter) return <Navigate to="/" replace />;

  // Members marked "hidden" are kept in the data but not shown, matching the live site.
  const chapter = {
    ...officialChapter,
    members: officialChapter.members.filter((member) => !member.hidden),
  };

  return (
    <div className="directory-detail-page animate-slide-up">
      <Helmet>
        <title>{chapter.name} | IAPEN India</title>
        <meta
          name="description"
          content={`Meet the official leadership and committee members of the IAPEN India ${chapter.name}.`}
        />
      </Helmet>
      <section className="page-header bg-primary-dark">
        <div className="container">
          <span className="page-subtitle">Regional Network</span>
          <h1 className="page-title text-white">{chapter.name}</h1>
        </div>
      </section>
      <section className="section">
        <div className="container directory-detail-container">
          <div className="directory-detail-toolbar">
            <div className="directory-detail-toolbar-links">
              {chapter.email && (
                <a href={`mailto:${chapter.email}`} className="source-link">
                  <Mail size={15} /> {chapter.email}
                </a>
              )}
            </div>
          </div>
          <div className="section-title-wrapper text-left directory-detail-intro">
            <span className="section-subtitle">Chapter Leadership</span>
            <h2 className="section-title">{chapter.pageTitle || chapter.name}</h2>
            <p className="section-desc">
              <Users size={18} /> {chapter.members.length} official profiles
            </p>
          </div>
          <div className="profile-directory-grid">
            {chapter.members.map((member, index) => {
              const identity = getMemberIdentity(member.title);
              return (
                <article className="profile-directory-card" key={`${member.title}-${index}`}>
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={identity.name}
                      className="profile-directory-image"
                    />
                  ) : (
                    <div className="profile-directory-image profile-directory-placeholder">
                      <Users size={34} />
                    </div>
                  )}
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
          <ContentBlocks blocks={chapter.activities} />
        </div>
      </section>
    </div>
  );
};

export default ChapterDetail;
