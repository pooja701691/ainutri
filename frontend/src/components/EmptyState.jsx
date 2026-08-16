import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

/**
 * Reusable placeholder for screens with no items/history logs
 */
export const EmptyState = ({
  icon: Icon,
  title = 'No records found',
  description = 'Add some food logs to get started.',
  buttonText = 'Analyze Food',
  buttonLink = '/analyze',
  onClick
}) => {
  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-8 sm:p-12 text-center max-w-md mx-auto shadow-sm space-y-5">
      
      {/* Icon frame */}
      {Icon && (
        <div className="bg-emerald-50 text-emerald-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
          <Icon size={28} />
        </div>
      )}

      {/* Message */}
      <div className="space-y-1.5">
        <h3 className="text-xl font-extrabold text-slate-800">{title}</h3>
        <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
      </div>

      {/* Optional action triggers */}
      <div className="pt-2">
        {onClick ? (
          <button
            onClick={onClick}
            className="inline-flex items-center space-x-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-emerald-500/10 transition-all hover:-translate-y-0.5 duration-200"
          >
            <Plus size={16} />
            <span>{buttonText}</span>
          </button>
        ) : (
          <Link
            to={buttonLink}
            className="inline-flex items-center space-x-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-emerald-500/10 transition-all hover:-translate-y-0.5 duration-200"
          >
            <Plus size={16} />
            <span>{buttonText}</span>
          </Link>
        )}
      </div>

    </div>
  );
};

export default EmptyState;
