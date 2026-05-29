import React from 'react';
import './style.css';

const LoadingFallback = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="spinner-circle"></div>
        <div className="spinner-circle inner"></div>
      </div>
      <p className="loading-text">Loading...</p>
    </div>
  );
};

export default LoadingFallback; 