import React from 'react';

/**
 * Reusable card to display specific nutrients with progress bars
 */
export const NutritionCard = ({ label, value, goal, unit, icon: Icon, color = 'emerald' }) => {
  const roundedValue = value !== undefined ? Math.round(value) : 0;
  const roundedGoal = goal !== undefined ? Math.round(goal) : 0;
  const percentage = roundedGoal > 0 ? Math.min(100, Math.round((roundedValue / roundedGoal) * 100)) : 0;

  const themes = {
    emerald: {
      text: 'text-emerald-600',
      bg: 'bg-emerald-50',
      fill: 'bg-emerald-500',
      bar: 'bg-emerald-100/50',
      border: 'border-emerald-100/40'
    },
    amber: {
      text: 'text-amber-600',
      bg: 'bg-amber-50',
      fill: 'bg-amber-500',
      bar: 'bg-amber-100/50',
      border: 'border-amber-100/40'
    },
    blue: {
      text: 'text-blue-600',
      bg: 'bg-blue-50',
      fill: 'bg-blue-500',
      bar: 'bg-blue-100/50',
      border: 'border-blue-100/40'
    },
    rose: {
      text: 'text-rose-600',
      bg: 'bg-rose-50',
      fill: 'bg-rose-500',
      bar: 'bg-rose-100/50',
      border: 'border-rose-100/40'
    }
  };

  const activeTheme = themes[color] || themes.emerald;

  return (
    <div className={`bg-white border ${activeTheme.border} p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-250`}>
      <div className="flex justify-between items-start mb-3.5">
        <div>
          <span className="text-slate-405 text-[11px] font-bold uppercase tracking-wider">{label}</span>
          <h3 className="text-2xl font-extrabold text-slate-800 mt-1">
            {roundedValue.toLocaleString()}{' '}
            <span className="text-xs font-semibold text-slate-400 uppercase">{unit}</span>
          </h3>
        </div>
        <div className={`p-2.5 rounded-xl ${activeTheme.bg} ${activeTheme.text}`}>
          <Icon size={18} />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-[11px] font-bold text-slate-500">
          <span>{percentage}% of daily goal</span>
          <span>
            {roundedGoal} {unit}
          </span>
        </div>
        <div className={`w-full h-2 ${activeTheme.bar} rounded-full overflow-hidden`}>
          <div
            className={`h-full ${activeTheme.fill} transition-all duration-500 ease-out`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default NutritionCard;
