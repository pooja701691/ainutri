import React from 'react';

/**
 * Animated spinner indicating loading state
 */
export const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const dimensions = {
    sm: 'h-5 w-5 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${dimensions[size]} animate-spin rounded-full border-emerald-100 border-t-emerald-500`}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
