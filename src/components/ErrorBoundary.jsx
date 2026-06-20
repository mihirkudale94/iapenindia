import React from 'react';
import { AlertCircle } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service like Sentry here
    console.error("ErrorBoundary caught an error", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center', padding: '0 20px' }}>
          <AlertCircle size={64} color="#ef4444" style={{ marginBottom: '24px' }} />
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-dark)', marginBottom: '16px' }}>Something went wrong.</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '500px', marginBottom: '32px' }}>
            An unexpected error occurred in the application. Our team has been notified. Please try refreshing the page.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn btn-primary"
            style={{ padding: '12px 24px', borderRadius: 'var(--radius-md)' }}
          >
            Refresh Page
          </button>
          
          {process.env.NODE_ENV === 'development' && (
            <details style={{ marginTop: '32px', textAlign: 'left', backgroundColor: '#f3f4f6', padding: '16px', borderRadius: '8px', maxWidth: '800px', width: '100%', overflow: 'auto' }}>
              <summary style={{ fontSize: '14px', fontWeight: '600', cursor: 'pointer', marginBottom: '8px' }}>Error Details (Dev Only)</summary>
              <pre style={{ fontSize: '12px', color: '#b91c1c' }}>{this.state.error && this.state.error.toString()}</pre>
              <pre style={{ fontSize: '12px', color: '#4b5563', marginTop: '8px' }}>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
