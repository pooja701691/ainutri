import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { Sparkles, Menu, X, LogOut, LayoutDashboard, History, Plus, User, Apple } from 'lucide-react';

export const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const authenticatedLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Analyze', path: '/analyze', icon: Plus },
    { name: 'History', path: '/history', icon: History },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-emerald-50/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Brand */}
          <div className="flex items-center">
            <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center space-x-2 group">
              <div className="bg-emerald-500 text-white p-2 rounded-xl group-hover:scale-105 transition-transform">
                <Apple size={20} className="fill-emerald-100/20" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-800">
                NutriScan <span className="text-emerald-500">AI</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {isAuthenticated ? (
              <>
                {authenticatedLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        isActive(link.path)
                          ? 'bg-emerald-50 text-emerald-600 shadow-sm shadow-emerald-100/50'
                          : 'text-slate-600 hover:text-emerald-600 hover:bg-emerald-50/40'
                      }`}
                    >
                      <Icon size={16} />
                      <span>{link.name}</span>
                    </Link>
                  );
                })}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1.5 ml-4 px-4 py-2 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50/50 transition-all duration-200"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <a
                  href="#features"
                  className="text-slate-600 hover:text-emerald-600 px-3 py-2 rounded-xl text-sm font-medium transition-colors"
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  className="text-slate-600 hover:text-emerald-600 px-3 py-2 rounded-xl text-sm font-medium transition-colors"
                >
                  How It Works
                </a>
                <Link
                  to="/login"
                  className="text-slate-600 hover:text-emerald-600 px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 hover:-translate-y-0.5 transition-all duration-200"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-500 hover:text-emerald-600 p-2 rounded-lg hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-emerald-50 bg-white/95 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isAuthenticated ? (
              <>
                {authenticatedLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                        isActive(link.path)
                          ? 'bg-emerald-50 text-emerald-600'
                          : 'text-slate-600 hover:text-emerald-600 hover:bg-emerald-50/40'
                      }`}
                    >
                      <Icon size={18} />
                      <span>{link.name}</span>
                    </Link>
                  );
                })}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 w-full text-left px-4 py-3 rounded-xl text-base font-semibold text-rose-600 hover:bg-rose-50/50 transition-all"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <a
                  href="#features"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-xl text-base font-medium text-slate-600 hover:bg-emerald-50/40 hover:text-emerald-600 transition-all"
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-xl text-base font-medium text-slate-600 hover:bg-emerald-50/40 hover:text-emerald-600 transition-all"
                >
                  How It Works
                </a>
                <div className="border-t border-slate-100 my-2 pt-2">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block text-center px-4 py-2.5 rounded-xl text-base font-bold text-slate-600 hover:bg-emerald-50/40 hover:text-emerald-600 transition-all"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="block text-center mt-2 bg-emerald-500 text-white px-4 py-3 rounded-xl text-base font-bold shadow-lg shadow-emerald-500/10"
                  >
                    Get Started
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
