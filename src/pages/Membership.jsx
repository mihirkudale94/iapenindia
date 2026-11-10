import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import {
  bankDetails,
  lifeBenefits,
  membershipEmail,
  membershipFees,
  membershipFormUrl,
  membershipIntro,
  requiredAttachments,
  studentBenefits,
} from '@/data/membershipData';

// Tick-mark list, as used for benefits and fees on the live page.
const IconList = ({ items, strong = false }) => (
  <ul className={`membership-list ${strong ? 'membership-list-strong' : ''}`}>
    {items.map((item) => (
      <li key={item}>
        <Check size={15} />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const Membership = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <>
      <Helmet>
        <title>Membership | IAPEN India</title>
        <meta
          name="description"
          content="IAPEN INDIA membership benefits, application process, membership fees and bank account details."
        />
      </Helmet>
      <div className="membership-page animate-slide-up">
        <section className="page-header bg-primary-dark">
          <div className="container">
            <h1 className="page-title text-white">Membership</h1>
            <nav className="membership-breadcrumb" aria-label="Breadcrumb">
              <Link to="/">IAPEN INDIA Association</Link>
              <span aria-hidden="true">&gt;</span>
              <span>Membership</span>
            </nav>
          </div>
        </section>

        <section className="section">
          <div className="container membership-content">
            <p className="membership-intro">{membershipIntro}</p>

            <h2 className="membership-title">Membership Benefits</h2>

            <h3 className="membership-heading">Privilege of Life Membership:</h3>
            <IconList items={lifeBenefits} />

            <h3 className="membership-heading">Privilege For Student Membership:</h3>
            <IconList items={studentBenefits} />

            <h3 id="register" className="membership-heading">
              Process for Membership Application :
            </h3>
            <ul className="membership-list membership-steps">
              {[
                'Make the Payment as per the respective category to the Bank Account mentioned in the form.',
                'Fill the Google form attached below with all compulsory questions duly completed.',
              ].map((step) => (
                <li key={step}>
                  <ArrowRight size={15} />
                  <span>{step}</span>
                </li>
              ))}
              <li>
                <ArrowRight size={15} />
                <span>
                  Google form requires the candidate to attach:
                  <ol className="membership-attachments" type="a">
                    {requiredAttachments.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </span>
              </li>
              {[
                'Acknowledgment of the Application and payment will be communicated within 7 working days.',
                'Candidates will receive a Certificate of Membership within 30 days.',
              ].map((step) => (
                <li key={step}>
                  <ArrowRight size={15} />
                  <span>{step}</span>
                </li>
              ))}
              <li>
                <ArrowRight size={15} />
                <span>
                  For any further queries write to us on{' '}
                  <a href={`mailto:${membershipEmail}`}>{membershipEmail}</a>
                </span>
              </li>
              <li>
                <ArrowRight size={15} />
                <span>
                  Applicants please note that membership is voluntary and once issued it is non
                  refundable and non transferable
                </span>
              </li>
            </ul>

            <p className="membership-form-link">
              <strong>Kindly click on the google form to proceed</strong> :
              <br />
              <a href={membershipFormUrl} target="_blank" rel="noopener noreferrer">
                {membershipFormUrl}
              </a>
            </p>

            <h3 className="membership-heading membership-heading-spaced">Membership Fees</h3>
            <IconList items={membershipFees} strong />

            <h3 className="membership-heading">Bank Account Details</h3>
            <div className="membership-bank">
              {bankDetails.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Membership;
