const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_URL || 'https://tmt-rental-backend.onrender.com',
    TIMEOUT: 10000,
    RETRY_ATTEMPTS: 3,
  };
  
  export const getApiUrl = (endpoint = '') => {
    const baseUrl = API_CONFIG.BASE_URL.endsWith('/') 
      ? API_CONFIG.BASE_URL.slice(0, -1) 
      : API_CONFIG.BASE_URL;
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${baseUrl}${cleanEndpoint}`;
  };
  
  export default API_CONFIG;