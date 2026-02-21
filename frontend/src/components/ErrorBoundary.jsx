import React from 'react';
import { Link, useLocation } from 'react-router-dom';

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Application crashed:', error, errorInfo);
    this.setState({
      errorMessage:
        (typeof error?.message === 'string' && error.message) ||
        'Unexpected runtime error',
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
          <div className="max-w-xl w-full bg-white shadow-card rounded-xl p-8 text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Something went wrong</h1>
            <p className="text-gray-600 mb-6">
              We hit an unexpected issue while loading this page. Please refresh or go back to home.
            </p>
            {this.state.errorMessage && (
              <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3 mb-6 text-left break-words">
                {this.state.errorMessage}
              </p>
            )}
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="btn btn-primary"
              >
                Reload page
              </button>
              <Link to="/" className="btn btn-secondary">
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const ErrorBoundary = ({ children }) => {
  const location = useLocation();

  return (
    <AppErrorBoundary key={location.pathname}>
      {children}
    </AppErrorBoundary>
  );
};

export default ErrorBoundary;
