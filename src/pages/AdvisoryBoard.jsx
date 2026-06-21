import { Helmet } from 'react-helmet-async';
import LeadershipGrid from '../components/LeadershipGrid';
import leadership from '../data/leadershipOfficial.json';

const advisoryBoard = leadership.advisoryBoard.members;

const AdvisoryBoard = () => (
  <div className="about-page animate-slide-up">
    <Helmet>
      <title>Advisory Board | IAPEN India</title>
      <meta
        name="description"
        content="Meet the distinguished national advisory board guiding IAPEN India."
      />
    </Helmet>
    <section className="page-header bg-primary-dark">
      <div className="container">
        <span className="page-subtitle">Scientific Guidance</span>
        <h1 className="page-title text-white">Advisory Board</h1>
      </div>
    </section>
    <section className="section advisory-board-section">
      <div className="container">
        <article className="official-copy-layout advisory-introduction">
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
          <span className="section-subtitle">Governance</span>
          <h2 className="section-title">National Advisory Board</h2>
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

export default AdvisoryBoard;
