import React from 'react';
import { Sparkles } from 'lucide-react';
import { capitalize, formatCalories, formatNutrient } from '../utils/helpers.js';

/**
 * Display card for an individual food item detected inside a composite meal
 */
export const FoodItemCard = ({ item }) => {
  if (!item) return null;

  const confidencePct = Math.round((item.confidence || 0.95) * 100);

  return (
    <div className="bg-white border border-slate-100/80 rounded-2xl p-5 shadow-sm space-y-4 hover:shadow-md transition-shadow">
      {/* Title & Portion Header */}
      <div className="flex justify-between items-start gap-4">
        <div>
          <h4 className="font-extrabold text-slate-800 text-base">{capitalize(item.name)}</h4>
          <p className="text-xs text-slate-550 mt-0.5">
            Portion: <span className="font-bold text-slate-700">{item.quantity} {item.unit || 'serving'}</span>
          </p>
        </div>

        {/* AI Confidence badge */}
        <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-100 shadow-sm shrink-0">
          <Sparkles size={11} className="fill-emerald-100" />
          <span>{confidencePct}% Match</span>
        </div>
      </div>

      {/* Nutrients breakdowns */}
      <div className="grid grid-cols-5 gap-2 border-t border-slate-50 pt-3 text-center">
        <div>
          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Calories</span>
          <span className="font-bold text-xs text-slate-850">{formatCalories(item.calories)} <span className="text-[9px] font-normal text-slate-400">kcal</span></span>
        </div>
        <div>
          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Protein</span>
          <span className="font-bold text-xs text-slate-850">{formatNutrient(item.protein)}<span className="text-[9px] font-normal text-slate-400">g</span></span>
        </div>
        <div>
          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Carbs</span>
          <span className="font-bold text-xs text-slate-850">{formatNutrient(item.carbs)}<span className="text-[9px] font-normal text-slate-400">g</span></span>
        </div>
        <div>
          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Fat</span>
          <span className="font-bold text-xs text-slate-850">{formatNutrient(item.fat)}<span className="text-[9px] font-normal text-slate-400">g</span></span>
        </div>
        <div>
          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Fiber</span>
          <span className="font-bold text-xs text-slate-850">{formatNutrient(item.fiber)}<span className="text-[9px] font-normal text-slate-400">g</span></span>
        </div>
      </div>
    </div>
  );
};

export default FoodItemCard;
