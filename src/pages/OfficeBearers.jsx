import { Helmet } from 'react-helmet-async';
import LeadershipGrid from '@/components/widgets/LeadershipGrid';
import leadership from '@/data/leadershipOfficial.json';
import pastPresidentMessage from '@/data/pastPresidentMessage';

const boardOfDirectors = leadership.officeBearers.members.slice(0, 4);
const coreTeam = leadership.officeBearers.members.slice(4, 10);
const necMembers = leadership.officeBearers.members.slice(10);
const advisoryBoard = leadership.advisoryBoard.members;

const OfficeBearers = () => (
  <div className="about-page animate-slide-up">
    <Helmet>
      <title>Office Bearers | IAPEN India</title>
      <meta
        name="description"
        content="Meet the Board of Directors, Core Team, National Executive Committee and Advisory Board members of IAPEN India."
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

        <article className="official-copy-layout advisory-introduction mt-12">
          <span className="section-subtitle">About the Advisory Board</span>
          <h2>Visionary Guidance for Clinical Nutrition</h2>
          <p>
            At the heart of IAPEN INDIA lies a visionary Advisory Board, a council of the most
            respected thought leaders, clinicians, medical specialists, dietetic professionals, and
            researchers shaping the future of clinical nutrition, public health initiatives, and
            metabolic healthcare.
          </p>
          <p>
            These eminent experts bring together decades of experience and insight from across
            medicine, academia, and public health to guide IAPEN India’s mission: to elevate the
            standards of nutritional care and empower healthcare professionals with knowledge that
            transforms patient outcomes.
          </p>
          <p>
            Each member of the Advisory Board embodies IAPEN India’s core values of integrity,
            innovation, and impact, ensuring that the organization remains at the forefront of
            clinical nutrition education, research, and policy advocacy, both nationally and
            internationally. Their mentorship inspires strategic direction, scientific oversight,
            and visionary counsel for innovation, collaboration, and excellence, ensuring that every
            IAPEN INDIA initiative reflects the highest levels of scientific rigor, compassion, and
            commitment to human health.
          </p>
          <p>
            Together, they illuminate the path forward for evidence-based, patient-centered
            nutrition practice in India and beyond.
          </p>
        </article>

        <div className="section-title-wrapper">
          <span className="section-subtitle">Scientific Guidance</span>
          <h2 className="section-title">Members of the Advisory Board</h2>
          <p className="section-desc">
            Distinguished clinical professors and pioneers guiding the association’s strategic and
            scientific initiatives.
          </p>
        </div>
        <LeadershipGrid members={advisoryBoard} />
      </div>
    </section>
  </div>
);

export default OfficeBearers;
