import { Helmet } from 'react-helmet-async';
import LeadershipGrid from '@/components/widgets/LeadershipGrid';
import leadership from '@/data/leadershipOfficial.json';
import pastPresidentMessage from '@/data/pastPresidentMessage';

const boardOfDirectors = leadership.officeBearers.members.slice(0, 4);
const coreTeam = leadership.officeBearers.members.slice(4, 10);
const necMembers = leadership.officeBearers.members.slice(10);

const OfficeBearers = () => (
  <div className="about-page animate-slide-up">
    <Helmet>
      <title>Office Bearers | IAPEN India</title>
      <meta
        name="description"
        content="Meet the Board of Directors, Core Team and National Executive Committee members of IAPEN India."
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

        <article className="official-copy-layout president-message mt-12">
          <div className="section-title-wrapper">
            <span className="section-subtitle">{pastPresidentMessage.sectionTitle}</span>
            <h2 className="section-title">{pastPresidentMessage.heading}</h2>
          </div>
          <div className="president-message-body">
            <figure className="president-message-portrait">
              <img
                src={pastPresidentMessage.image}
                alt={pastPresidentMessage.imageAlt}
                loading="lazy"
                decoding="async"
              />
              <figcaption>
                <strong>{pastPresidentMessage.author}</strong>
                <span>{pastPresidentMessage.role}</span>
              </figcaption>
            </figure>
            {pastPresidentMessage.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 60)}>{paragraph}</p>
            ))}
            <p className="president-message-signature">— {pastPresidentMessage.author}</p>
          </div>
        </article>

        <div className="section-title-wrapper mt-12">
          <span className="section-subtitle">National Leadership</span>
          <h2 className="section-title">Core Team</h2>
          <p className="section-desc">
            The leaders responsible for IAPEN India’s administrative and academic direction.
          </p>
        </div>
        <LeadershipGrid members={coreTeam} />

        <div className="section-title-wrapper mt-12">
          <span className="section-subtitle">Executive Committee</span>
          <h2 className="section-title">NEC Members</h2>
        </div>
        <LeadershipGrid members={necMembers} accent="teal" />
      </div>
    </section>
  </div>
);

export default OfficeBearers;
