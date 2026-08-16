import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="bg-emerald-50 text-emerald-500 p-4 rounded-3xl mb-6 shadow-sm">
        <HelpCircle size={48} />
      </div>
      <h1 className="text-4xl font-extrabold text-slate-800">404 - Page Not Found</h1>
      <p className="mt-3 text-slate-500 max-w-sm">
        Oops! The page you are looking for doesn't exist or was moved.
      </p>
      <Link
        to="/"
        className="mt-8 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-200"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
