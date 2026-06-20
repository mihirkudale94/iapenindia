import React, { useState } from 'react';
import { MapPin, Mail, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    email: '',
    isMember: 'no',
    membershipNo: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { ...formData, [name]: value };
    let updatedErrors = { ...errors };
    
    if (errors[name]) {
      updatedErrors[name] = null;
    }
    
    if (name === 'isMember' && value === 'no') {
      updatedData.membershipNo = '';
      updatedErrors.membershipNo = null;
    }
    
    setFormData(updatedData);
    setErrors(updatedErrors);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let errorMsg = null;
    
    if (name === 'name' && !value.trim()) {
      errorMsg = 'Name is required';
    } else if (name === 'email') {
      if (!value.trim()) {
        errorMsg = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        errorMsg = 'Email is invalid';
      }
    } else if (name === 'membershipNo' && formData.isMember === 'yes' && !value.trim()) {
      errorMsg = 'Membership number is required';
    } else if (name === 'message' && !value.trim()) {
      errorMsg = 'Query message is required';
    }
    
    setErrors(prev => ({ ...prev, [name]: errorMsg }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (formData.isMember === 'yes' && !formData.membershipNo.trim()) {
      newErrors.membershipNo = 'Membership number is required';
    }
    if (!formData.message.trim()) newErrors.message = 'Query message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      
      if (!accessKey) {
        // Fallback simulation
        console.log("No VITE_WEB3FORMS_ACCESS_KEY found in environment variables. Simulating submission locally.");
        setTimeout(() => {
          setIsSubmitting(false);
          setIsSubmitted(true);
          setFormData({ name: '', location: '', email: '', isMember: 'no', membershipNo: '', message: '' });
          setTimeout(() => setIsSubmitted(false), 6000);
        }, 1500);
      } else {
        try {
          const bodyData = new FormData();
          bodyData.append("access_key", accessKey);
          bodyData.append("subject", "New Contact Support Query - IAPEN India");
          bodyData.append("name", formData.name);
          bodyData.append("email", formData.email);
          bodyData.append("location", formData.location || "N/A");
          bodyData.append("is_member", formData.isMember);
          bodyData.append("membership_no", formData.membershipNo || "N/A");
          bodyData.append("message", formData.message);

          const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: bodyData
          });
          const result = await response.json();
          if (result.success) {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setFormData({ name: '', location: '', email: '', isMember: 'no', membershipNo: '', message: '' });
            setTimeout(() => setIsSubmitted(false), 6000);
          } else {
            setErrors({ submit: result.message || "Failed to submit form. Please try again." });
            setIsSubmitting(false);
          }
        } catch (err) {
          console.error("Submission error:", err);
          setErrors({ submit: "A network error occurred. Please check your connection." });
          setIsSubmitting(false);
        }
      }
    }
  };

  return (
    <div className="contact-page animate-slide-up">
      {/* Header */}
      <section className="page-header bg-primary-dark">
        <div className="container">
          <span className="page-subtitle">Get In Touch</span>
          <h1 className="page-title text-white">Contact Us</h1>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="section contact-section">
        <div className="container grid-2">
          {/* Contact Details */}
          <div className="contact-info-col">
            <h2 className="section-title text-left">Association Headquarters</h2>
            <p className="about-text">
              Have questions regarding membership, upcoming CNE courses, chapter registrations, or research publications? Reach out to the national administrative office.
            </p>

            <div className="contact-cards-list mt-6">
              <div className="card contact-detail-card">
                <MapPin className="text-primary detail-card-icon" size={24} />
                <div>
                  <h4>Office Address</h4>
                  <p className="text-muted">Survey No. 8/1, Omkar Colony, Lane no. 1, Pimple Gurav, Pune, Maharashtra, India</p>
                </div>
              </div>

              <div className="card contact-detail-card">
                <Mail className="text-accent detail-card-icon" size={24} />
                <div>
                  <h4>Email Support</h4>
                  <p className="text-muted">General: <a href="mailto:info@iapenindia.org" className="link-hover">info@iapenindia.org</a></p>
                  <p className="text-muted">Accounts: <a href="mailto:treasurer@iapenindia.org" className="link-hover">treasurer@iapenindia.org</a></p>
                </div>
              </div>

              <div className="card contact-detail-card">
                <Clock className="text-teal detail-card-icon" size={24} />
                <div>
                  <h4>Office Hours</h4>
                  <p className="text-muted">Monday - Friday: 10:00 AM - 6:00 PM</p>
                  <p className="text-muted">Closed on Weekends and Public Holidays</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-col glass-panel form-container-box">
            <h3 className="form-box-title">Send a Message</h3>
            
            {errors.submit && (
              <div className="form-error-banner animate-fade" style={{ backgroundColor: 'rgba(220, 53, 69, 0.05)', color: 'hsl(0, 84%, 60%)', padding: '12px', borderRadius: 'var(--radius-sm)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', border: '1px solid rgba(220, 53, 69, 0.2)' }}>
                <AlertCircle size={18} />
                <span>{errors.submit}</span>
              </div>
            )}
            
            {isSubmitted && (
              <div className="form-success-banner animate-fade">
                <CheckCircle size={18} />
                <span>Thank you! Your query has been submitted. We will get back to you shortly.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Your Name (required)</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    className={`form-input ${errors.name ? 'is-invalid' : ''}`} 
                    placeholder="Enter your full name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                  />
                  {errors.name && <span className="form-error"><AlertCircle size={12} /> {errors.name}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="location">Location</label>
                  <input 
                    type="text" 
                    id="location" 
                    name="location" 
                    className="form-input" 
                    placeholder="Enter your city/state" 
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">Your Email (required)</label>
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
                {errors.email && <span className="form-error"><AlertCircle size={12} /> {errors.email}</span>}
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="isMember">Are you existing member?</label>
                  <select 
                    id="isMember" 
                    name="isMember" 
                    className="form-select"
                    value={formData.isMember}
                    onChange={handleInputChange}
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="membershipNo">Membership Number</label>
                  <input 
                    type="text" 
                    id="membershipNo" 
                    name="membershipNo" 
                    className={`form-input ${errors.membershipNo ? 'is-invalid' : ''}`} 
                    placeholder="Enter ID (if member)" 
                    disabled={formData.isMember === 'no'}
                    value={formData.membershipNo}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                  />
                  {errors.membershipNo && <span className="form-error"><AlertCircle size={12} /> {errors.membershipNo}</span>}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">Query (required)</label>
                <textarea 
                  id="message" 
                  name="message" 
                  className={`form-textarea ${errors.message ? 'is-invalid' : ''}`} 
                  rows="5" 
                  placeholder="Write your query details here..."
                  value={formData.message}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                ></textarea>
                {errors.message && <span className="form-error"><AlertCircle size={12} /> {errors.message}</span>}
              </div>

              <button 
                type="submit" 
                className="btn btn-primary w-full mt-4" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending Query...' : 'Send Query'} <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Google Maps Placement */}
      <section className="map-section section-bg animate-fade">
        <div className="container">
          <div className="map-placeholder-box text-center glass-panel" style={{ padding: '24px', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
              <MapPin size={24} className="text-primary animate-bounce" />
              <h3 style={{ margin: 0 }}>Interactive Map Location</h3>
            </div>
            <p className="text-muted" style={{ marginBottom: '20px' }}>Survey No. 8/1, Omkar Colony, Lane no. 1, Pimple Gurav, Pune, Maharashtra, India</p>
            <div className="map-embed-container" style={{ width: '100%', overflow: 'hidden', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.9868739989647!2d73.82105157496627!3d18.586648729141076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b8b98f94eccf%3A0x41e532e49da36303!2sIAPEN%20INDIA%20ASSOCIATION%20FOR%20PARENTERAL%20AND%20ENTERAL%20NUTRITION!5e0!3m2!1sen!2sin!4v1718875000000!5m2!1sen!2sin" 
                width="100%" 
                height="450" 
                style={{ border: 0, display: 'block' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="IAPEN India Location Map"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
