import React from 'react';
import { Outlet, Navigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import { Apple } from 'lucide-react';

export const AuthLayout = () => {
  const { isAuthenticated } = useAuth();

  // If already authenticated, redirect straight to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-tr from-emerald-50/30 via-slate-50 to-emerald-50/20">
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
        <Link to="/" className="flex items-center space-x-2 mb-6">
          <div className="bg-emerald-500 text-white p-2.5 rounded-xl shadow-md shadow-emerald-500/10">
            <Apple size={24} className="fill-emerald-100/20" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-slate-800">
            NutriScan <span className="text-emerald-500">AI</span>
          </span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-6 shadow-xl shadow-emerald-950/5 border border-slate-100 rounded-3xl sm:px-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
