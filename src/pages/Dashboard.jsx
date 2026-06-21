import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Helmet } from 'react-helmet-async';
import {
  User, Mail, Award, BookOpen, FileText, Upload, CheckCircle,
  Printer, Sparkles, ShieldCheck,
  Building, Calendar, Lock, LogOut, ClipboardCheck,
  TrendingUp, RefreshCw, Check, Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { useDemo } from '../components/DemoContext';

// Import Recharts components for the admin view
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from 'recharts';

// Mock stats/charts data
const MONTHLY_REGISTRATIONS = [
  { name: 'Jan', members: 110, revenue: 140000 },
  { name: 'Feb', members: 160, revenue: 210000 },
  { name: 'Mar', members: 210, revenue: 290000 },
  { name: 'Apr', members: 320, revenue: 410000 },
  { name: 'May', members: 480, revenue: 580000 },
  { name: 'Jun', members: 640, revenue: 790000 }
];

const CHAPTER_DISTRIBUTION = [
  { name: 'Mumbai', count: 384 },
  { name: 'Delhi', count: 512 },
  { name: 'Bangalore', count: 310 },
  { name: 'Chennai', count: 260 },
  { name: 'Pune', count: 220 },
  { name: 'Kolkata', count: 180 }
];

const TIER_DISTRIBUTION = [
  { name: 'Life Member (MD)', value: 1600, color: '#0b3c5d' },
  { name: 'Life Member (Allied)', value: 2400, color: '#2080a8' },
  { name: 'Student Member', value: 1000, color: '#c99b3b' }
];

const LLL_MODULES = [
  { id: 'M1', name: 'Nutritional Support in ICU & Sepsis', completed: true, date: 'Mar 10, 2025' },
  { id: 'M2', name: 'Nutrition Support in Cancer Patients', completed: true, date: 'Jul 24, 2025' },
  { id: 'M3', name: 'Nutritional Support in Gastrointestinal Diseases', completed: true, date: 'Nov 05, 2025' },
  { id: 'M4', name: 'Nutrition in Pediatric & Neonatal Practice', completed: false, date: '-' },
  { id: 'M5', name: 'Nutritional Support in Renal & Hepatic Failure', completed: false, date: '-' },
  { id: 'M6', name: 'Home Parenteral & Enteral Feeding', completed: false, date: '-' },
];

const MOCK_CHAPTER_MEMBERS = [
  { name: 'Dr. Vivek Sharma', profession: 'ICU Intensivist', tier: 'Life Member', status: 'Approved', credits: 24 },
  { name: 'Dr. Priya Nair', profession: 'Clinical Dietitian', tier: 'Life Member (Allied)', status: 'Approved', credits: 16 },
  { name: 'Dr. Suresh Awale', profession: 'Pediatric Surgeon', tier: 'Life Member', status: 'Pending Review', credits: 8 },
  { name: 'Dr. Neeta Iyer', profession: 'Clinical Dietitian', tier: 'Student Member', status: 'Approved', credits: 4 },
  { name: 'Dr. Vivek Sharma', profession: 'Oncologist', tier: 'Life Member', status: 'Pending Review', credits: 12 }
];

const AUDIT_LOGS = [
  { text: 'Coordinator Dr. Ritu Sinha approved 4 CNE credits for Dr. Mansi Patil', time: '10 mins ago', type: 'system' },
  { text: 'Manuscript draft ABS-2026-004 submitted by Dr. Mansi Patil', time: '2 hours ago', type: 'submit' },
  { text: 'New Life Member Dr. Vivek Sharma registered in Mumbai Chapter', time: '5 hours ago', type: 'register' },
  { text: 'Admin approved ESPEN training calendar updates for July 2026', time: '1 day ago', type: 'system' }
];

const DEMO_ACCOUNTS = [
  { label: 'Member Portal', role: 'member', email: 'member@iapenindia.org' },
  { label: 'Coordinator Desk', role: 'coordinator', email: 'coordinator@iapenindia.org' },
  { label: 'Admin Console', role: 'admin', email: 'admin@iapenindia.org' },
];

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const {
    role,
    user,
    loginAs,
    submissions,
    setSubmissions,
    addToast,
    theme,
    handleApproveAbstract,
    handleRejectAbstract,
    handleRequestRevisionAbstract
  } = useDemo();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    fullName: '',
    email: '',
    password: '',
    profession: '',
    organization: '',
    state: '',
  });

  const [activeTab, setActiveTab] = useState('profile');
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  // New Abstract form state
  const [abstractForm, setAbstractForm] = useState({
    title: '',
    authors: '',
    coreGroup: 'Pediatric Nutrition',
    abstractText: '',
    file: null,
  });
  const [abstractMessage, setAbstractMessage] = useState('');

  // Handle auto fill helper
  const fillDemoCredentials = (email = 'member@iapenindia.org') => {
    setLoginEmail(email);
    setLoginPassword('password123');
    setLoginError('');
  };

  useEffect(() => {
    const requestedRole = searchParams.get('role');
    const requestedAccount = DEMO_ACCOUNTS.find((account) => account.role === requestedRole);

    if (requestedAccount && role === 'none') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsRegistering(false);
      fillDemoCredentials(requestedAccount.email);
    }
  }, [searchParams, role]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginEmail === 'member@iapenindia.org' && loginPassword === 'password123') {
      loginAs('member');
      setLoginError('');
    } else if (loginEmail === 'coordinator@iapenindia.org' && loginPassword === 'password123') {
      loginAs('coordinator');
      setLoginError('');
    } else if (loginEmail === 'admin@iapenindia.org' && loginPassword === 'password123') {
      loginAs('admin');
      setLoginError('');
    } else {
      setLoginError('Invalid email or password. Use demo login for quick testing.');
    }
  };

  const handleLogout = () => {
    loginAs('none');
    setActiveTab('profile');
  };

  const handleAbstractSubmit = (e) => {
    e.preventDefault();
    if (!abstractForm.title || !abstractForm.abstractText) return;

    const newAbs = {
      id: `ABS-2026-0${submissions.length + 5}`,
      title: abstractForm.title,
      authors: abstractForm.authors || user.fullName,
      coreGroup: abstractForm.coreGroup,
      submittedDate: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      status: 'Under Review',
    };

    setSubmissions([newAbs, ...submissions]);
    setAbstractForm({
      title: '',
      authors: '',
      coreGroup: 'Pediatric Nutrition',
      abstractText: '',
      file: null,
    });
    addToast('Manuscript abstract uploaded to registry successfully!', 'success');
    setAbstractMessage('Abstract submitted successfully! You can track its status below.');
    setTimeout(() => setAbstractMessage(''), 5000);
  };

  const triggerPrint = () => {
    window.print();
  };

  return (
    <>
      <Helmet>
        <title>Member Portal | IAPEN India</title>
        <meta name="description" content="Access IAPEN India Membership Portal. Download certificates, submit research papers, and track professional credits." />
      </Helmet>

      {/* Printable Certificate Template */}
      {selectedCertificate && (
        <div className="print-only-container">
          <div className="printable-certificate">
            <div className="cert-border-outer">
              <div className="cert-border-inner">
                <div className="cert-header">
                  <h2>INDIAN ASSOCIATION FOR PARENTERAL AND ENTERAL NUTRITION</h2>
                  <p className="cert-sub">IAPEN INDIA CLINICAL NUTRITION CONGRESS</p>
                </div>
                <div className="cert-title-badge">CERTIFICATE OF PARTICIPATION</div>
                <div className="cert-body">
                  <p className="cert-presented">This is proudly presented to</p>
                  <h3>{user?.fullName}</h3>
                  <p className="cert-desc">
                    for active participation and completion of professional criteria in the course
                  </p>
                  <h4>{selectedCertificate.title}</h4>
                  <p className="cert-date">Conducted on {selectedCertificate.date}</p>
                </div>
                <div className="cert-signatures">
                  <div className="sig-block">
                    <div className="sig-line"></div>
                    <p>Dr. Ketan Patel</p>
                    <span>President, IAPEN India</span>
                  </div>
                  <div className="sig-block">
                    <div className="sig-line"></div>
                    <p>Prof. Ananya Sen</p>
                    <span>Academic Committee Head</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="dashboard-page animate-slide-up non-print-content">
        {/* Header Banner */}
        <section className="page-header bg-primary-dark" style={{ background: theme === 'dark' ? 'linear-gradient(135deg, #05131f, #0c2b45)' : 'linear-gradient(135deg, #0b3c5d, #051b2c)' }}>
          <div className="container flex-between" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span className="page-subtitle">IAPEN Member Area</span>
              <h1 className="page-title text-white">Member Portal</h1>
            </div>
            {role !== 'none' && (
              <button onClick={handleLogout} className="btn btn-outline text-white border-white flex items-center gap-2">
                <LogOut size={16} /> Logout
              </button>
            )}
          </div>
        </section>

        <section className="section dashboard-main">
          <div className="container">
            {role === 'none' ? (
              /* Glassmorphic Login & Registration Portal */
              <div className="max-w-md mx-auto" style={{ maxWidth: '480px', margin: '0 auto' }}>
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-panel p-8 shadow-lg"
                  style={{
                    background: theme === 'dark' ? 'rgba(11, 26, 43, 0.75)' : 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(240,245,250,0.7))',
                    border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(11, 60, 93, 0.15)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '30px',
                    textAlign: 'left'
                  }}
                >
                  <div className="text-center mb-6" style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <div className="w-16 h-16 bg-primary-light text-primary rounded-full flex items-center justify-center mx-auto mb-4" style={{ width: '64px', height: '64px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                      <Lock size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-primary-dark" style={{ margin: '0 0 8px 0', color: theme === 'dark' ? '#f1f5f9' : 'var(--primary-dark)', fontSize: '24px' }}>
                      {isRegistering ? 'Create Member Account' : 'Authorized Sign-in'}
                    </h2>
                    <p className="text-sm text-muted" style={{ margin: 0, color: 'var(--text-muted)', fontSize: '14px' }}>
                      {isRegistering ? 'Register your IAPEN India credentials' : 'Access your professional dashboard'}
                    </p>
                  </div>

                  {loginError && (
                    <div style={{ backgroundColor: '#fef2f2', color: '#b91c1c', padding: '12px', borderRadius: '6px', fontSize: '14px', marginBottom: '16px', border: '1px solid #fee2e2' }}>
                      {loginError}
                    </div>
                  )}

                  <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {isRegistering ? (
                      <>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <label style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', color: 'var(--primary)' }}>Full Name</label>
                          <input 
                            type="text" 
                            required
                            placeholder="Dr./Ms. Full Name"
                            style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', background: 'rgba(255,255,255,0.8)' }}
                            value={registerForm.fullName}
                            onChange={(e) => setRegisterForm({ ...registerForm, fullName: e.target.value })}
                          />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <label style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', color: 'var(--primary)' }}>Email Address</label>
                          <input 
                            type="email" 
                            required
                            placeholder="member@iapenindia.org"
                            style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', background: 'rgba(255,255,255,0.8)' }}
                            value={registerForm.email}
                            onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                          />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <label style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', color: 'var(--primary)' }}>Profession</label>
                          <input 
                            type="text"
                            placeholder="Clinical Dietitian / Nutritionist"
                            style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', background: 'rgba(255,255,255,0.8)' }}
                            value={registerForm.profession}
                            onChange={(e) => setRegisterForm({ ...registerForm, profession: e.target.value })}
                          />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <label style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', color: 'var(--primary)' }}>State</label>
                          <input 
                            type="text"
                            placeholder="Maharashtra"
                            style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', background: 'rgba(255,255,255,0.8)' }}
                            value={registerForm.state}
                            onChange={(e) => setRegisterForm({ ...registerForm, state: e.target.value })}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <label style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', color: 'var(--primary)' }}>Registered Email</label>
                          <input 
                            type="email" 
                            required
                            placeholder="member@iapenindia.org"
                            style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', background: 'rgba(255,255,255,0.8)' }}
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                          />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <label style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', color: 'var(--primary)' }}>Secure Password</label>
                          <input 
                            type="password" 
                            required
                            placeholder="••••••••"
                            style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', background: 'rgba(255,255,255,0.8)' }}
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                          />
                        </div>
                      </>
                    )}

                    <button type="submit" className="btn btn-primary w-full" style={{ width: '100%', padding: '12px', marginTop: '8px', fontWeight: '600' }}>
                      {isRegistering ? 'Submit Registration' : 'Secure Login'}
                    </button>
                  </form>

                  {!isRegistering && (
                    <div 
                      style={{
                        marginTop: '24px',
                        padding: '16px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        border: '1px dashed var(--accent)',
                        textAlign: 'center',
                        backgroundColor: theme === 'dark' ? 'rgba(201, 155, 59, 0.1)' : 'var(--accent-light)',
                        color: theme === 'dark' ? '#cbd5e1' : 'var(--text-dark)'
                      }}
                    >
                      <Sparkles size={16} className="text-accent" style={{ margin: '0 auto 6px auto', color: 'var(--accent)' }} />
                      <strong>Choose Demo Access Level:</strong>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
                        {DEMO_ACCOUNTS.map((account) => (
                          <button
                            key={account.email}
                            type="button"
                            onClick={() => fillDemoCredentials(account.email)}
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              gap: '10px',
                              width: '100%',
                              padding: '9px 10px',
                              border: '1px solid rgba(201, 155, 59, 0.35)',
                              borderRadius: '6px',
                              background: theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.65)',
                              color: theme === 'dark' ? '#e2e8f0' : 'var(--text-dark)',
                              cursor: 'pointer',
                              fontSize: '12px',
                              textAlign: 'left'
                            }}
                          >
                            <span style={{ fontWeight: '800', color: 'var(--accent)' }}>{account.label}</span>
                            <span style={{ overflowWrap: 'anywhere' }}>{account.email}</span>
                          </button>
                        ))}
                      </div>
                      <p style={{ margin: '10px 0 0 0', fontSize: '12px' }}>
                        Password for all demo accounts: <strong>password123</strong>
                      </p>
                    </div>
                  )}

                  <div className="text-center mt-6 text-sm" style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>
                    {isRegistering ? (
                      <p style={{ margin: 0 }}>Already have an account? <span onClick={() => setIsRegistering(false)} style={{ color: 'var(--primary)', fontWeight: '700', cursor: 'pointer', textDecoration: 'underline' }}>Login here</span></p>
                    ) : (
                      <p style={{ margin: 0 }}>Don't have an account? <span onClick={() => setIsRegistering(true)} style={{ color: 'var(--primary)', fontWeight: '700', cursor: 'pointer', textDecoration: 'underline' }}>Register portal access</span></p>
                    )}
                  </div>
                </motion.div>
              </div>
            ) : (
              /* Authorized Portal Interface */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                
                {/* Top Welcome Panel */}
                <div 
                  className="glass-panel p-6"
                  style={{
                    background: theme === 'dark' ? 'linear-gradient(135deg, #0b1a27, #05131f)' : 'linear-gradient(135deg, var(--primary-dark), var(--primary-navy))',
                    border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
                    color: 'white',
                    borderRadius: 'var(--radius-lg)',
                    padding: '24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '16px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', textAlign: 'left' }}>
                    <div className="w-16 h-16 bg-white bg-opacity-10 text-white rounded-full flex items-center justify-center" style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justify: 'center' }}>
                      <User size={32} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <h2 className="text-white text-xl font-bold" style={{ color: 'white', margin: 0, fontSize: '20px' }}>{user.fullName}</h2>
                        <span className="bg-accent text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold" style={{ backgroundColor: 'var(--accent)', color: 'white', fontSize: '11px', padding: '2px 8px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <ShieldCheck size={12} /> {user.tier}
                        </span>
                      </div>
                      <p style={{ margin: '4px 0 0 0', color: '#cbd5e1', fontSize: '14px' }}>{user.profession}</p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ margin: 0, color: '#94a3b8', fontSize: '11px', textTransform: 'uppercase', fontWeight: '600' }}>Membership ID</p>
                    <strong style={{ color: 'var(--accent)', fontSize: '18px' }}>{user.membershipId}</strong>
                  </div>
                </div>

                {/* Navigation Tabs based on Role */}
                {role === 'member' && (
                  <div className="search-filter-container glass-panel" style={{ padding: '8px', margin: 0, background: theme==='dark'?'#0b1a27':'#ffffff' }}>
                    <div className="region-filter-tabs" style={{ display: 'flex', width: '100%', justifyContent: 'space-around', flexWrap: 'wrap', gap: '8px' }}>
                      <button className={`region-tab-btn ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
                        <User size={16} className="inline mr-2" style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} /> Profile & Chapter
                      </button>
                      <button className={`region-tab-btn ${activeTab === 'certificates' ? 'active' : ''}`} onClick={() => setActiveTab('certificates')}>
                        <Award size={16} className="inline mr-2" style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} /> Certificate Wallet
                      </button>
                      <button className={`region-tab-btn ${activeTab === 'abstracts' ? 'active' : ''}`} onClick={() => setActiveTab('abstracts')}>
                        <FileText size={16} className="inline mr-2" style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} /> Abstract Submissions
                      </button>
                      <button className={`region-tab-btn ${activeTab === 'credits' ? 'active' : ''}`} onClick={() => setActiveTab('credits')}>
                        <BookOpen size={16} className="inline mr-2" style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} /> Course Credits
                      </button>
                    </div>
                  </div>
                )}

                {role === 'coordinator' && (
                  <div className="search-filter-container glass-panel" style={{ padding: '8px', margin: 0, background: theme==='dark'?'#0b1a27':'#ffffff' }}>
                    <div className="region-filter-tabs" style={{ display: 'flex', width: '100%', justifyContent: 'space-around', flexWrap: 'wrap', gap: '8px' }}>
                      <button className={`region-tab-btn ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
                        <Building size={16} className="inline mr-2" style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} /> Chapter Overview
                      </button>
                      <button className={`region-tab-btn ${activeTab === 'chapterMembers' ? 'active' : ''}`} onClick={() => setActiveTab('chapterMembers')}>
                        <Users size={16} className="inline mr-2" style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} /> Chapter Members
                      </button>
                      <button className={`region-tab-btn ${activeTab === 'creditApprovals' ? 'active' : ''}`} onClick={() => setActiveTab('creditApprovals')}>
                        <CheckCircle size={16} className="inline mr-2" style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} /> CNE Approvals
                      </button>
                    </div>
                  </div>
                )}

                {role === 'admin' && (
                  <div className="search-filter-container glass-panel" style={{ padding: '8px', margin: 0, background: theme==='dark'?'#0b1a27':'#ffffff' }}>
                    <div className="region-filter-tabs" style={{ display: 'flex', width: '100%', justifyContent: 'space-around', flexWrap: 'wrap', gap: '8px' }}>
                      <button className={`region-tab-btn ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
                        <TrendingUp size={16} className="inline mr-2" style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} /> Analytics Dashboard
                      </button>
                      <button className={`region-tab-btn ${activeTab === 'manuscripts' ? 'active' : ''}`} onClick={() => setActiveTab('manuscripts')}>
                        <ClipboardCheck size={16} className="inline mr-2" style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} /> Manuscript Review Board
                      </button>
                      <button className={`region-tab-btn ${activeTab === 'logs' ? 'active' : ''}`} onClick={() => setActiveTab('logs')}>
                        <RefreshCw size={16} className="inline mr-2" style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} /> System Audit Logs
                      </button>
                    </div>
                  </div>
                )}

                {/* Tab Contents Panel */}
                <div className="tab-contents-panel mt-2">
                  
                  {/* --- LIFE MEMBER TABS --- */}
                  {role === 'member' && (
                    <>
                      {/* PROFILE TAB */}
                      {activeTab === 'profile' && (
                        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                          <div 
                            className="glass-panel p-6"
                            style={{
                              background: 'linear-gradient(145deg, #0c2b45, #051b2c)',
                              color: 'white',
                              borderRadius: 'var(--radius-lg)',
                              border: '2px solid var(--accent)',
                              boxShadow: 'var(--shadow-accent-glow)',
                              padding: '24px',
                              textAlign: 'left',
                              position: 'relative',
                              overflow: 'hidden'
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                              <strong style={{ color: 'var(--accent)', fontSize: '13px', tracking: '0.15em' }}>IAPEN INDIA</strong>
                              <span style={{ fontSize: '11px', backgroundColor: 'var(--accent)', color: 'white', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase', fontWeight: '600' }}>Active Member</span>
                            </div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                              <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '700', margin: 0 }}>{user.fullName}</h3>
                              <p style={{ margin: 0, color: '#94a3b8', fontSize: '13px' }}>{user.organization}</p>
                              
                              <div style={{ paddingTop: '16px', borderTop: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                  <span style={{ color: '#64748b', fontSize: '10px', textTransform: 'uppercase', display: 'block' }}>Member Since</span>
                                  <span style={{ color: 'white', fontSize: '13px', fontWeight: '600' }}>{user.joinedDate}</span>
                                </div>
                                <div>
                                  <span style={{ color: '#64748b', fontSize: '10px', textTransform: 'uppercase', display: 'block' }}>Chapter</span>
                                  <span style={{ color: 'white', fontSize: '13px', fontWeight: '600' }}>{user.chapter}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="glass-panel p-6" style={{ padding: '24px', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <h3 style={{ color: theme === 'dark' ? '#f1f5f9' : 'var(--primary-dark)', fontWeight: '700', fontSize: '18px', margin: '0 0 16px 0' }}>Activity Overview</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}><Award size={16} /> Certificates Earned</span>
                                <strong style={{ color: theme === 'dark' ? '#f1f5f9' : 'var(--primary-dark)' }}>{user.completedCourses}</strong>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}><FileText size={16} /> Abstracts Submitted</span>
                                <strong style={{ color: theme === 'dark' ? '#f1f5f9' : 'var(--primary-dark)' }}>{submissions.filter(s => s.authors.includes(user.fullName)).length}</strong>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}><BookOpen size={16} /> LLL Credits Completed</span>
                                <strong style={{ color: theme === 'dark' ? '#f1f5f9' : 'var(--primary-dark)' }}>{user.lllCredits} / 120</strong>
                              </div>
                            </div>
                            <div style={{ paddingTop: '16px', marginTop: '16px', borderTop: '1px solid var(--border-ultra-light)', display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                              <span style={{ color: 'var(--text-muted)' }}>Credits path to Teacher LLL</span>
                              <span style={{ fontWeight: '600', color: 'var(--primary)' }}>{(user.lllCredits / 120 * 100).toFixed(0)}% Done</span>
                            </div>
                          </div>

                          <div className="glass-panel p-6" style={{ padding: '24px', textAlign: 'left' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                              <div style={{ padding: '8px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', borderRadius: '6px' }}>
                                <Building size={20} />
                              </div>
                              <div>
                                <h3 style={{ color: theme === 'dark' ? '#f1f5f9' : 'var(--primary-dark)', fontWeight: '700', fontSize: '18px', margin: 0 }}>Regional Chapter</h3>
                                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Affiliated based on location</span>
                              </div>
                            </div>
                            <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                              You are connected to the <strong>{user.chapter}</strong> based in <strong>{user.state}</strong>.
                            </p>
                            <div style={{ backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'var(--bg-section)', padding: '16px', borderRadius: '6px', border: '1px solid var(--border-ultra-light)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Chapter Coordinator Contact</div>
                              <div style={{ fontWeight: '600', color: theme === 'dark' ? 'var(--accent)' : 'var(--primary-navy)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <User size={14} /> Dr. Ritu Sinha
                              </div>
                              <a href="mailto:mumbai@iapenindia.org" style={{ fontSize: '13px', fontWeight: '600', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Mail size={12} /> mumbai@iapenindia.org
                              </a>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* CERTIFICATE WALLET TAB */}
                      {activeTab === 'certificates' && (
                        <div style={{ textAlign: 'left' }}>
                          <div style={{ marginBottom: '24px' }}>
                            <h3 style={{ color: theme === 'dark' ? '#f1f5f9' : 'var(--primary-dark)', fontWeight: '700', fontSize: '20px', margin: '0 0 4px 0' }}>Your Digital Certificates</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0 }}>Securely verify and export your participation credentials in print-ready formats.</p>
                          </div>

                          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                            <div className="glass-panel p-6" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid var(--border-ultra-light)', minHeight: '180px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                <div>
                                  <span style={{ backgroundColor: '#dcfce7', color: '#15803d', fontSize: '11px', padding: '2px 8px', borderRadius: '12px', fontWeight: '600' }}>Verified</span>
                                  <h4 style={{ color: theme === 'dark' ? '#f1f5f9' : 'var(--primary-dark)', fontWeight: '700', fontSize: '17px', margin: '8px 0 4px 0' }}>ICNC 2026 Participation Certificate</h4>
                                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '12px' }}>Annual Clinical Nutrition Congress</p>
                                </div>
                                <Award size={36} style={{ color: 'var(--accent)' }} />
                              </div>
                              <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border-ultra-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={12} /> Feb 15, 2026</span>
                                <button 
                                  onClick={() => setSelectedCertificate({ title: 'ICNC 2026 Annual Congress', date: 'February 15, 2026' })}
                                  className="btn btn-primary btn-sm"
                                  style={{ padding: '6px 12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}
                                >
                                  <Printer size={14} /> Print Certificate
                                </button>
                              </div>
                            </div>

                            <div className="glass-panel p-6" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid var(--border-ultra-light)', minHeight: '180px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                <div>
                                  <span style={{ backgroundColor: '#dcfce7', color: '#15803d', fontSize: '11px', padding: '2px 8px', borderRadius: '12px', fontWeight: '600' }}>Verified</span>
                                  <h4 style={{ color: theme === 'dark' ? '#f1f5f9' : 'var(--primary-dark)', fontWeight: '700', fontSize: '17px', margin: '8px 0 4px 0' }}>Hypertension and Lifestyle Course</h4>
                                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '12px' }}>Endorsed Continuing Medical Education</p>
                                </div>
                                <Award size={36} style={{ color: 'var(--accent)' }} />
                              </div>
                              <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border-ultra-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={12} /> Sep 30, 2025</span>
                                <button 
                                  onClick={() => setSelectedCertificate({ title: 'Lifestyle Management and Hypertension', date: 'September 30, 2025' })}
                                  className="btn btn-primary btn-sm"
                                  style={{ padding: '6px 12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}
                                >
                                  <Printer size={14} /> Print Certificate
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* ABSTRACT SUBMISSION TAB */}
                      {activeTab === 'abstracts' && (
                        <div style={{ textAlign: 'left', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
                          <div className="glass-panel p-6" style={{ padding: '24px' }}>
                            <h3 style={{ color: theme === 'dark' ? '#f1f5f9' : 'var(--primary-dark)', fontWeight: '700', fontSize: '18px', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <FileText size={20} style={{ color: 'var(--primary)' }} /> Submit New Abstract
                            </h3>

                            {abstractMessage && (
                              <div style={{ backgroundColor: '#f0fdf4', color: '#16a34a', padding: '12px', borderRadius: '6px', fontSize: '14px', marginBottom: '16px', border: '1px solid #dcfce7' }}>
                                {abstractMessage}
                              </div>
                            )}

                            <form onSubmit={handleAbstractSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <label style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', color: 'var(--primary)' }}>Abstract Title</label>
                                <input 
                                  type="text" required placeholder="E.g., Comparative Study on Oral Feedings..."
                                  style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px', background: 'rgba(255,255,255,0.8)' }}
                                  value={abstractForm.title}
                                  onChange={(e) => setAbstractForm({ ...abstractForm, title: e.target.value })}
                                />
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <label style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', color: 'var(--primary)' }}>Co-Authors</label>
                                <input 
                                  type="text" placeholder="Enter co-authors comma-separated"
                                  style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px', background: 'rgba(255,255,255,0.8)' }}
                                  value={abstractForm.authors}
                                  onChange={(e) => setAbstractForm({ ...abstractForm, authors: e.target.value })}
                                />
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <label style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', color: 'var(--primary)' }}>Clinical Core Group</label>
                                <select 
                                  style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px', backgroundColor: 'white' }}
                                  value={abstractForm.coreGroup}
                                  onChange={(e) => setAbstractForm({ ...abstractForm, coreGroup: e.target.value })}
                                >
                                  <option>Pediatric Nutrition</option>
                                  <option>Oncology Nutrition</option>
                                  <option>Critical Care Nutrition</option>
                                  <option>Geriatric Nutrition</option>
                                  <option>Enteral and Parenteral Nutrition</option>
                                </select>
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <label style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', color: 'var(--primary)' }}>Abstract Text (Max 300 words)</label>
                                <textarea 
                                  required rows={4} placeholder="Summarize your introduction, methodology, clinical findings, and conclusions..."
                                  style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px', background: 'rgba(255,255,255,0.8)' }}
                                  value={abstractForm.abstractText}
                                  onChange={(e) => setAbstractForm({ ...abstractForm, abstractText: e.target.value })}
                                />
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <label style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', color: 'var(--primary)' }}>Upload Manuscript Document (PDF/Docx)</label>
                                <div style={{ border: '2px dashed #cbd5e1', padding: '16px', borderRadius: '6px', textAlign: 'center', cursor: 'pointer', background: 'rgba(255,255,255,0.4)' }}>
                                  <Upload style={{ margin: '0 auto 8px auto', color: 'var(--text-muted)' }} size={24} />
                                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Drag and drop file here, or click to browse</span>
                                </div>
                              </div>
                              <button type="submit" className="btn btn-primary w-full" style={{ padding: '10px', fontWeight: '600' }}>
                                Submit Manuscript Draft
                              </button>
                            </form>
                          </div>

                          <div>
                            <h3 style={{ color: theme === 'dark' ? '#f1f5f9' : 'var(--primary-dark)', fontWeight: '700', fontSize: '18px', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <ClipboardCheck size={20} style={{ color: 'var(--primary)' }} /> Your Submitted Manuscripts
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                              {submissions.filter(s => s.authors.includes(user.fullName)).map((sub, idx) => (
                                <div key={idx} className="glass-panel p-5" style={{ padding: '20px', border: '1px solid var(--border-ultra-light)', textAlign: 'left' }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <span style={{ fontSize: '12px', fontWeight: '700', color: '#94a3b8' }}>{sub.id}</span>
                                    <span 
                                      style={{
                                        fontSize: '11px',
                                        padding: '2px 8px',
                                        borderRadius: '12px',
                                        fontWeight: '600',
                                        backgroundColor: sub.status === 'Approved' ? '#dcfce7' : sub.status === 'Revision Requested' ? '#fee2e2' : '#fef3c7',
                                        color: sub.status === 'Approved' ? '#15803d' : sub.status === 'Revision Requested' ? '#b91c1c' : '#b45309'
                                      }}
                                    >
                                      {sub.status}
                                    </span>
                                  </div>
                                  <h4 style={{ color: theme === 'dark' ? '#f1f5f9' : 'var(--primary-dark)', fontWeight: '700', fontSize: '15px', margin: '8px 0 4px 0' }}>{sub.title}</h4>
                                  <div style={{ paddingTop: '12px', marginTop: '12px', borderTop: '1px solid var(--border-ultra-light)', display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)' }}>
                                    <span>Core Group: <strong>{sub.coreGroup}</strong></span>
                                    <span>Submitted: {sub.submittedDate}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* COURSE CREDITS TAB */}
                      {activeTab === 'credits' && (
                        <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                          <div className="glass-panel p-6" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', border: '1px solid var(--border-ultra-light)' }}>
                            <div>
                              <h3 style={{ color: theme === 'dark' ? '#f1f5f9' : 'var(--primary-dark)', fontWeight: '700', fontSize: '18px', margin: '0 0 4px 0' }}>ESPEN LLL Course Credits</h3>
                              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '14px' }}>Track completed modules and accumulate credits to qualify for Teacher LLL (T-LLL) certification.</p>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                              <span style={{ color: '#94a3b8', fontSize: '10px', textTransform: 'uppercase', display: 'block', fontWeight: '600' }}>T-LLL Qualification Progress</span>
                              <strong style={{ color: 'var(--primary)', fontSize: '24px' }}>{user.lllCredits} / 120 Credits</strong>
                            </div>
                          </div>

                          <div className="glass-panel p-6" style={{ padding: '24px' }}>
                            <h4 style={{ color: theme === 'dark' ? '#f1f5f9' : 'var(--primary-dark)', fontWeight: '700', fontSize: '16px', margin: '0 0 16px 0' }}>Module Verification Board</h4>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              {LLL_MODULES.map((mod) => (
                                <div key={mod.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border-ultra-light)' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ color: mod.completed ? '#22c55e' : '#cbd5e1' }}>
                                      <CheckCircle size={20} />
                                    </div>
                                    <div>
                                      <span style={{ fontSize: '14px', fontWeight: '600', color: theme === 'dark' ? '#f1f5f9' : 'var(--primary-dark)' }}>{mod.name}</span>
                                      <span style={{ fontSize: '10px', textTransform: 'uppercase', display: 'block', color: 'var(--text-muted)' }}>Code: ESPEN-{mod.id}</span>
                                    </div>
                                  </div>
                                  <div style={{ textAlign: 'right' }}>
                                    {mod.completed ? (
                                      <>
                                        <span style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '600' }}>+4 Credits</span>
                                        <span style={{ fontSize: '10px', display: 'block', color: 'var(--text-muted)', marginTop: '4px' }}>Earned on {mod.date}</span>
                                      </>
                                    ) : (
                                      <span style={{ backgroundColor: 'rgba(0,0,0,0.05)', color: '#64748b', padding: '2px 8px', borderRadius: '4px', fontSize: '11px' }}>Not Enrolled</span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* --- CHAPTER COORDINATOR TABS --- */}
                  {role === 'coordinator' && (
                    <>
                      {/* COORDINATOR PROFILE TAB */}
                      {activeTab === 'profile' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'left' }}>
                          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                            <div className="glass-panel p-6" style={{ padding: '24px' }}>
                              <h4 style={{ color: '#64748b', fontSize: '11px', textTransform: 'uppercase', margin: '0 0 6px 0' }}>Chapter Jurisdiction</h4>
                              <h3 style={{ color: 'var(--primary)', fontSize: '24px', fontWeight: '800', margin: '0 0 8px 0' }}>Mumbai Chapter</h3>
                              <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                                Managing active clinical nutrition seminars, registrations, and CNE credit certifications across Maharashtra.
                              </p>
                            </div>
                            
                            <div className="glass-panel p-6" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Registered Professionals:</span>
                                <strong>384 Members</strong>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Pending Approvals:</span>
                                <strong style={{ color: 'var(--accent)' }}>2 Requests</strong>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-muted)' }}>CNE Workshops (2025-26):</span>
                                <strong>12 Audits Completed</strong>
                              </div>
                            </div>

                            <div className="glass-panel p-6" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              <h4 style={{ color: '#64748b', fontSize: '11px', textTransform: 'uppercase', margin: 0 }}>Chapter Office Coordinator</h4>
                              <strong style={{ fontSize: '16px', color: theme === 'dark' ? '#f1f5f9' : 'var(--primary-dark)' }}>{user.fullName}</strong>
                              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Affiliation: {user.organization}</span>
                              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Email: {user.email}</span>
                            </div>
                          </div>

                          <div className="glass-panel p-6" style={{ padding: '24px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: theme === 'dark' ? '#f1f5f9' : 'var(--primary-dark)' }}>Active Chapter Action Guidelines</h3>
                            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
                              <li>Verify credentials of new membership applicants registering under Maharashtra.</li>
                              <li>Audit local CNE/LLL workshop attendance lists before issuing continuing education credits.</li>
                              <li>Submit local chapter financial balance sheets for the fiscal audit by mailing <a href="mailto:treasurer@iapenindia.org">treasurer@iapenindia.org</a>.</li>
                            </ul>
                          </div>
                        </div>
                      )}

                      {/* CHAPTER MEMBERS TABLE */}
                      {activeTab === 'chapterMembers' && (
                        <div style={{ textAlign: 'left' }}>
                          <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px', color: theme === 'dark' ? '#f1f5f9' : 'var(--primary-dark)' }}>Mumbai Chapter Directory</h3>
                          <div className="glass-panel" style={{ overflowX: 'auto', borderRadius: '12px' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                              <thead>
                                <tr style={{ borderBottom: '1px solid var(--border-ultra-light)', backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.02)' : '#f8fafc', color: 'var(--primary)' }}>
                                  <th style={{ padding: '14px 18px', textAlign: 'left' }}>Name</th>
                                  <th style={{ padding: '14px 18px', textAlign: 'left' }}>Specialization</th>
                                  <th style={{ padding: '14px 18px', textAlign: 'left' }}>Membership Tier</th>
                                  <th style={{ padding: '14px 18px', textAlign: 'left' }}>LLL Credits</th>
                                  <th style={{ padding: '14px 18px', textAlign: 'center' }}>Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {MOCK_CHAPTER_MEMBERS.map((member, idx) => (
                                  <tr key={idx} style={{ borderBottom: '1px solid var(--border-ultra-light)', color: theme === 'dark' ? '#cbd5e1' : '#334155' }}>
                                    <td style={{ padding: '14px 18px', fontWeight: '600' }}>{member.name}</td>
                                    <td style={{ padding: '14px 18px' }}>{member.profession}</td>
                                    <td style={{ padding: '14px 18px' }}>{member.tier}</td>
                                    <td style={{ padding: '14px 18px' }}>{member.credits} Credits</td>
                                    <td style={{ padding: '14px 18px', textAlign: 'center' }}>
                                      <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '12px', fontWeight: '600', backgroundColor: member.status === 'Approved' ? '#dcfce7' : '#fef3c7', color: member.status === 'Approved' ? '#15803d' : '#b45309' }}>
                                        {member.status}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* CNE APPROVALS TAB */}
                      {activeTab === 'creditApprovals' && (
                        <div style={{ textAlign: 'left' }}>
                          <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px', color: theme === 'dark' ? '#f1f5f9' : 'var(--primary-dark)' }}>CNE Credit Verification Queue</h3>
                          <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '24px' }}>Verify participation records for local modules before allocating national database LLL points.</p>
                          
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div className="glass-panel p-5" style={{ padding: '20px', border: '1px solid var(--border-ultra-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                              <div>
                                <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--accent)' }}>REQUEST CNE-2026-9811</span>
                                <h4 style={{ fontSize: '16px', fontWeight: '700', margin: '4px 0 2px 0', color: theme === 'dark' ? '#f1f5f9' : 'var(--primary-dark)' }}>Dr. Suresh Awale</h4>
                                <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)' }}>Module: ESPEN-M4 (Nutrition in Pediatric & Neonatal Practice) — Attendance verified</p>
                              </div>
                              <div style={{ display: 'flex', gap: '10px' }}>
                                <button onClick={() => addToast('LLL Credits allocated to Dr. Suresh Awale successfully', 'success')} className="btn btn-primary btn-sm flex items-center gap-1"><Check size={14} /> Verify & Approve (+4 credits)</button>
                                <button onClick={() => addToast('CNE credit request rejected', 'warning')} className="btn btn-outline btn-sm" style={{ color: '#ef4444', borderColor: 'rgba(239,68,68,0.2)' }}>Deny</button>
                              </div>
                            </div>

                            <div className="glass-panel p-5" style={{ padding: '20px', border: '1px solid var(--border-ultra-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                              <div>
                                <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--accent)' }}>REQUEST CNE-2026-9812</span>
                                <h4 style={{ fontSize: '16px', fontWeight: '700', margin: '4px 0 2px 0', color: theme === 'dark' ? '#f1f5f9' : 'var(--primary-dark)' }}>Dr. Vivek Sharma</h4>
                                <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)' }}>Module: ESPEN-M5 (Renal & Hepatic Failure) — Attendance certificate pending upload</p>
                              </div>
                              <div style={{ display: 'flex', gap: '10px' }}>
                                <button onClick={() => addToast('LLL Credits allocated to Dr. Vivek Sharma successfully', 'success')} className="btn btn-primary btn-sm flex items-center gap-1"><Check size={14} /> Verify & Approve (+4 credits)</button>
                                <button onClick={() => addToast('Request marked as Pending Revision', 'info')} className="btn btn-outline btn-sm">Request Upload</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* --- NATIONAL EXECUTIVE ADMIN TABS --- */}
                  {role === 'admin' && (
                    <>
                      {/* ADMIN ANALYTICS TAB */}
                      {activeTab === 'profile' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', textAlign: 'left' }}>
                          {/* Top Metric Cards */}
                          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                            <div className="glass-panel p-6" style={{ padding: '20px' }}>
                              <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Total Registered Members</span>
                              <h2 style={{ fontSize: '32px', fontWeight: '900', color: 'var(--primary)', margin: '4px 0' }}>5,248</h2>
                              <div style={{ fontSize: '11px', color: '#22c55e', fontWeight: '600' }}>+12% vs last quarter</div>
                            </div>
                            <div className="glass-panel p-6" style={{ padding: '20px' }}>
                              <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Active Regional Chapters</span>
                              <h2 style={{ fontSize: '32px', fontWeight: '900', color: 'var(--accent)', margin: '4px 0' }}>38 Chapters</h2>
                              <div style={{ fontSize: '11px', color: '#3b82f6', fontWeight: '600' }}>Mumbai, Delhi NCR, Kochi leading</div>
                            </div>
                            <div className="glass-panel p-6" style={{ padding: '20px' }}>
                              <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Total Research Abstracts</span>
                              <h2 style={{ fontSize: '32px', fontWeight: '900', color: 'var(--primary)', margin: '4px 0' }}>{submissions.length + 84} Papers</h2>
                              <div style={{ fontSize: '11px', color: '#22c55e', fontWeight: '600' }}>ICNC 2026 registry active</div>
                            </div>
                          </div>

                          {/* Recharts Graphical Dashboard */}
                          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
                            
                            {/* Area Chart: Registrations Growth */}
                            <div className="glass-panel p-6" style={{ padding: '24px', minHeight: '340px' }}>
                              <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: '800' }}>Member Registration Trends (2026)</h4>
                              <div style={{ width: '100%', height: '240px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                  <AreaChart data={MONTHLY_REGISTRATIONS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                      <linearGradient id="colorMembers" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.4}/>
                                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.0}/>
                                      </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'}/>
                                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                                    <Tooltip contentStyle={{ background: theme === 'dark' ? '#0f172a' : '#ffffff', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px' }} />
                                    <Area type="monotone" dataKey="members" stroke="var(--primary)" strokeWidth={2.5} fillOpacity={1} fill="url(#colorMembers)" />
                                  </AreaChart>
                                </ResponsiveContainer>
                              </div>
                            </div>

                            {/* Bar Chart: Chapter distribution */}
                            <div className="glass-panel p-6" style={{ padding: '24px', minHeight: '340px' }}>
                              <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: '800' }}>Registrations by Chapter</h4>
                              <div style={{ width: '100%', height: '240px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                  <BarChart data={CHAPTER_DISTRIBUTION} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'}/>
                                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                                    <Tooltip contentStyle={{ background: theme === 'dark' ? '#0f172a' : '#ffffff', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px' }} />
                                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                      {CHAPTER_DISTRIBUTION.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 1 ? 'var(--accent)' : 'var(--primary)'} />
                                      ))}
                                    </Bar>
                                  </BarChart>
                                </ResponsiveContainer>
                              </div>
                            </div>

                            {/* Pie Chart: Membership Tiers */}
                            <div className="glass-panel p-6" style={{ padding: '24px', minHeight: '340px' }}>
                              <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: '800' }}>Membership Tier Distribution</h4>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '240px', gap: '20px' }}>
                                <div style={{ width: '50%', height: '100%' }}>
                                  <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                      <Pie
                                        data={TIER_DISTRIBUTION}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                      >
                                        {TIER_DISTRIBUTION.map((entry, index) => (
                                          <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                      </Pie>
                                      <Tooltip />
                                    </PieChart>
                                  </ResponsiveContainer>
                                </div>
                                <div style={{ width: '50%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                  {TIER_DISTRIBUTION.map((tier, idx) => (
                                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px' }}>
                                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: tier.color }}></div>
                                      <div>
                                        <div style={{ fontWeight: '600' }}>{tier.name}</div>
                                        <div style={{ color: '#64748b' }}>{tier.value} Members</div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Info Guide */}
                            <div className="glass-panel p-6" style={{ padding: '24px', minHeight: '340px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                              <div>
                                <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '800', color: 'var(--primary)' }}>National Executive Panel</h4>
                                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                                  Welcome to the central command panel of the Indian Association for Parenteral and Enteral Nutrition. As an Administrator, you have full control over the clinical guidelines, regional chapters databases, education webinars scheduling, and article registries.
                                </p>
                              </div>
                              <div style={{ backgroundColor: theme === 'dark' ? 'rgba(201,155,59,0.06)' : 'var(--accent-light)', padding: '16px', borderRadius: '8px', border: '1px solid var(--accent)' }}>
                                <div style={{ fontWeight: '700', color: 'var(--accent)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}><Sparkles size={16} /> Client Demo Tip</div>
                                <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                                  Switch to the <strong>Manuscript Review Board</strong> tab to review submitted abstracts and approve, reject, or request revisions.
                                </p>
                              </div>
                            </div>

                          </div>
                        </div>
                      )}

                      {/* MANUSCRIPT REVIEW BOARD */}
                      {activeTab === 'manuscripts' && (
                        <div style={{ textAlign: 'left' }}>
                          <div style={{ marginBottom: '24px' }}>
                            <h3 style={{ fontSize: '20px', fontWeight: '800', margin: '0 0 4px 0', color: theme === 'dark' ? '#f1f5f9' : 'var(--primary-dark)' }}>Manuscript Verification Queue</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '13px', margin: 0 }}>Review submitted abstracts from registered researchers and approve them for national journal indexation.</p>
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {submissions.map((sub, idx) => (
                              <div key={idx} className="glass-panel p-5" style={{ padding: '20px', border: '1px solid var(--border-ultra-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                                <div style={{ flex: 1, minWidth: '280px' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ fontSize: '12px', fontWeight: '700', color: '#94a3b8' }}>{sub.id}</span>
                                    <span 
                                      style={{
                                        fontSize: '11px',
                                        padding: '2px 8px',
                                        borderRadius: '12px',
                                        fontWeight: '600',
                                        backgroundColor: sub.status === 'Approved' ? '#dcfce7' : sub.status === 'Rejected' ? '#fee2e2' : sub.status === 'Revision Requested' ? '#eff6ff' : '#fef3c7',
                                        color: sub.status === 'Approved' ? '#15803d' : sub.status === 'Rejected' ? '#b91c1c' : sub.status === 'Revision Requested' ? '#1d4ed8' : '#b45309'
                                      }}
                                    >
                                      {sub.status}
                                    </span>
                                  </div>
                                  <h4 style={{ color: theme === 'dark' ? '#f1f5f9' : 'var(--primary-dark)', fontWeight: '700', fontSize: '16px', margin: '8px 0 4px 0' }}>{sub.title}</h4>
                                  <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)' }}>Authors: {sub.authors}</p>
                                  <div style={{ marginTop: '8px', fontSize: '11px', color: 'var(--text-muted)' }}>Core Group: <strong>{sub.coreGroup}</strong> | Submitted: {sub.submittedDate}</div>
                                </div>

                                <div style={{ display: 'flex', gap: '8px' }}>
                                  {sub.status !== 'Approved' && (
                                    <button 
                                      onClick={() => handleApproveAbstract(sub.id)}
                                      className="btn btn-primary btn-sm flex items-center gap-1"
                                      style={{ padding: '6px 12px', fontSize: '12px' }}
                                    >
                                      <Check size={14} /> Approve
                                    </button>
                                  )}
                                  {sub.status !== 'Revision Requested' && (
                                    <button 
                                      onClick={() => handleRequestRevisionAbstract(sub.id)}
                                      className="btn btn-outline btn-sm"
                                      style={{ padding: '6px 12px', fontSize: '12px', color: 'var(--primary)', borderColor: 'var(--primary)' }}
                                    >
                                      Request Revision
                                    </button>
                                  )}
                                  {sub.status !== 'Rejected' && (
                                    <button 
                                      onClick={() => handleRejectAbstract(sub.id)}
                                      className="btn btn-outline btn-sm"
                                      style={{ padding: '6px 12px', fontSize: '12px', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.2)' }}
                                    >
                                      Reject
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* SYSTEM AUDIT LOGS */}
                      {activeTab === 'logs' && (
                        <div style={{ textAlign: 'left' }}>
                          <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px', color: theme === 'dark' ? '#f1f5f9' : 'var(--primary-dark)' }}>Central Database Audit Trail</h3>
                          <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '24px' }}>Real-time audit trails capturing executive decisions, chapter changes, and registrations.</p>
                          
                          <div className="glass-panel" style={{ borderRadius: '12px', padding: '10px' }}>
                            {AUDIT_LOGS.map((log, idx) => (
                              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', borderBottom: idx !== AUDIT_LOGS.length - 1 ? '1px solid var(--border-ultra-light)' : 'none', fontSize: '13px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: log.type === 'register' ? '#22c55e' : log.type === 'submit' ? '#c99b3b' : '#3b82f6' }}></div>
                                  <span style={{ color: theme === 'dark' ? '#cbd5e1' : '#334155', fontWeight: '500' }}>{log.text}</span>
                                </div>
                                <span style={{ fontSize: '11px', color: '#94a3b8' }}>{log.time}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}

                </div>

              </div>
            )}
          </div>
        </section>

        {/* Certificate Modal Viewer */}
        <AnimatePresence>
          {selectedCertificate && createPortal(
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="modal-backdrop" 
              onClick={() => setSelectedCertificate(null)}
              style={{ zIndex: 11000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <div 
                className="modal-container"
                onClick={(e) => e.stopPropagation()}
                style={{ maxWidth: '850px', padding: '30px', textAlign: 'center', borderRadius: '12px', background: 'white' }}
              >
                {/* Close Button */}
                <button 
                  className="modal-close" 
                  onClick={() => setSelectedCertificate(null)}
                  style={{ position: 'absolute', top: '15px', right: '15px', fontSize: '24px', border: 'none', background: 'none', cursor: 'pointer', color: '#000000' }}
                >
                  &times;
                </button>
                
                {/* Certificate Display Screen */}
                <div className="certificate-mockup-frame" style={{ border: '8px double var(--primary)', padding: '24px', backgroundColor: 'white', margin: '20px auto 24px auto', boxSizing: 'border-box' }}>
                  <div style={{ border: '1px solid #e2e8f0', padding: '30px', backgroundColor: 'rgba(253, 250, 242, 0.4)' }}>
                    <strong style={{ color: 'var(--primary-navy)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block' }}>Indian Association for Parenteral and Enteral Nutrition</strong>
                    <h2 style={{ color: 'var(--primary)', fontSize: '24px', fontWeight: '800', textTransform: 'uppercase', marginTop: '16px', marginBottom: '8px' }}>Certificate of Participation</h2>
                    <div style={{ height: '2px', width: '64px', backgroundColor: 'var(--accent)', margin: '16px auto' }}></div>
                    <p style={{ fontStyle: 'italic', color: '#475569', fontSize: '14px', margin: '0 0 8px 0' }}>This is certified to acknowledge that</p>
                    <h3 style={{ color: 'var(--primary-dark)', fontSize: '22px', fontWeight: '900', margin: '12px 0' }}>{user?.fullName}</h3>
                    <p style={{ color: '#334155', fontSize: '14px', maxWidth: '500px', margin: '0 auto 16px auto', lineHeight: '1.5' }}>
                      has successfully participated as a member and completed all educational requirements in the seminar course:
                    </p>
                    <h4 style={{ color: 'var(--primary)', fontSize: '16px', fontWeight: '700', margin: '16px 0 4px 0' }}>{selectedCertificate.title}</h4>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>Conducted on {selectedCertificate.date}</p>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '40px', paddingTop: '20px', borderTop: '1px dashed #cbd5e1' }}>
                      <div>
                        <div style={{ height: '1px', width: '100px', backgroundColor: '#94a3b8', margin: '0 auto' }}></div>
                        <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginTop: '4px' }}>Dr. Ketan Patel</span>
                        <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block' }}>President, IAPEN India</span>
                      </div>
                      <div>
                        <div style={{ height: '1px', width: '100px', backgroundColor: '#94a3b8', margin: '0 auto' }}></div>
                        <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginTop: '4px' }}>Prof. Ananya Sen</span>
                        <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block' }}>Academic Head</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Print Controls */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                  <button 
                    onClick={triggerPrint}
                    className="btn btn-primary"
                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <Printer size={16} /> Print / Save as PDF
                  </button>
                  <button onClick={() => setSelectedCertificate(null)} className="btn btn-outline" style={{ color: '#000000', borderColor: '#d1d5db' }}>
                    Close Viewer
                  </button>
                </div>
              </div>
            </motion.div>,
            document.body
          )}
        </AnimatePresence>

      </div>
    </>
  );
};

export default Dashboard;
