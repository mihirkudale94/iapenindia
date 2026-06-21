import { Helmet } from 'react-helmet-async';
import LeadershipGrid from '../components/LeadershipGrid';
import leadership from '../data/leadershipOfficial.json';

const boardOfDirectors = leadership.officeBearers.members.slice(0, 4);
const officeBearers = leadership.officeBearers.members.slice(4, 10);
const necMembers = leadership.officeBearers.members.slice(10);

const OfficeBearers = () => (
  <div className="about-page animate-slide-up">
    <Helmet>
      <title>Office Bearers | IAPEN India</title>
      <meta
        name="description"
        content="Meet the national office bearers and executive committee of IAPEN India."
      />
    </Helmet>
    <section className="page-header bg-primary-dark">
      <div className="container">
        <span className="page-subtitle">National Leadership</span>
        <h1 className="page-title text-white">Office Bearers</h1>
      </div>
    </section>
    <section className="section section-bg office-bearers-section">
      <div className="container">
        <div className="section-title-wrapper">
          <span className="section-subtitle">Strategic Oversight</span>
          <h2 className="section-title">Board of Directors</h2>
          <p className="section-desc">
            The Board providing strategic leadership and institutional oversight for IAPEN India.
          </p>
        </div>
        <LeadershipGrid members={boardOfDirectors} />
        <div className="section-title-wrapper mt-12">
          <span className="section-subtitle">National Leadership</span>
          <h2 className="section-title">National Office Bearers</h2>
          <p className="section-desc">
            The leaders responsible for IAPEN India’s administrative and academic direction.
          </p>
        </div>
        <LeadershipGrid members={officeBearers} />
        <div className="section-title-wrapper mt-12">
          <span className="section-subtitle">Executive Committee</span>
          <h2 className="section-title">National Executive Committee Members</h2>
        </div>
        <LeadershipGrid members={necMembers} accent="teal" />
      </div>
    </section>
  </div>
);

export default OfficeBearers;
