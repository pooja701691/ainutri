import React from 'react';
import { Flame, Dumbbell, Wheat, Droplets, Leaf } from 'lucide-react';
import { formatCalories, formatNutrient } from '../utils/helpers.js';

/**
 * Renders summary metrics grid for an analyzed meal
 */
export const NutritionSummary = ({ totalNutrition }) => {
  if (!totalNutrition) return null;

  const { calories, protein, carbs, fat, fiber } = totalNutrition;

  const nutrients = [
    { label: 'Calories', value: formatCalories(calories), unit: 'kcal', icon: Flame, color: 'text-amber-500 bg-amber-50 border-amber-100' },
    { label: 'Protein', value: formatNutrient(protein), unit: 'g', icon: Dumbbell, color: 'text-emerald-500 bg-emerald-50 border-emerald-100' },
    { label: 'Carbs', value: formatNutrient(carbs), unit: 'g', icon: Wheat, color: 'text-blue-500 bg-blue-50 border-blue-100' },
    { label: 'Fat', value: formatNutrient(fat), unit: 'g', icon: Droplets, color: 'text-rose-500 bg-rose-50 border-rose-100' },
    { label: 'Fiber', value: formatNutrient(fiber), unit: 'g', icon: Leaf, color: 'text-teal-500 bg-teal-50 border-teal-100' }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
      {nutrients.map((nut, idx) => {
        const Icon = nut.icon;
        return (
          <div
            key={idx}
            className={`border rounded-2xl p-4 text-center bg-white shadow-sm flex flex-col justify-between space-y-2.5 ${
              nut.label === 'Calories' ? 'col-span-2 sm:col-span-1 bg-gradient-to-b from-amber-50/10 to-white' : ''
            }`}
          >
            <div className="flex flex-col items-center space-y-1.5">
              <div className={`p-2 rounded-xl border ${nut.color}`}>
                <Icon size={16} />
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {nut.label}
              </span>
            </div>
            
            <h4 className="text-lg font-extrabold text-slate-800">
              {nut.value}{' '}
              <span className="text-xs font-semibold text-slate-400 uppercase">{nut.unit}</span>
            </h4>
          </div>
        );
      })}
    </div>
  );
};

export default NutritionSummary;
