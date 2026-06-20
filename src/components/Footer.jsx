import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Send } from 'lucide-react';
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from './SocialIcons';

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
            <li><Link to="/events">Upcoming Events</Link></li>
            <li><a href="https://jnutres.com/" target="_blank" rel="noopener noreferrer">Nutrition Journal</a></li>
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
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon facebook" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon twitter" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon linkedin" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon instagram" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon youtube" aria-label="YouTube">
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
