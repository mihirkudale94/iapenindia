import { CheckCircle, CreditCard, ExternalLink, FileText, Mail, ShieldCheck } from 'lucide-react';

const bankDetails = [
  ['Account holder', 'IAPEN INDIA ASSOCIATION FOR PARENTERAL AND ENTERAL NUTRITION'],
  ['Account number', '238805001011'],
  ['IFSC Code', 'ICIC0002388'],
  ['Name of Bank', 'ICICI Bank, Pune'],
  ['MICR Code', '411229046'],
  ['Account Type', 'Current'],
];

const RegistrationSection = () => (
  <section id="register" className="section registration-section section-bg">
    <div className="container">
      <div className="section-title-wrapper">
        <span className="section-subtitle">Official Application Process</span>
        <h2 className="section-title">Apply for IAPEN India Membership</h2>
        <p className="section-desc">
          Make the membership payment for your category, then complete the official Google Form with
          the required documents.
        </p>
      </div>

      <div className="grid-2 align-start official-registration-grid">
        <article className="card official-registration-card">
          <div className="card-header-with-icon">
            <div className="icon-wrapper bg-primary-light">
              <CreditCard className="text-primary" size={24} />
            </div>
            <h3 className="card-title">Bank Account Details</h3>
          </div>
          <dl className="bank-detail-list">
            {bankDetails.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <div className="registration-security-note">
            <ShieldCheck size={19} />
            <p>
              Transfer the exact membership fee matching your category before submitting the
              official form.
            </p>
          </div>
        </article>

        <article className="card official-registration-card">
          <div className="card-header-with-icon">
            <div className="icon-wrapper bg-teal-light">
              <FileText className="text-teal" size={24} />
            </div>
            <h3 className="card-title">Process for Membership Application</h3>
          </div>
          <ol className="official-process-list">
            <li>
              <CheckCircle size={18} />
              <span>
                Make the payment as per the respective category to the bank account shown on this
                page.
              </span>
            </li>
            <li>
              <CheckCircle size={18} />
              <span>
                Fill the official Google Form with all compulsory questions duly completed.
              </span>
            </li>
            <li>
              <CheckCircle size={18} />
              <span>
                Attach valid identity proof (Aadhar card, driving licence, passport, or PAN), the
                transaction receipt or UTR, and your graduation certificate.
              </span>
            </li>
            <li>
              <CheckCircle size={18} />
              <span>
                Acknowledgment of the application and payment will be communicated within seven
                working days.
              </span>
            </li>
            <li>
              <CheckCircle size={18} />
              <span>Candidates will receive a Certificate of Membership within 30 days.</span>
            </li>
          </ol>
          <a
            href="https://forms.gle/h4kSoNmHffsNt8dP7"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary w-full official-form-cta"
          >
            Proceed to Official Google Form <ExternalLink size={17} />
          </a>
          <a href="mailto:membership@iapenindia.org" className="membership-help-link">
            <Mail size={16} /> membership@iapenindia.org
          </a>
        </article>
      </div>
    </div>
  </section>
);

export default RegistrationSection;
