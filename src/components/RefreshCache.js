import React, { useEffect } from 'react';
import { clearCache } from '../services/api';

// Visit /refresh-cache manually to clear the cached API data and reload
// with fresh content from the backend. Not linked anywhere in the UI.
const RefreshCache = () => {
  useEffect(() => {
    clearCache();
    window.location.href = '/';
  }, []);

  return (
    <div className="page-loader">
      <p>Refreshing content…</p>
    </div>
  );
};

export default RefreshCache;
