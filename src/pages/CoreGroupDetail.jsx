import { Helmet } from 'react-helmet-async';
import { Navigate, useParams } from 'react-router-dom';
import { Mail, Users } from 'lucide-react';
import officialCoreGroups from '@/data/coreGroupsOfficial.json';
import LeadershipGrid from '@/components/widgets/LeadershipGrid';
import ContentBlocks from '@/components/widgets/ContentBlocks';

const sourceSlug = (source) => source.split('/').filter(Boolean).pop();

const CoreGroupDetail = () => {
  const { slug } = useParams();
  const group = officialCoreGroups.find((item) => sourceSlug(item.source) === slug);

  if (!group) return <Navigate to="/" replace />;

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
          {group.email && (
            <div className="directory-detail-toolbar">
              <div className="directory-detail-toolbar-links">
                <a href={`mailto:${group.email}`} className="source-link">
                  <Mail size={15} /> {group.email}
                </a>
              </div>
            </div>
          )}
          {group.pageTitle && (
            <div className="section-title-wrapper text-left directory-detail-intro">
              <span className="section-subtitle">About the Core Group</span>
              <h2 className="section-title">{group.pageTitle}</h2>
            </div>
          )}
          <ContentBlocks blocks={group.intro} variant="intro" />
          <div className="section-title-wrapper text-left directory-detail-intro">
            <span className="section-subtitle">Meet the Committee</span>
            <h2 className="section-title">Members & Professional Profiles</h2>
            <p className="section-desc">
              <Users size={18} /> {group.members.length} official profiles
            </p>
          </div>
          <LeadershipGrid members={group.members} />
          <ContentBlocks blocks={group.activities} />
        </div>
      </section>
    </div>
  );
};

export default CoreGroupDetail;
