import { createContext, useContext, useState, useEffect, useRef } from 'react';

const DemoContext = createContext();

const INITIAL_SUBMISSIONS = [
  {
    id: 'ABS-2026-004',
    title: 'Efficacy of early enteral nutrition in geriatric ICU patients with sepsis: A randomized controlled trial',
    authors: 'Dr. Mansi Patil, Dr. Amit Bhardwaj, Dr. Suresh Awale',
    coreGroup: 'Critical Care Nutrition',
    submittedDate: 'May 12, 2026',
    status: 'Under Review',
  },
  {
    id: 'ABS-2026-003',
    title: 'Impact of ESPEN Guidelines implementation in oncology outpatient clinics in India',
    authors: 'Dr. Ritu Sinha, Dr. Sneha Mehta',
    coreGroup: 'Oncology Nutrition',
    submittedDate: 'Apr 05, 2026',
    status: 'Approved',
  },
  {
    id: 'ABS-2026-002',
    title: 'Nutritional status assessment of neonatal surgical patients using customized tool',
    authors: 'Dr. Suresh Awale, Dr. Neeta Iyer',
    coreGroup: 'Pediatric Nutrition',
    submittedDate: 'Feb 18, 2026',
    status: 'Revision Requested',
  }
];

export const DemoProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('iapen_theme') || 'light';
  });
  
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('none'); // 'member' | 'coordinator' | 'admin' | 'none'
  const [submissions, setSubmissions] = useState(INITIAL_SUBMISSIONS);
  const [toasts, setToasts] = useState([]);
  const [supportState, setSupportState] = useState('idle'); // 'idle' | 'ai' | 'queued' | 'live'
  const [tourStep, setTourStep] = useState(-1); // -1 means inactive
  const [chatOpened, setChatOpened] = useState(false);
  const toastIdRef = useRef(0);

  // Apply theme to document root
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
    localStorage.setItem('iapen_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    addToast(`Theme switched to ${newTheme === 'light' ? 'Light' : 'Dark'} Mode`, 'info');
  };

  const addToast = (message, type = 'info') => {
    toastIdRef.current += 1;
    const id = `toast-${toastIdRef.current}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const loginAs = (persona) => {
    if (persona === 'member') {
      setUser({
        fullName: 'Dr. Mansi Patil',
        email: 'member@iapenindia.org',
        membershipId: 'IAPEN-LM-2026-9831',
        joinedDate: 'Jan 15, 2025',
        tier: 'Life Member',
        profession: 'Clinical Nutritionist & Researcher',
        organization: 'Apex Multispeciality Hospital, Mumbai',
        state: 'Maharashtra',
        chapter: 'Mumbai Chapter',
        coordinator: 'Dr. Ritu Sinha (mumbai@iapenindia.org)',
        lllCredits: 12,
        completedCourses: 3,
      });
      setRole('member');
      addToast('Logged in as Life Member: Dr. Mansi Patil', 'success');
    } else if (persona === 'coordinator') {
      setUser({
        fullName: 'Dr. Ritu Sinha',
        email: 'coordinator@iapenindia.org',
        membershipId: 'IAPEN-CO-2022-4412',
        joinedDate: 'Mar 10, 2022',
        tier: 'Chapter Coordinator',
        profession: 'Senior Dietetic Consultant',
        organization: 'KEM Hospital, Mumbai',
        state: 'Maharashtra',
        chapter: 'Mumbai Chapter',
        coordinator: 'National Executive (info@iapenindia.org)',
        lllCredits: 68,
        completedCourses: 15,
      });
      setRole('coordinator');
      addToast('Logged in as Chapter Coordinator: Dr. Ritu Sinha', 'success');
    } else if (persona === 'admin') {
      setUser({
        fullName: 'National Executive Admin',
        email: 'admin@iapenindia.org',
        membershipId: 'IAPEN-AD-2020-0001',
        joinedDate: 'Jan 01, 2020',
        tier: 'National Administrator',
        profession: 'National Executive Committee',
        organization: 'IAPEN India Headquarters',
        state: 'Delhi',
        chapter: 'Delhi NCR Chapter',
        coordinator: 'None (System Admin)',
        lllCredits: 120,
        completedCourses: 30,
      });
      setRole('admin');
      addToast('Logged in as National Administrator', 'success');
    } else {
      setUser(null);
      setRole('none');
      addToast('Logged out of Member Portal', 'info');
    }
  };

  const handleApproveAbstract = (id) => {
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status: 'Approved' } : s));
    addToast(`Manuscript ${id} Approved for presentation`, 'success');
  };

  const handleRejectAbstract = (id) => {
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status: 'Rejected' } : s));
    addToast(`Manuscript ${id} Rejected`, 'warning');
  };

  const handleRequestRevisionAbstract = (id) => {
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status: 'Revision Requested' } : s));
    addToast(`Manuscript ${id} status updated to Revision Requested`, 'info');
  };

  const startLiveHandoff = () => {
    setChatOpened(true);
    setSupportState('queued');
    addToast('Connecting support request to live chapter coordinator...', 'info');
  };

  return (
    <DemoContext.Provider value={{
      theme,
      setTheme,
      toggleTheme,
      user,
      setUser,
      role,
      setRole,
      loginAs,
      submissions,
      setSubmissions,
      toasts,
      addToast,
      removeToast,
      supportState,
      setSupportState,
      tourStep,
      setTourStep,
      chatOpened,
      setChatOpened,
      handleApproveAbstract,
      handleRejectAbstract,
      handleRequestRevisionAbstract,
      startLiveHandoff
    }}>
      {children}
    </DemoContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDemo = () => {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
};
