import { createContext, useContext, useState, useRef } from 'react';

const DemoContext = createContext();

export const DemoProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const [supportState, setSupportState] = useState('idle'); // 'idle' | 'ai' | 'queued' | 'live'
  const [tourStep, setTourStep] = useState(-1); // -1 means inactive
  const [chatOpened, setChatOpened] = useState(false);
  const toastIdRef = useRef(0);

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
