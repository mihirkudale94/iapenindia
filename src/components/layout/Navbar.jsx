import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Mail } from 'lucide-react';
import chapterMenu from '@/data/chapterMenu';
import coreGroupMenu from '@/data/coreGroupMenu';

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
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
        { name: 'Office Bearers', path: '/office-bearers' },
        { name: 'Advisory Board', path: '/advisory-board' },
        { name: 'Bylaws', path: '/bylaws' },
      ],
    },
    {
      name: 'Chapters',
      wide: true,
      dropdown: chapterMenu.map((chapter) => ({
        name: chapter.name,
        path: `/chapters/${chapter.slug}`,
      })),
    },
    {
      name: 'Core Groups',
      wide: true,
      dropdown: coreGroupMenu.map((group) => ({
        name: group.name,
        path: `/core-groups/${group.slug}`,
      })),
    },
    {
      name: 'Education',
      dropdown: [
        { name: 'Courses & Education', path: '/courses' },
        { name: 'Newsletter Archive', path: '/newsletter-anniversary-edition' },
        { name: 'Malnutrition Activities', path: '/malnutrition' },
      ],
    },
    {
      name: 'ESPEN',
      dropdown: [
        { name: 'ESPEN LLL Courses', path: '/espen-lll-courses' },
        { name: 'ESPEN MEMBERSHIP', path: '/espen-membership' },
        { name: 'ESPEN Eligibility for T-LLL', path: '/espen-eligibility-for-t-lll' },
      ],
    },
    { name: 'Journal', path: 'https://jnutres.com/', external: true },
    { name: 'Events', path: '/events' },
    {
      name: 'ICNC',
      path: '/documents/icnc-2026.pdf',
      external: true,
      newTab: true,
    },
    { name: 'Contact', path: '/contact' },
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
        </div>
      </div>

      <nav className="main-nav glass-nav" aria-label="Primary navigation">
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
                  link.external ? (
                    <a
                      href={link.path}
                      target={link.newTab ? '_blank' : undefined}
                      rel={link.newTab ? 'noopener noreferrer' : undefined}
                      className="nav-link"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                    >
                      {link.name}
                    </Link>
                  )
                ) : (
                  <button
                    onClick={() => toggleDropdown(link.name)}
                    className={`nav-link dropdown-toggle ${activeDropdown === link.name ? 'active' : ''}`}
                    aria-expanded={activeDropdown === link.name}
                  >
                    {link.name} <ChevronDown size={14} />
                  </button>
                )}

                {link.dropdown && (
                  <div
                    className={`dropdown-menu ${link.wide ? 'dropdown-menu-wide' : ''} ${activeDropdown === link.name ? 'show' : ''}`}
                  >
                    {link.dropdown.map((subItem) => (
                      <Link key={subItem.name} to={subItem.path} className="dropdown-item">
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link to="/register-now" className="btn btn-accent btn-sm header-register-btn">
              Register Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div id="mobile-navigation" className={`mobile-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="mobile-sidebar-header">
          <Link to="/" className="logo-container" onClick={() => setIsOpen(false)}>
            <img
              src="/logo.png"
              alt="IAPEN INDIA"
              className="navbar-logo-img"
              style={{ height: '36px' }}
            />
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="close-sidebar-btn"
            aria-label="Close navigation menu"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mobile-menu-items">
          {navLinks.map((link) => (
            <div key={link.name} className="mobile-nav-group">
              {link.path ? (
                link.external ? (
                  <a
                    href={link.path}
                    target={link.newTab ? '_blank' : undefined}
                    rel={link.newTab ? 'noopener noreferrer' : undefined}
                    className="mobile-nav-link"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    to={link.path}
                    className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                )
              ) : (
                <>
                  <button
                    onClick={() => toggleDropdown(link.name)}
                    className="mobile-nav-link dropdown-toggle"
                    aria-expanded={activeDropdown === link.name}
                  >
                    {link.name}{' '}
                    <ChevronDown
                      size={16}
                      className={`chevron-icon ${activeDropdown === link.name ? 'rotate' : ''}`}
                    />
                  </button>
                  <div
                    className={`mobile-dropdown ${link.wide ? 'mobile-dropdown-scroll' : ''} ${activeDropdown === link.name ? 'show' : ''}`}
                  >
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
              to="/register-now"
              className="btn btn-accent w-full"
              onClick={() => setIsOpen(false)}
            >
              Register Now
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`sidebar-overlay ${isOpen ? 'show' : ''}`}
        onClick={() => setIsOpen(false)}
      ></div>
    </header>
  );
};

export default Navbar;
