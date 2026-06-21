import { useDemo } from './DemoContext';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const ToastContainer = () => {
  const { toasts, removeToast } = useDemo();

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="toast-icon text-success" size={18} style={{ color: '#22c55e' }} />;
      case 'warning':
        return <AlertCircle className="toast-icon text-warning" size={18} style={{ color: '#ef4444' }} />;
      case 'info':
      default:
        return <Info className="toast-icon text-info" size={18} style={{ color: '#3b82f6' }} />;
    }
  };

  const getBorderColor = (type) => {
    switch (type) {
      case 'success':
        return 'rgba(34, 197, 94, 0.4)';
      case 'warning':
        return 'rgba(239, 68, 68, 0.4)';
      case 'info':
      default:
        return 'rgba(59, 130, 246, 0.4)';
    }
  };

  return (
    <div 
      className="toast-container" 
      style={{
        position: 'fixed',
        top: '24px',
        right: '24px',
        zIndex: 11000,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        pointerEvents: 'none',
        maxWidth: '380px',
        width: '100%'
      }}
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            layout
            style={{
              pointerEvents: 'auto',
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: `1px solid ${getBorderColor(toast.type)}`,
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.02)',
              borderRadius: '12px',
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              color: '#0f172a'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {getIcon(toast.type)}
              <span style={{ fontSize: '14px', fontWeight: '500', lineHeight: 1.4 }}>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '2px',
                borderRadius: '50%',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
