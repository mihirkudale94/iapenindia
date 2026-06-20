import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Mail } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const toggleDropdown = (name) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { 
      name: 'About Us', 
      dropdown: [
        { name: 'About IAPEN India', path: '/about' },
        { name: 'Office Bearers', path: '/about#office-bearers' },
        { name: 'Advisory Board', path: '/about#advisory-board' }
      ]
    },
    { 
      name: 'Chapters', 
      path: '/chapters',
      dropdown: [
        { name: 'Search Chapters', path: '/chapters' },
        { name: 'Chapters Directory', path: '/chapters#directory' }
      ]
    },
    { 
      name: 'Core Groups', 
      path: '/core-groups'
    },
    { 
      name: 'ESPEN', 
      dropdown: [
        { name: 'ESPEN LLL Courses', path: '/courses#espen-lll' },
        { name: 'ESPEN Membership', path: '/courses#espen-membership' },
        { name: 'Eligibility for T-LLL', path: '/courses#t-lll' }
      ]
    },
    { name: 'Courses', path: '/courses' },
    { name: 'Journal', path: '/journal' },
    { name: 'Events', path: '/events' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className={`navbar-header ${scrolled ? 'scrolled shadow-md' : ''}`}>
      <div className="nav-top glass-panel">
        <div className="container nav-top-container">
          <div className="contact-info">
            <a href="mailto:info@iapenindia.org" className="top-link">
              <Mail size={14} /> <span>info@iapenindia.org</span>
            </a>
            <span className="top-divider">|</span>
            <span className="top-time">Mon - Fri: 10:00 AM - 6:00 PM</span>
          </div>
          <div className="top-right-links">
            <Link to="/membership" className="top-link-btn">Become a Member</Link>
          </div>
        </div>
      </div>
      
      <nav className="main-nav glass-nav">
        <div className="container nav-container">
          {/* Logo */}
          <Link to="/" className="logo-container">
            <img src="/logo.png" alt="IAPEN INDIA" className="navbar-logo-img" />
          </Link>

          {/* Desktop Navigation */}
          <div className="desktop-menu">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="nav-item-wrapper"
                onMouseEnter={() => !link.path && setActiveDropdown(link.name)}
                onMouseLeave={() => !link.path && setActiveDropdown(null)}
              >
                {link.path ? (
                  <Link 
                    to={link.path} 
                    className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <button 
                    onClick={() => toggleDropdown(link.name)}
                    className={`nav-link dropdown-toggle ${activeDropdown === link.name ? 'active' : ''}`}
                  >
                    {link.name} <ChevronDown size={14} />
                  </button>
                )}

                {link.dropdown && (
                  <div className={`dropdown-menu ${activeDropdown === link.name ? 'show' : ''}`}>
                    {link.dropdown.map((subItem) => (
                      <Link 
                        key={subItem.name} 
                        to={subItem.path} 
                        className="dropdown-item"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link to="/membership#register" className="btn btn-accent btn-sm header-register-btn">
              Register Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`mobile-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="mobile-sidebar-header">
          <Link to="/" className="logo-container" onClick={() => setIsOpen(false)}>
            <img src="/logo.png" alt="IAPEN INDIA" className="navbar-logo-img" style={{ height: '36px' }} />
          </Link>
          <button onClick={() => setIsOpen(false)} className="close-sidebar-btn">
            <X size={24} />
          </button>
        </div>
        
        <div className="mobile-menu-items">
          {navLinks.map((link) => (
            <div key={link.name} className="mobile-nav-group">
              {link.path ? (
                <Link 
                  to={link.path} 
                  className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ) : (
                <>
                  <button 
                    onClick={() => toggleDropdown(link.name)}
                    className="mobile-nav-link dropdown-toggle"
                  >
                    {link.name} <ChevronDown size={16} className={`chevron-icon ${activeDropdown === link.name ? 'rotate' : ''}`} />
                  </button>
                  <div className={`mobile-dropdown ${activeDropdown === link.name ? 'show' : ''}`}>
                    {link.dropdown.map((subItem) => (
                      <Link 
                        key={subItem.name} 
                        to={subItem.path} 
                        className="mobile-dropdown-item"
                        onClick={() => setIsOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
          <div className="mobile-cta-wrapper">
            <Link 
              to="/membership#register" 
              className="btn btn-accent w-full"
              onClick={() => setIsOpen(false)}
            >
              Register Now
            </Link>
          </div>
        </div>
      </div>
      <div className={`sidebar-overlay ${isOpen ? 'show' : ''}`} onClick={() => setIsOpen(false)}></div>
    </header>
  );
};

export default Navbar;
