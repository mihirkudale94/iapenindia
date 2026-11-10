import { createContext, useContext, useState, useEffect, useRef } from 'react';

const DemoContext = createContext();

export const DemoProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('iapen_theme') || 'light';
  });

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
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <DemoContext.Provider
      value={{
        theme,
        toggleTheme,
        toasts,
        addToast,
        removeToast,
        supportState,
        setSupportState,
        tourStep,
        setTourStep,
        chatOpened,
        setChatOpened,
      }}
    >
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
