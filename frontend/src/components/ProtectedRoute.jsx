import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import LoadingSpinner from './LoadingSpinner.jsx';

export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  // If restoring authentication token, show loading spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-sm text-slate-500 font-medium">Validating credentials...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if user is guest
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
