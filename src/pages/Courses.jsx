import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Award, ExternalLink, Mail, Users } from 'lucide-react';
import { certificateCourses } from '@/data/coursesData';

const [diabetesCourse, hypertensionCourse] = certificateCourses;

const Poster = ({ course }) => (
  <a
    className="course-poster"
    href={course.poster}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`Open full ${course.posterAlt}`}
  >
    <img src={course.poster} alt={course.posterAlt} loading="lazy" decoding="async" />
  </a>
);

const Courses = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <div className="courses-page animate-slide-up">
      <section className="page-header bg-primary-dark">
        <div className="container">
          <span className="page-subtitle">Educational Programs</span>
          <h1 className="page-title text-white">Courses & Certifications</h1>
        </div>
      </section>

      {/* Certificate courses (live: /courses/) */}
      <section id="certificate-courses" className="section">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Online Learning</span>
            <h2 className="section-title">Certificate Courses</h2>
          </div>

          <article id="diabetes-course" className="course-feature">
            <Poster course={diabetesCourse} />
            <div className="course-feature-body">
              <span className="custom-badge bg-primary-light text-primary">
                {diabetesCourse.duration} · {diabetesCourse.mode}
              </span>
              <h3 className="course-feature-title">{diabetesCourse.title}</h3>
              <p className="course-feature-meta">
                <Users size={16} aria-hidden="true" /> {diabetesCourse.offeredBy}
              </p>

              <div className="course-groups">
                {diabetesCourse.groups.map((group) => (
                  <div key={group.heading}>
                    <h4>{group.heading}</h4>
                    <ul className="course-list">
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="course-fees">
                <h4>Course fees</h4>
                {diabetesCourse.fees.map((fee) => (
                  <p key={fee.label}>
                    <strong>{fee.amount}</strong> <span>({fee.label})</span>
                  </p>
                ))}
              </div>

              <p className="about-text">
                <strong>Eligibility:</strong> {diabetesCourse.eligibility}
              </p>

              <div className="hero-actions mt-6">
                <a href={`mailto:${diabetesCourse.contactEmail}`} className="btn btn-primary">
                  <Mail size={16} aria-hidden="true" /> {diabetesCourse.contactEmail}
                </a>
              </div>
            </div>
          </article>

          <article id="hypertension-course" className="course-feature course-feature-reverse">
            <Poster course={hypertensionCourse} />
            <div className="course-feature-body">
              <span className="custom-badge bg-teal-light text-teal">
                In partnership with {hypertensionCourse.partner}
              </span>
              <h3 className="course-feature-title">{hypertensionCourse.title}</h3>
              <p className="course-feature-meta">
                <Award size={16} aria-hidden="true" /> Certified by {hypertensionCourse.certifiedBy}
              </p>
              <p className="course-feature-meta">
                <Award size={16} aria-hidden="true" /> Endorsed by {hypertensionCourse.endorsedBy}
              </p>

              <ol className="course-modules">
                {hypertensionCourse.modules.map((module) => (
                  <li key={module.number}>
                    <span className="course-module-number">Module {module.number}</span>
                    <span className="course-module-title">{module.title}</span>
                    <span className="course-module-faculty">{module.faculty.join(' · ')}</span>
                  </li>
                ))}
              </ol>

              <div className="hero-actions mt-6">
                <a
                  href={hypertensionCourse.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Register / course details <ExternalLink size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default Courses;
