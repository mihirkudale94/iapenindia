import { Helmet } from 'react-helmet-async';
import { Download, ExternalLink, FileText, Mail } from 'lucide-react';

const resources = {
  bylaws: {
    eyebrow: 'Governance',
    title: 'IAPEN India Bylaws',
    description:
      'The official Standard Operating Procedure and bylaws of IAPEN India, finalized on 2 February 2023.',
    document: '/documents/iapen-india-bylaws-2023.pdf',
    documentLabel: 'Bye-Laws Final — 02 February 2023',
  },
  newsletter: {
    eyebrow: 'Publications',
    title: 'Newsletter — Anniversary Edition',
    description: 'IAPEN India Newsletter anniversary edition and July 2021 final report.',
    document: '/documents/iapen-india-newsletter-july-2021.pdf',
    documentLabel: 'July 2021 Final Report',
  },
};

const DocumentResource = ({ type }) => {
  const resource = resources[type];
  return (
    <div className="resource-page animate-slide-up">
      <Helmet>
        <title>{resource.title} | IAPEN India</title>
        <meta name="description" content={resource.description} />
      </Helmet>
      <section className="page-header bg-primary-dark">
        <div className="container">
          <span className="page-subtitle">{resource.eyebrow}</span>
          <h1 className="page-title text-white">{resource.title}</h1>
        </div>
      </section>
      <section className="section">
        <div className="container resource-container">
          {type === 'newsletter' && (
            <article className="resource-introduction">
              <span className="section-subtitle">Anniversary Message</span>
              <h2>Celebrating India and IAPEN India</h2>
              <p>
                We all have reason for dual celebrations today as India celebrates its 75th
                independence and we also celebrate our first anniversary of the IAPEN India
                Newsletter.
              </p>
              <p>
                On this special day we are happy to release our second quarter newsletter for this
                year.
              </p>
              <p>
                IAPEN India Association for Parenteral and Enteral Nutrition salutes the glory of
                the nation and pays homage to the martyrs of the freedom struggle. Amidst these
                trying times of the pandemic, we appreciate and honor the corona warriors, including
                physicians, nurses, dietitians, paramedical personnel, and all healthcare workers.
                It is a proud privilege to be a part of an independent India and herald it towards a
                successful and healthy nation.
              </p>
              <p>
                At IAPEN India, as a multidisciplinary association, we are committed to supporting
                “Healthcare for All”.
              </p>
              <p>
                Thank you all for your valuable contributions. Looking forward for the same in
                future too.
              </p>
              <a href="mailto:iapeninsight@gmail.com" className="source-link">
                <Mail size={16} /> iapeninsight@gmail.com
              </a>
            </article>
          )}
          <div className="resource-document-card">
            <div className="resource-document-heading">
              <div className="resource-document-icon">
                <FileText size={30} />
              </div>
              <div>
                <span className="section-subtitle">Official Document</span>
                <h2>{resource.documentLabel}</h2>
                <p>{resource.description}</p>
              </div>
            </div>
            <div className="resource-actions">
              <a
                href={resource.document}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <ExternalLink size={17} /> Open PDF
              </a>
              <a href={resource.document} download className="btn btn-outline">
                <Download size={17} /> Download
              </a>
            </div>
            <iframe
              src={resource.document}
              title={resource.documentLabel}
              className="resource-pdf-frame"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export const Bylaws = () => <DocumentResource type="bylaws" />;
export const NewsletterArchive = () => <DocumentResource type="newsletter" />;

export const MalnutritionActivities = () => (
  <div className="resource-page animate-slide-up">
    <Helmet>
      <title>Malnutrition Activities | IAPEN India</title>
      <meta
        name="description"
        content="Official IAPEN India malnutrition awareness activities from February 2022."
      />
    </Helmet>
    <section className="page-header bg-primary-dark">
      <div className="container">
        <span className="page-subtitle">Awareness & Action</span>
        <h1 className="page-title text-white">Malnutrition Activities</h1>
      </div>
    </section>
    <section className="section">
      <div className="container resource-container">
        <div className="section-title-wrapper">
          <span className="section-subtitle">Official Archive</span>
          <h2 className="section-title">List of Activities in February 2022</h2>
        </div>
        <div className="resource-table-wrap">
          <table className="resource-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Chapter</th>
                <th>Event</th>
                <th>Campus</th>
                <th>Instructions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1–7 February 2022</td>
                <td>—</td>
                <td>Meerut (Ritika Sharma)</td>
                <td>Recipe competition</td>
                <td>Vanita Vishraam University, Food and Nutrition Department</td>
                <td>Importance of pulses</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
);
