import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap } from 'lucide-react';
import { espenBlockMembership, espenLllCourses, tlllCriteria } from '@/data/coursesData';

// The live site's "ESPEN" menu: one page per sub-menu item, at the same URLs.

const useScrollTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
};

const PageHeader = ({ subtitle, title, breadcrumb }) => (
  <section className="page-header bg-primary-dark">
    <div className="container">
      {subtitle && <span className="page-subtitle">{subtitle}</span>}
      <h1 className="page-title text-white">{title}</h1>
      {breadcrumb && (
        <nav className="espen-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">IAPEN INDIA Association</Link> &gt; <span>{title}</span>
        </nav>
      )}
    </div>
  </section>
);

const lllCourse = (id) => espenLllCourses.find((course) => course.id === id);
const lll2022 = lllCourse('lll-2022');
const lll2023 = lllCourse('lll-2023');
const lll2024 = lllCourse('lll-2024');

const Gallery = ({ images, columns }) => (
  <div className={`course-gallery ${columns === 3 ? 'course-gallery-3' : ''}`}>
    {images.map((image) => (
      <a key={image.src} href={image.src} target="_blank" rel="noopener noreferrer">
        <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
      </a>
    ))}
  </div>
);

const CriteriaItems = ({ items }) => (
  <ol className="course-list course-list-alpha">
    {items.map((item) =>
      typeof item === 'string' ? (
        <li key={item}>{item}</li>
      ) : (
        <li key={item.text}>
          {item.text}
          <ol className="course-list course-list-roman">
            {item.items.map((sub) => (
              <li key={sub}>{sub}</li>
            ))}
          </ol>
        </li>
      )
    )}
  </ol>
);

// Live: /espen-lll-courses/
export const EspenLllCourses = () => {
  useScrollTop();

  return (
    <div className="courses-page animate-slide-up">
      <PageHeader title="ESPEN LLL Courses" breadcrumb />

      {/* Same sequence as the live page: title, 2022 text, glimpses heading,
          2022 gallery, then the 2023 and 2024 courses (heading, text, gallery). */}
      <section className="section">
        <div className="container espen-lll">
          <h2 className="section-title text-left">ESPEN LLL Courses</h2>
          <p className="about-text">
            A successful ESPEN LLL virtual course conducted by IAPEN INDIA on{' '}
            <b>10, 11, 12th March 2022</b>.
            <br />
            <b>Course Cordinator Dr. Shilpa Varma</b>
          </p>

          <h2 className="section-title text-left espen-lll-glimpses">
            A few glimpses from the LLL courses :
          </h2>
          <Gallery images={lll2022.images} columns={3} />

          <h3 className="course-feature-title espen-lll-heading">
            Successful completion of the Physical ESPEN LLL Course
          </h3>
          <p className="about-text">
            Successful completion of the Physical ESPEN LLL Course- a programme in Clinical
            Nutrition and Metabolism is based on an Educational Curriculum offering more than 120
            training modules, created and peer-reviewed by recognized experts in the field during{' '}
            <b>#ICNC2023</b> at Chennai.
            <br />
            <br />
            With super attendance of around 75 participants for each module, and with eminent
            International and National ESPEN faculties like Prof Remy Meier, Prof Rocco Barazzoni,
            Dr Veeradej Pisprasert, Dr Shilpa Varma, Dr Bidita Shah and also Dr P C Vijayakumar, Dr
            Biju Pottakat, Shivshankar Timmanpyati amongst few, this was a very well recieved and
            successful course.
          </p>
          <Gallery images={lll2023.images} columns={3} />

          <h3 className="course-feature-title espen-lll-heading">
            Sharing stupendous success of the ESPEN LLL Course 2024 at Sahara Star, Mumbai @ICNC
            2024.😊
          </h3>
          <p className="about-text">
            We at IAPEN INDIA are humbled by all the smiles and positive feedbacks of satisfied
            learners and in gratitude of the eminent faculties Dr Perundurai Chinnaswamy Vijayakumar
            Sir, Biju Pottakkat Sir, Shivshankar Timmanpyati Sir, Prof Rocco Barazzoni, Prof Rémy
            Meier, Mansi Gupta Patil , Datta Patel , Bidita Shah , Dr Jayasshree Toddkar Madam, Dr
            Harish Ambekar for their support.
            <br />
            <br />
            IAPEN INDIA strives to continue this journey of contributing towards evidence based
            learnings.
          </p>
          <Gallery images={lll2024.images} columns={3} />
        </div>
      </section>
    </div>
  );
};

