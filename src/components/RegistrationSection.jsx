import { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Award,
  Shield,
  FileText,
  Upload,
  AlertCircle,
  CreditCard,
  Clipboard,
} from 'lucide-react';

const RegistrationSection = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    profession: '',
    qualification: '',
    organization: '',
    category: '',
    idType: '',
    idProof: null,
    cv: null,
    paymentProof: null,
    agreed: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [refNumber, setRefNumber] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'phone') {
      const numbersOnly = value.replace(/[^0-9]/g, '').slice(0, 10);
      setFormData({
        ...formData,
        [name]: numbersOnly,
      });
      if (errors[name]) {
        setErrors({ ...errors, [name]: null });
      }
      return;
    }

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let errorMsg = null;

    if (name === 'fullName' && !value.trim()) {
      errorMsg = 'Full name is required';
    } else if (name === 'email') {
      if (!value.trim()) {
        errorMsg = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        errorMsg = 'Please enter a valid email address';
      }
    } else if (name === 'phone') {
      if (!value.trim()) {
        errorMsg = 'Phone number is required';
      } else if (!/^\d{10}$/.test(value)) {
        errorMsg = 'Please enter a valid 10-digit phone number';
      }
    } else if (name === 'qualification' && !value.trim()) {
      errorMsg = 'Academic qualification is required';
    } else if (name === 'organization' && !value.trim()) {
      errorMsg = 'Organization/College name is required';
    } else if (name === 'profession' && !value) {
      errorMsg = 'Profession is required';
    } else if (name === 'category' && !value) {
      errorMsg = 'Membership category is required';
    } else if (name === 'idType' && !value) {
      errorMsg = 'Identity proof type is required';
    }

    setErrors((prev) => ({
      ...prev,
      [name]: errorMsg,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      const fileSizeMB = file.size / (1024 * 1024);
      const fileExt = file.name.split('.').pop().toLowerCase();

      let errorMsg = null;

      if (fileSizeMB > 5) {
        errorMsg = 'File size must be under 5MB';
      }

      if (name === 'idProof' || name === 'paymentProof') {
        const allowed = ['pdf', 'png', 'jpg', 'jpeg'];
        if (!allowed.includes(fileExt)) {
          errorMsg = 'Only PDF, PNG, JPG, or JPEG files are allowed';
        }
      } else if (name === 'cv') {
        const allowed = ['pdf', 'doc', 'docx'];
        if (!allowed.includes(fileExt)) {
          errorMsg = 'Only PDF, DOC, or DOCX files are allowed';
        }
      }

      if (errorMsg) {
        setErrors((prev) => ({
          ...prev,
          [name]: errorMsg,
        }));
        setFormData((prev) => ({
          ...prev,
          [name]: null,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: file,
        }));
        setErrors((prev) => ({
          ...prev,
          [name]: null,
        }));
      }
    }
  };

  const copyBankDetails = () => {
    const text = `Account Name: IAPEN INDIA ASSOCIATION FOR PARENTERAL AND ENTERAL NUTRITION\nAccount Number: 238805001011\nBank Name: ICICI Bank, Pune\nIFSC Code: ICIC0002388\nMICR Code: 411229046\nAccount Type: Current`;
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 3000);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!formData.profession) newErrors.profession = 'Profession is required';
    if (!formData.qualification.trim())
      newErrors.qualification = 'Academic qualification is required';
    if (!formData.organization.trim())
      newErrors.organization = 'Organization/College name is required';
    if (!formData.category) newErrors.category = 'Membership category is required';
    if (!formData.idType) newErrors.idType = 'Identity proof type is required';
    if (!formData.idProof) newErrors.idProof = 'Please upload a file for identity proof';
    if (!formData.cv) newErrors.cv = 'Please upload your CV / Short Bio';
    if (!formData.paymentProof)
      newErrors.paymentProof = 'Please upload your payment transaction receipt';
    if (!formData.agreed)
      newErrors.agreed = 'You must agree to the association rules and guidelines';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setRefNumber(Math.floor(1000 + Math.random() * 9000).toString());

      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

      if (!accessKey) {
        // Fallback simulation
        console.log(
          'No VITE_WEB3FORMS_ACCESS_KEY found in environment variables. Simulating submission locally.'
        );
        setTimeout(() => {
          setIsSubmitting(false);
          setIsSubmitted(true);
          window.scrollTo({
            top: document.getElementById('register').offsetTop - 100,
            behavior: 'smooth',
          });
        }, 2000);
      } else {
        try {
          const bodyData = new FormData();
          bodyData.append('access_key', accessKey);
          bodyData.append('subject', 'New Membership Application - IAPEN India');
          bodyData.append('full_name', formData.fullName);
          bodyData.append('email', formData.email);
          bodyData.append('phone', formData.phone);
          bodyData.append('profession', formData.profession);
          bodyData.append('qualification', formData.qualification);
          bodyData.append('organization', formData.organization);
          bodyData.append('category', formData.category);
          bodyData.append('id_type', formData.idType);

          if (formData.idProof instanceof File) {
            bodyData.append('id_proof', formData.idProof);
          }
          if (formData.cv instanceof File) {
            bodyData.append('cv', formData.cv);
          }
          if (formData.paymentProof instanceof File) {
            bodyData.append('payment_proof', formData.paymentProof);
          }

          const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: bodyData,
          });
          const result = await response.json();
          if (result.success) {
            setIsSubmitting(false);
            setIsSubmitted(true);
            window.scrollTo({
              top: document.getElementById('register').offsetTop - 100,
              behavior: 'smooth',
            });
          } else {
            setErrors({ submit: result.message || 'Failed to submit form. Please try again.' });
            setIsSubmitting(false);
          }
        } catch (err) {
          console.error('Submission error:', err);
          setErrors({ submit: 'A network error occurred. Please check your connection.' });
          setIsSubmitting(false);
        }
      }
    }
  };

  return (
    <section id="register" className="section registration-form-section">
      <div className="container">
        <div className="section-title-wrapper">
          <span className="section-subtitle">Application</span>
          <h2 className="section-title">Online Registration Form</h2>
          <p className="section-desc">
            Please transfer the membership fee to the IAPEN India bank account, then fill out the
            form below with your credentials and payment receipt.
          </p>
        </div>

        <div className="grid-2 align-start mt-8">
          {/* Left Column: Bank account details */}
          <div className="card card-primary bank-details-card">
            <div className="card-header-with-icon">
              <CreditCard className="text-primary" size={24} />
              <h3 className="card-title">Bank Transfer Details</h3>
            </div>
            <p className="card-desc">
              Transfer the exact membership fee matching your category using NEFT, IMPS, or UPI
              before submitting the form.
            </p>

            <div className="bank-info-box mt-4">
              <div className="bank-info-row">
                <span>Account Name:</span>
                <strong>IAPEN INDIA ASSOCIATION FOR PARENTERAL AND ENTERAL NUTRITION</strong>
              </div>
              <div className="bank-info-row mt-3">
                <span>Account Number:</span>
                <strong>238805001011</strong>
              </div>
              <div className="bank-info-row mt-3">
                <span>Bank & Branch:</span>
                <strong>ICICI Bank, Pune</strong>
              </div>
              <div className="bank-info-row mt-3">
                <span>IFSC Code:</span>
                <strong>ICIC0002388</strong>
              </div>
              <div className="bank-info-row mt-3">
                <span>MICR Code:</span>
                <strong>411229046</strong>
              </div>
              <div className="bank-info-row mt-3">
                <span>Account Type:</span>
                <strong>Current</strong>
              </div>
            </div>

            <div
              className="bank-info-row mt-6"
              style={{ borderTop: '1px solid var(--border-light)', paddingTop: '20px' }}
            >
              <h4 style={{ fontSize: '15px', color: 'var(--primary-navy)', marginBottom: '8px' }}>
                Process for Membership Application:
              </h4>
              <ol
                style={{
                  paddingLeft: '20px',
                  fontSize: '14px',
                  lineHeight: '1.6',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <li>
                  Make the Payment as per the respective category to the Bank Account mentioned
                  above.
                </li>
                <li>
                  Complete the Online Registration Form on the right of this page and upload the
                  required files.
                </li>
              </ol>
              <div
                className="mt-3"
                style={{
                  fontSize: '13px',
                  background: 'var(--primary-light)',
                  padding: '12px',
                  borderRadius: '6px',
                  lineHeight: '1.5',
                }}
              >
                <strong>The registration form requires you to attach:</strong>
                <ul style={{ paddingLeft: '16px', listStyleType: 'lower-alpha', marginTop: '4px' }}>
                  <li>Valid Identity proof (Aadhar card/ DL/ Passport/ PAN)</li>
                  <li>CV / Resume / short bio</li>
                  <li>Fee Payment transaction receipt</li>
                </ul>
              </div>
            </div>

            <button type="button" onClick={copyBankDetails} className="btn btn-outline w-full mt-6">
              <Clipboard size={16} /> {copySuccess ? 'Copied Details!' : 'Copy Bank Details'}
            </button>

            <div className="notice-box-inner mt-6">
              <AlertCircle size={18} className="text-accent" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span>
                  Acknowledgment of the Application and payment will be communicated within{' '}
                  <strong>7 working days</strong>.
                </span>
                <span>
                  Candidates will receive a Certificate of Membership within{' '}
                  <strong>30 days</strong>.
                </span>
                <span style={{ fontSize: '13px', marginTop: '4px', opacity: 0.9 }}>
                  For any further queries write to us on <strong>membership@iapenindia.org</strong>.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Form container */}
          <div className="form-container-box glass-panel">
            {isSubmitted ? (
              <div className="success-card text-center animate-fade">
                <div className="success-icon-box">
                  <Award size={48} className="text-teal" />
                </div>
                <h2>Registration Complete!</h2>
                <p>
                  Thank you for registering for IAPEN India Membership. Your application has been
                  logged with reference number <strong>IAPEN-2026-{refNumber}</strong>.
                </p>
                <p className="text-muted">
                  Our verification committee will review your uploaded credentials and CV. A
                  confirmation email with fee payment details and your digital membership card will
                  be sent to <strong>{formData.email}</strong> within 3 business days.
                </p>
                <button onClick={() => setIsSubmitted(false)} className="btn btn-primary mt-6">
                  Register Another Member
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="membership-form">
                {errors.submit && (
                  <div
                    className="form-error-banner animate-fade"
                    style={{
                      backgroundColor: 'rgba(220, 53, 69, 0.05)',
                      color: 'hsl(0, 84%, 60%)',
                      padding: '12px',
                      borderRadius: 'var(--radius-sm)',
                      marginBottom: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '14px',
                      border: '1px solid rgba(220, 53, 69, 0.2)',
                    }}
                  >
                    <AlertCircle size={18} />
                    <span>{errors.submit}</span>
                  </div>
                )}
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="fullName">
                      Full Name
                    </label>
                    <div className="input-with-icon">
                      <User size={18} className="input-icon" />
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        className={`form-input ${errors.fullName ? 'is-invalid' : ''}`}
                        placeholder="Dr. / Mr. / Ms."
                        value={formData.fullName}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {errors.fullName && (
                      <span className="form-error">
                        <AlertCircle size={12} /> {errors.fullName}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="email">
                      Email Address
                    </label>
                    <div className="input-with-icon">
                      <Mail size={18} className="input-icon" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className={`form-input ${errors.email ? 'is-invalid' : ''}`}
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {errors.email && (
                      <span className="form-error">
                        <AlertCircle size={12} /> {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">
                      Phone Number
                    </label>
                    <div className="input-with-icon">
                      <Phone size={18} className="input-icon" />
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        className={`form-input ${errors.phone ? 'is-invalid' : ''}`}
                        placeholder="10-digit number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        maxLength="10"
                      />
                    </div>
                    {errors.phone && (
                      <span className="form-error">
                        <AlertCircle size={12} /> {errors.phone}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="profession">
                      Profession
                    </label>
                    <div className="input-with-icon">
                      <Briefcase size={18} className="input-icon" />
                      <select
                        id="profession"
                        name="profession"
                        className={`form-select ${errors.profession ? 'is-invalid' : ''}`}
                        value={formData.profession}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                      >
                        <option value="">Select Profession</option>
                        <option value="doctor">Medical Doctor / Surgeon</option>
                        <option value="dietitian">Clinical Dietitian / Nutritionist</option>
                        <option value="pharmacist">Pharmacist</option>
                        <option value="nurse">Nurse / Allied Health Care Professional</option>
                        <option value="student">Student (Bachelor / Master Course)</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    {errors.profession && (
                      <span className="form-error">
                        <AlertCircle size={12} /> {errors.profession}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="qualification">
                      Highest Qualification
                    </label>
                    <div className="input-with-icon">
                      <Award size={18} className="input-icon" />
                      <input
                        type="text"
                        id="qualification"
                        name="qualification"
                        className={`form-input ${errors.qualification ? 'is-invalid' : ''}`}
                        placeholder="MD, MS, MSc Nutrition, etc."
                        value={formData.qualification}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {errors.qualification && (
                      <span className="form-error">
                        <AlertCircle size={12} /> {errors.qualification}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="organization">
                      Organization / College
                    </label>
                    <div className="input-with-icon">
                      <Shield size={18} className="input-icon" />
                      <input
                        type="text"
                        id="organization"
                        name="organization"
                        className={`form-input ${errors.organization ? 'is-invalid' : ''}`}
                        placeholder="Hospital / Institution Name"
                        value={formData.organization}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {errors.organization && (
                      <span className="form-error">
                        <AlertCircle size={12} /> {errors.organization}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="category">
                      Membership Category
                    </label>
                    <div className="input-with-icon">
                      <FileText size={18} className="input-icon" />
                      <select
                        id="category"
                        name="category"
                        className={`form-select ${errors.category ? 'is-invalid' : ''}`}
                        value={formData.category}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                      >
                        <option value="">Select Category</option>
                        <option value="doctor-life">Life Member (Doctor) - ₹5,000</option>
                        <option value="dietitian-life">
                          Life Member (Allied Health/Dietitian) - ₹3,000
                        </option>
                        <option value="student-annual">Student Member (Annual) - ₹500</option>
                      </select>
                    </div>
                    {errors.category && (
                      <span className="form-error">
                        <AlertCircle size={12} /> {errors.category}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="idType">
                      Select Identity Proof Type
                    </label>
                    <div className="input-with-icon">
                      <FileText size={18} className="input-icon" />
                      <select
                        id="idType"
                        name="idType"
                        className={`form-select ${errors.idType ? 'is-invalid' : ''}`}
                        value={formData.idType}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                      >
                        <option value="">Select ID Type</option>
                        <option value="aadhar">Aadhar Card</option>
                        <option value="pan">PAN Card</option>
                        <option value="passport">Passport</option>
                        <option value="college-id">College Student ID (For Students)</option>
                      </select>
                    </div>
                    {errors.idType && (
                      <span className="form-error">
                        <AlertCircle size={12} /> {errors.idType}
                      </span>
                    )}
                  </div>
                </div>

                {/* File Uploads */}
                <div className="grid-3 mt-4">
                  <div className="form-group">
                    <span className="form-label">Upload ID Proof (PDF/Image)</span>
                    <label
                      className={`file-upload-label ${formData.idProof ? 'file-selected' : ''} ${errors.idProof ? 'is-invalid' : ''}`}
                    >
                      <Upload size={16} />
                      <span className="text-ellipsis">
                        {formData.idProof
                          ? formData.idProof.name || formData.idProof
                          : 'Choose File'}
                      </span>
                      <input
                        type="file"
                        name="idProof"
                        className="hidden-file-input"
                        accept=".pdf,.png,.jpg,.jpeg"
                        onChange={handleFileChange}
                      />
                    </label>
                    {errors.idProof && (
                      <span className="form-error">
                        <AlertCircle size={12} /> {errors.idProof}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <span className="form-label">Upload CV / Resume (PDF/Word)</span>
                    <label
                      className={`file-upload-label ${formData.cv ? 'file-selected' : ''} ${errors.cv ? 'is-invalid' : ''}`}
                    >
                      <Upload size={16} />
                      <span className="text-ellipsis">
                        {formData.cv ? formData.cv.name || formData.cv : 'Choose File'}
                      </span>
                      <input
                        type="file"
                        name="cv"
                        className="hidden-file-input"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                      />
                    </label>
                    {errors.cv && (
                      <span className="form-error">
                        <AlertCircle size={12} /> {errors.cv}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <span className="form-label">Upload Fee Payment Receipt</span>
                    <label
                      className={`file-upload-label ${formData.paymentProof ? 'file-selected' : ''} ${errors.paymentProof ? 'is-invalid' : ''}`}
                    >
                      <Upload size={16} />
                      <span className="text-ellipsis">
                        {formData.paymentProof
                          ? formData.paymentProof.name || formData.paymentProof
                          : 'Choose File'}
                      </span>
                      <input
                        type="file"
                        name="paymentProof"
                        className="hidden-file-input"
                        accept=".pdf,.png,.jpg,.jpeg"
                        onChange={handleFileChange}
                      />
                    </label>
                    {errors.paymentProof && (
                      <span className="form-error">
                        <AlertCircle size={12} /> {errors.paymentProof}
                      </span>
                    )}
                  </div>
                </div>

                {/* Agreement Checkbox */}
                <div className="form-group checkbox-group mt-4">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="agreed"
                      className="form-checkbox"
                      checked={formData.agreed}
                      onChange={handleInputChange}
                    />
                    <span>
                      I hereby certify that the above credentials are correct, and I agree to abide
                      by the guidelines and professional code of conduct of the IAPEN India
                      Association.
                    </span>
                  </label>
                  {errors.agreed && (
                    <span className="form-error block-error">
                      <AlertCircle size={12} /> {errors.agreed}
                    </span>
                  )}
                </div>

                <div className="text-center mt-6">
                  <button
                    type="submit"
                    className="btn btn-accent btn-lg w-full-md"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationSection;
