import { Helmet } from 'react-helmet-async';
import LeadershipGrid from '@/components/widgets/LeadershipGrid';
import leadership from '@/data/leadershipOfficial.json';

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
        <div className="section-title-wrapper">
          <h2 className="section-title">Members of the Advisory Board</h2>
        </div>
        <LeadershipGrid members={advisoryBoard} />
      </div>
    </section>
  </div>
);

export default AdvisoryBoard;
