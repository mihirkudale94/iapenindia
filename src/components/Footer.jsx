import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Send } from 'lucide-react';

// Inline SVGs for brand icons that are missing in this Lucide version
const Facebook = ({ size }) => (
  <svg className="lucide lucide-facebook" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const Twitter = ({ size }) => (
  <svg className="lucide lucide-twitter" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);
const Linkedin = ({ size }) => (
  <svg className="lucide lucide-linkedin" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);
const Instagram = ({ size }) => (
  <svg className="lucide lucide-instagram" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);
const Youtube = ({ size }) => (
  <svg className="lucide lucide-youtube" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/><polygon points="10 15 15 12 10 9 10 15"/></svg>
);

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-grid">
        {/* About Column */}
        <div className="footer-col footer-about">
          <Link to="/" className="logo-container footer-logo">
            <img src="/logo.png" alt="IAPEN INDIA" className="footer-logo-img" style={{ height: '48px', filter: 'brightness(0) invert(1)' }} />
          </Link>
          <p className="footer-text">
            Indian Association for Parenteral and Enteral Nutrition is a professional non-profit organization dedicated to advancing nutritional healthcare and clinical nutrition practices in India.
          </p>
          <div className="footer-contact-details">
            <div className="contact-item">
              <MapPin size={18} className="contact-icon" />
              <span>Survey No. 8/1, Omkar Colony, Lane no. 1, Pimple Gurav, Pune, Maharashtra, India</span>
            </div>
            <div className="contact-item">
              <Mail size={18} className="contact-icon" />
              <a href="mailto:info@iapenindia.org">info@iapenindia.org</a>
            </div>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="footer-col">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/chapters">Chapters Directory</Link></li>
            <li><Link to="/core-groups">Clinical Core Groups</Link></li>
            <li><Link to="/courses">Courses & Education</Link></li>
            <li><Link to="/membership">Membership Plans</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Support & Legal Column */}
        <div className="footer-col">
          <h3 className="footer-heading">Policies</h3>
          <ul className="footer-links">
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms-and-conditions">Terms & Conditions</Link></li>
            <li><Link to="/refund-policy">Refund Policy</Link></li>
            <li><Link to="/events">Upcoming Events</Link></li>
            <li><a href="https://jnutres.com/" target="_blank" rel="noopener noreferrer">Nutrition Journal</a></li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="footer-col">
          <h3 className="footer-heading">Stay Informed</h3>
          <p className="footer-text">Subscribe to our newsletter to receive the latest updates on conferences, webinars, and publications.</p>
          <form className="subscribe-form" onSubmit={handleSubscribe}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="subscribe-input" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="subscribe-btn" aria-label="Subscribe">
              <Send size={16} />
            </button>
          </form>
          {subscribed && <span className="subscribe-success">Thank you for subscribing!</span>}
          
          <div className="social-links-wrapper">
            <h4 className="social-heading">Follow Us</h4>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="YouTube">
                <Youtube size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p>&copy; {currentYear} IAPEN India. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
