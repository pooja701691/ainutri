import React from 'react';
import { Link } from 'react-router-dom';
import { Apple } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-emerald-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Brand Info */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-emerald-500 text-white p-1.5 rounded-lg">
                <Apple size={18} />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-slate-800">
                NutriScan <span className="text-emerald-500">AI</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-slate-500 max-w-xs leading-relaxed">
              Track your nutrition seamlessly with advanced AI image analysis. Know what's on your plate in seconds.
            </p>
          </div>

          {/* Product links */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Product</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#features" className="text-sm text-slate-500 hover:text-emerald-600 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-sm text-slate-500 hover:text-emerald-600 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <Link to="/login" className="text-sm text-slate-500 hover:text-emerald-600 transition-colors">
                  Log In
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Contact links */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Legal & Contact</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-sm text-slate-500 hover:text-emerald-600 cursor-pointer transition-colors">
                Privacy Policy
              </li>
              <li className="text-sm text-slate-500 hover:text-emerald-600 cursor-pointer transition-colors">
                Terms of Service
              </li>
              <li className="text-sm text-slate-500 hover:text-emerald-600 cursor-pointer transition-colors">
                Support Team
              </li>
            </ul>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="mt-8 border-t border-slate-100 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} NutriScan AI. All rights reserved.
          </p>
          <p className="text-xs text-slate-400 mt-2 sm:mt-0 flex items-center">
            Made with 💚 for a healthier life
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