// Live: /espen-membership/
export const EspenMembership = () => {
  useScrollTop();

  return (
    <div className="courses-page animate-slide-up">
      <PageHeader subtitle="ESPEN" title="ESPEN MEMBERSHIP" />

      <section className="section">
        <div className="container grid-2 align-center">
          <div>
            <span className="section-subtitle">Greetings from IAPEN India</span>
            <h2 className="section-title text-left">ESPEN Block Membership</h2>
            <p className="about-text">
              Please find the registration link for the ESPEN Block Membership 2022 below. ESPEN
              block membership fees, inclusive of GST:
            </p>
            <ul className="course-fee-table">
              {espenBlockMembership.fees.map((fee) => (
                <li key={fee.category}>
                  <div>
                    <strong>{fee.category}</strong>
                    <span>{fee.detail}</span>
                  </div>
                  <strong className="course-fee-amount">{fee.amount}</strong>
                </li>
              ))}
            </ul>
            <ul className="course-list">
              {espenBlockMembership.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>

            <div className="hero-actions mt-6">
              <a
                href={espenBlockMembership.formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Block membership registration form
              </a>
              <a href={`mailto:${espenBlockMembership.email}`} className="btn btn-outline">
                Queries: {espenBlockMembership.email}
              </a>
            </div>
          </div>

          <div className="glass-panel benefits-sidebar">
            <BookOpen className="text-teal sidebar-icon-large" size={48} />
            <h3>Team PEN Communication</h3>
            <p>
              For any further queries, you may mail Team PEN Communication, IAPEN India at{' '}
              {espenBlockMembership.email}.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

// Live: /espen-eligibility-for-t-lll/
export const EspenTlllEligibility = () => {
  useScrollTop();

  return (
    <div className="courses-page animate-slide-up">
      <PageHeader subtitle="ESPEN" title="ESPEN Eligibility for T-LLL" />

      <section className="section section-bg">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Advanced Training</span>
            <h2 className="section-title">ESPEN T-LLL Criteria</h2>
            <p className="section-desc">{tlllCriteria.title}.</p>
          </div>

          <div className="grid-2 course-criteria-grid">
            {tlllCriteria.sections.map((section) => (
              <div key={section.heading} className="card course-criteria-card">
                <h3>
                  <GraduationCap size={20} aria-hidden="true" /> {section.heading}
                </h3>
                {section.intro && <p className="card-text">{section.intro}</p>}
                <CriteriaItems items={section.items} />
              </div>
            ))}
          </div>

          <div className="card card-accent course-criteria-card mt-6">
            <h3>Disclaimer</h3>
            {tlllCriteria.disclaimer.map((text) => (
              <p key={text} className="card-text">
                {text}
              </p>
            ))}
            <p className="card-text">
              The application for the Letter of Recommendation for TLLL should be mailed to{' '}
              {tlllCriteria.applicationEmails.map((email, index) => (
                <span key={email}>
                  {index > 0 && ' and '}
                  <a href={`mailto:${email}`}>
                    <strong>{email}</strong>
                  </a>
                </span>
              ))}{' '}
              not later than <strong>{tlllCriteria.deadline}</strong>. For any queries, please email{' '}
              <a href={`mailto:${tlllCriteria.queriesEmail}`}>
                <strong>{tlllCriteria.queriesEmail}</strong>
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
