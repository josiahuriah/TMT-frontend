export class ApiError extends Error {
    constructor(message, status, response) {
      super(message);
      this.name = 'ApiError';
      this.status = status;
      this.response = response;
    }
  }
  
  export const handleApiError = (error) => {
    if (error instanceof ApiError) {
      switch (error.status) {
        case 404:
          return 'Resource not found. Please try again.';
        case 500:
          return 'Server error. Please try again later.';
        case 503:
          return 'Service temporarily unavailable. Please try again later.';
        default:
          return error.message || 'An unexpected error occurred.';
      }
    }
    
    if (error.name === 'NetworkError' || !navigator.onLine) {
      return 'Network connection error. Please check your internet connection.';
    }
    
    return 'An unexpected error occurred. Please try again.';
  };
  
  export const apiRequest = async (url, options = {}) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
  
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
  
      clearTimeout(timeoutId);
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new ApiError(
          errorText || `HTTP Error: ${response.status}`,
          response.status,
          response
        );
      }
  
      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        throw new Error('Request timed out. Please try again.');
      }
      
      throw error;
    }
  };
  
  // src/components/ErrorBoundary.jsx
  import React from 'react';
  
  class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error: null };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true, error };
    }
  
    componentDidCatch(error, errorInfo) {
      console.error('Error caught by boundary:', error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        return (
          <div className="error-boundary">
            <h2>Something went wrong.</h2>
            <p>We're sorry for the inconvenience. Please refresh the page or try again later.</p>
            <button onClick={() => window.location.reload()}>
              Refresh Page
            </button>
          </div>
        );
      }
  
      return this.props.children;
    }
  }
  
  export default ErrorBoundary;