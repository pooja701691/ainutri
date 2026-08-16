import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Clock, Flame, Apple } from 'lucide-react';
import { capitalize, formatCalories, formatTime } from '../utils/helpers.js';

export const MealCard = ({ meal }) => {
  if (!meal) return null;

  // Format food items title: "Rice, Dal, Paneer"
  const foodTitle = meal.foodItems?.map((item) => item.name).join(' + ') || 'Scanned Meal';
  const mealTime = formatTime(meal.createdAt);
  const totalCalories = meal.totalNutrition?.calories || 0;

  // Colors for meal types badges
  const mealBadges = {
    breakfast: 'bg-orange-50 text-orange-600 border-orange-100',
    lunch: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    dinner: 'bg-blue-50 text-blue-600 border-blue-100',
    snack: 'bg-purple-50 text-purple-600 border-purple-100'
  };

  const badgeClass = mealBadges[meal.mealType] || mealBadges.snack;

  return (
    <div className="bg-white border border-slate-100/80 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-slate-100 transition-all duration-200 flex flex-col h-full group">
      {/* Meal Image */}
      <div className="relative aspect-[4/3] w-full bg-slate-50 overflow-hidden border-b border-slate-50">
        <img
          src={meal.imageUrl}
          alt={foodTitle}
          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${badgeClass} shadow-sm backdrop-blur-sm bg-white/90`}>
            {capitalize(meal.mealType)}
          </span>
        </div>
      </div>

      {/* Card Info */}
      <div className="p-4 flex-grow flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          <h4 className="font-bold text-slate-850 line-clamp-1 group-hover:text-emerald-650 transition-colors" title={foodTitle}>
            {foodTitle}
          </h4>
          <div className="flex items-center text-slate-400 text-xs gap-3">
            <span className="flex items-center gap-1 font-medium">
              <Clock size={12} />
              <span>{mealTime}</span>
            </span>
            <span className="flex items-center gap-1 font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              <Flame size={12} className="fill-emerald-100/30" />
              <span>{formatCalories(totalCalories)} kcal</span>
            </span>
          </div>
          {meal.notes && (
            <p className="text-xs text-slate-400 line-clamp-2 italic pt-1 leading-relaxed">
              "{meal.notes}"
            </p>
          )}
        </div>

        {/* Action Button */}
        <div>
          <Link
            to={`/food/${meal._id || meal.id}`}
            className="w-full inline-flex items-center justify-center space-x-1.5 bg-slate-50 hover:bg-emerald-500 hover:text-white text-slate-600 font-bold py-2 px-3 rounded-xl text-xs transition-colors duration-250"
          >
            <Eye size={14} />
            <span>View Details</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
