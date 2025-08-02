import { lazy, Suspense } from 'react';

// Lazy load components that aren't immediately needed
export const AdminPage = lazy(() => import('./AdminPage'));
export const Contact = lazy(() => import('./Contact'));
export const AboutUs = lazy(() => import('./AboutUs'));
export const RentalPage = lazy(() => import('./RentalPage'));

// Loading component
export const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
    <p>Loading...</p>
  </div>
);

// Wrapper component for lazy loading
export const LazyWrapper = ({ children }) => (
  <Suspense fallback={<LoadingSpinner />}>
    {children}
  </Suspense>
);

// src/hooks/useApiCache.js
import { useState, useEffect, useRef } from 'react';

const cache = new Map();

export const useApiCache = (key, fetcher, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { ttl = 300000 } = options; // 5 minutes default TTL
  const abortControllerRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      // Check cache first
      const cached = cache.get(key);
      if (cached && Date.now() - cached.timestamp < ttl) {
        setData(cached.data);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        abortControllerRef.current = new AbortController();
        const result = await fetcher(abortControllerRef.current.signal);
        
        // Cache the result
        cache.set(key, {
          data: result,
          timestamp: Date.now(),
        });
        
        setData(result);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [key, fetcher, ttl]);

  return { data, loading, error };
};