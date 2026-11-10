import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AlertCircle, CheckCircle, Send } from 'lucide-react';

// Same embed the official register-now page shows beside the form.
const LOCATION_MAP_URL =
  'https://www.google.com/maps/d/embed?mid=18koZcHUzKT03dXiT_uqne0BUY37LDnpy';

const EMPTY_FORM = { name: '', phone: '', email: '' };

const validateField = (name, value) => {
  const trimmed = value.trim();
  if (name === 'name' && !trimmed) return 'Full name is required';
  if (name === 'phone') {
    if (!trimmed) return 'Phone is required';
    if (!/^[+\d][\d\s-]{6,}$/.test(trimmed)) return 'Phone number is invalid';
  }
  if (name === 'email') {
    if (!trimmed) return 'E-mail is required';
    if (!/\S+@\S+\.\S+/.test(trimmed)) return 'E-mail is invalid';
  }
  return null;
};

const FIELDS = [
  { name: 'name', type: 'text', placeholder: 'Full Name *', autoComplete: 'name' },
  { name: 'phone', type: 'tel', placeholder: 'Phone *', autoComplete: 'tel' },
  { name: 'email', type: 'email', placeholder: 'E-mail*', autoComplete: 'email' },
];

const RegisterNow = () => {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const finish = () => {
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData(EMPTY_FORM);
    setTimeout(() => setIsSubmitted(false), 6000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = {};
    for (const { name } of FIELDS) {
      const msg = validateField(name, formData[name]);
      if (msg) nextErrors[name] = msg;
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setIsSubmitting(true);
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      // No form backend configured (local dev): simulate a successful send.
      setTimeout(finish, 1000);
      return;
    }

    try {
      const body = new FormData();
      body.append('access_key', accessKey);
      body.append('subject', 'New Registration - IAPEN India');
      body.append('name', formData.name);
      body.append('phone', formData.phone);
      body.append('email', formData.email);

      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body });
      const result = await response.json();
      if (result.success) {
        finish();
      } else {
        setErrors({ submit: result.message || 'Failed to submit form. Please try again.' });
        setIsSubmitting(false);
      }
    } catch {
      setErrors({ submit: 'A network error occurred. Please check your connection.' });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-page animate-slide-up">
      <Helmet>
        <title>Register Now | IAPEN India</title>
        <meta
          name="description"
          content="Register with IAPEN India — the Indian Association for Parenteral and Enteral Nutrition."
        />
      </Helmet>

      <section className="page-header bg-primary-dark">
        <div className="container">
          <nav className="page-subtitle register-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">IAPEN INDIA Association</Link> <span aria-hidden="true">&gt;</span>{' '}
            <span>Register Now</span>
          </nav>
          <h1 className="page-title text-white">Register Now</h1>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2 register-grid">
          <div className="register-form-card">
            <h3 className="register-form-title">Fill up the registration form</h3>

            {errors.submit && (
              <div className="register-banner register-banner-error" role="alert">
                <AlertCircle size={18} />
                <span>{errors.submit}</span>
              </div>
            )}

            {isSubmitted && (
              <div className="register-banner" role="status">
                <CheckCircle size={18} />
                <span>Thank you for registering! We will get back to you shortly.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {FIELDS.map(({ name, type, placeholder, autoComplete }) => (
                <div className="form-group" key={name}>
                  <input
                    type={type}
                    name={name}
                    aria-label={placeholder.replace(/\s*\*$/, '')}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    className={`form-input register-input ${errors[name] ? 'is-invalid' : ''}`}
                    value={formData[name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors[name] && (
                    <span className="form-error register-error">
                      <AlertCircle size={12} /> {errors[name]}
                    </span>
                  )}
                </div>
              ))}

              <button
                type="submit"
                className="btn btn-accent register-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Registering...' : 'Register'} <Send size={16} />
              </button>
            </form>
          </div>

          <div className="register-map">
            <iframe
              src={LOCATION_MAP_URL}
              title="IAPEN INDIA Location Map"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterNow;
