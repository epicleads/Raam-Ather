'use client';

import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: React.ComponentType<{ error: Error; retry: () => void }>;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

const DefaultErrorFallback = ({ error, retry }: { error: Error; retry: () => void }) => (
  <div className="h-screen bg-gray-900 flex items-center justify-center">
    <div className="text-center text-white max-w-md mx-auto p-6">
      <div className="mb-6">
        <svg
          className="w-16 h-16 mx-auto text-red-500 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
        <h2 className="text-2xl font-bold font-neurial mb-2">Something went wrong</h2>
        <p className="text-gray-300 mb-4">
          We encountered an unexpected error while loading the Hero section.
        </p>
        {process.env.NODE_ENV === 'development' && (
          <details className="text-left bg-gray-800 p-4 rounded-lg mb-4">
            <summary className="cursor-pointer mb-2 font-semibold">Error Details</summary>
            <pre className="text-xs text-red-300 whitespace-pre-wrap">
              {error.message}
              {error.stack}
            </pre>
          </details>
        )}
      </div>
      <div className="space-y-3">
        <button
          onClick={retry}
          className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-neurial font-semibold"
        >
          Try Again
        </button>
        <button
          onClick={() => window.location.reload()}
          className="w-full px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-neurial"
        >
          Reload Page
        </button>
      </div>
    </div>
  </div>
);

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private retryTimeoutId: number | null = null;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Hero ErrorBoundary caught an error:', error, errorInfo);

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log to external service in production
    if (process.env.NODE_ENV === 'production') {
      // You can integrate with error reporting services like Sentry here
      // logErrorToService(error, errorInfo);
    }
  }

  componentWillUnmount() {
    if (this.retryTimeoutId) {
      window.clearTimeout(this.retryTimeoutId);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return (
        <FallbackComponent
          error={this.state.error!}
          retry={this.handleRetry}
        />
      );
    }

    return this.props.children;
  }
}

// Higher-order component for easier usage
export function withErrorBoundary<T extends object>(
  Component: React.ComponentType<T>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
) {
  const WrappedComponent = (props: T) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  return WrappedComponent;
}

// Specialized Hero Error Boundary
export const HeroErrorBoundary = ({ children }: { children: ReactNode }) => (
  <ErrorBoundary
    onError={(error, errorInfo) => {
      console.error('Hero section error:', error, errorInfo);
      // You can add analytics tracking here
    }}
    fallback={({ retry }) => (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white max-w-md mx-auto p-6">
          <div className="mb-6">
            <svg
              className="w-16 h-16 mx-auto text-green-500 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <h2 className="text-2xl font-bold font-neurial mb-2">Hero Section Unavailable</h2>
            <p className="text-gray-300 mb-4">
              Our hero content is temporarily unavailable. Please try refreshing the page.
            </p>
          </div>
          <div className="space-y-3">
            <button
              onClick={retry}
              className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-neurial font-semibold"
            >
              Retry Loading
            </button>
            <a
              href="#main-content"
              className="block w-full px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-neurial"
            >
              Skip to Content
            </a>
          </div>
        </div>
      </div>
    )}
  >
    {children}
  </ErrorBoundary>
);